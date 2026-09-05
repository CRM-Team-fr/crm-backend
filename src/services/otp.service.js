const Otp = require("../models/otp.model");
const User = require("../models/user.model");
const generateOtp = require("../utils/generateOtp");
const sendSms = require("../utils/sendSms");
const { isVerifyConfigured, startVerification, checkVerification } = require("../utils/twilioVerify");
const BusinessError = require("../utils/errors/businessError");

const {
    OTP_EXPIRY_SECONDS,
    OTP_RESEND_SECONDS,
    OTP_MAX_RESEND,
    OTP_MAX_ATTEMPTS,
    OTP_BLOCK_MINUTES
    
} = require("../config/constants");

/**
 * Calculate OTP expiry time
 */
const calculateExpiry = () => {
    return new Date(
        Date.now() + OTP_EXPIRY_SECONDS * 1000
    );
};

/**
 * Check if resend cooldown has passed
 */
const hasCooldownPassed = (lastSentAt) => {
    return (
        Date.now() - lastSentAt.getTime()
    ) >= OTP_RESEND_SECONDS * 1000;
};

/**
 * Ensure phone belongs to a customer
 */
const ensureCustomerPhone = async (phoneNumber) => {
    const user = await User.findOne({ phoneNumber });
    if (!user || user.role !== "customer") {
        throw new BusinessError(
            "Customer not found. Please register first.",
            404
        );
    }
    return user;
};

/**
 * Find OTP document
 */
const getOtpDocument = async (phoneNumber) => {
    return await Otp.findByPhoneNumber(phoneNumber);
};

/**
 * Create a new OTP document
 */
const createOtpDocument = async (phoneNumber, otp) => {

    return await Otp.create({

        phoneNumber,

        otpHash: otp,

        expiresAt: calculateExpiry(),

        lastSentAt: new Date(),

        resendCount: 0,

        wrongOtpAttempts: 0

    });

};

/**
 * Update existing OTP document
 */
const updateOtpDocument = async (otpDoc, otp) => {

    otpDoc.otpHash = otp;

    otpDoc.expiresAt = calculateExpiry();

    otpDoc.lastSentAt = new Date();

    otpDoc.wrongOtpAttempts = 0;

    otpDoc.resendCount += 1;

    await otpDoc.save();

};

/**
 * Send OTP (First Time Only)
 */
const sendOtp = async (phoneNumber) => {

    await ensureCustomerPhone(phoneNumber);

    const existingOtp = await getOtpDocument(phoneNumber);

    if (existingOtp) {

        throw new BusinessError(

            "OTP already exists. Please use Resend OTP.",

            400

        );

    }

    // Rate-limit tracking doc (does not store the actual OTP when Verify is on)
    await createOtpDocument(phoneNumber, isVerifyConfigured() ? "verify" : generateOtp());

    await User.findOneAndUpdate(
        { phoneNumber },
        { otpVerified: false }
    );

    if (isVerifyConfigured()) {
        await startVerification(phoneNumber);
    } else {
        const otp = await Otp.findByPhoneNumber(phoneNumber);
        await sendSms(phoneNumber, otp?.otpHash);
    }

    return {

        success: true,

        message: "OTP sent successfully.",

        expiresIn: OTP_EXPIRY_SECONDS,

        resendAfter: OTP_RESEND_SECONDS

    };

};

/**
 * Resend OTP
 */
const resendOtp = async (phoneNumber) => {

    await ensureCustomerPhone(phoneNumber);

    const otpDoc = await getOtpDocument(phoneNumber);

    if (!otpDoc) {

        throw new BusinessError(

            "OTP not found. Please request a new OTP.",

            404

        );

    }

    if (!hasCooldownPassed(otpDoc.lastSentAt)) {

        const secondsLeft = Math.ceil(

            (
                otpDoc.lastSentAt.getTime()

                + OTP_RESEND_SECONDS * 1000

                - Date.now()

            ) / 1000

        );

        throw new BusinessError(

            `Please wait ${secondsLeft} seconds before requesting another OTP.`,

            429

        );

    }

    if (otpDoc.resendCount >= OTP_MAX_RESEND) {

        throw new BusinessError(

            "Maximum resend limit reached. Please wait until the current OTP expires.",

            429

        );

    }

    if (isVerifyConfigured()) {
        await updateOtpDocument(otpDoc, "verify");
        await startVerification(phoneNumber);
    } else {
        const otp = generateOtp();
        await updateOtpDocument(otpDoc, otp);
        await sendSms(phoneNumber, otp);
    }

    return {

        success: true,

        message: "OTP resent successfully.",

        expiresIn: OTP_EXPIRY_SECONDS,

        resendAfter: OTP_RESEND_SECONDS

    };

};

/**
 * Delete OTP
 */
const deleteOtp = async (phoneNumber) => {

    await Otp.removeOtp(phoneNumber);

};

/**
 * Check Block Status
 */
const isBlocked = (otpDoc) => {

    return (

        otpDoc.blockedUntil &&

        otpDoc.blockedUntil > new Date()

    );

};
/**
 * Verify OTP
 */
const verifyOtp = async (phoneNumber, enteredOtp) => {

    await ensureCustomerPhone(phoneNumber);

    // Find OTP document
    const otpDoc = await getOtpDocument(phoneNumber);

    if (!otpDoc) {
        throw new BusinessError(
            "OTP not found or has expired.",
            404
        );
    }

    // Check if blocked
    if (isBlocked(otpDoc)) {

        const minutesLeft = Math.ceil(
            (otpDoc.blockedUntil.getTime() - Date.now()) /
            (1000 * 60)
        );

        throw new BusinessError(
            `Too many incorrect attempts. Please try again after ${minutesLeft} minute(s).`,
            429
        );
    }

    // Compare OTP — via Twilio Verify when enabled, otherwise via local hash
    let isMatch = false;
    if (isVerifyConfigured()) {
        try {
            const r = await checkVerification(phoneNumber, enteredOtp);
            isMatch = r.status === "approved" && r.valid === true;
        } catch (err) {
            // Verify returns 404 when the code has expired or too many attempts — treat as mismatch
            isMatch = false;
        }
    } else {
        isMatch = await otpDoc.compareOtp(enteredOtp);
    }

    if (!isMatch) {

        otpDoc.wrongOtpAttempts += 1;

        // Block after maximum attempts
        if (otpDoc.wrongOtpAttempts >= OTP_MAX_ATTEMPTS) {

            otpDoc.blockedUntil = new Date(
                Date.now() +
                OTP_BLOCK_MINUTES * 60 * 1000
            );

            await otpDoc.save();

            throw new BusinessError(
                `Maximum attempts reached. Account blocked for ${OTP_BLOCK_MINUTES} minutes.`,
                429
            );
        }

        await otpDoc.save();

        throw new BusinessError(
            `Incorrect OTP. ${OTP_MAX_ATTEMPTS - otpDoc.wrongOtpAttempts} attempt(s) remaining.`,
            400
        );
    }

    // OTP Correct
    await deleteOtp(phoneNumber);

    await User.findOneAndUpdate(
        { phoneNumber },
        { otpVerified: true }
    );

    return {

        success: true,

        message: "OTP verified successfully.",
        phoneNumber

    };

};

module.exports = {

    sendOtp,

    resendOtp,

    deleteOtp,

    isBlocked,

    verifyOtp
};
