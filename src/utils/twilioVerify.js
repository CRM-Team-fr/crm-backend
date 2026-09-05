/**
 * Twilio Verify helper. Uses Twilio's pre-approved OTP templates
 * (works on Twilio trial accounts to India, unlike raw SMS).
 *
 * Enabled only when TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and
 * TWILIO_VERIFY_SERVICE_SID are all present in env.
 */
let twilioClient = null;

const isVerifyConfigured = () =>
    Boolean(
        process.env.TWILIO_ACCOUNT_SID &&
        process.env.TWILIO_AUTH_TOKEN &&
        process.env.TWILIO_VERIFY_SERVICE_SID
    );

const getClient = () => {
    if (twilioClient) return twilioClient;
    const twilio = require("twilio");
    twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    return twilioClient;
};

const normalizeE164 = (phoneNumber) => {
    const digits = String(phoneNumber || "").replace(/\D/g, "");
    if (!digits) return null;
    if (digits.length > 10) return `+${digits}`;
    const cc = (process.env.SMS_DEFAULT_COUNTRY || "91").replace(/\D/g, "");
    return `+${cc}${digits}`;
};

const startVerification = async (phoneNumber) => {
    const client = getClient();
    const to = normalizeE164(phoneNumber);
    if (!to) throw new Error("Invalid phone number.");
    return client.verify.v2
        .services(process.env.TWILIO_VERIFY_SERVICE_SID)
        .verifications.create({ to, channel: "sms" });
};

const checkVerification = async (phoneNumber, code) => {
    const client = getClient();
    const to = normalizeE164(phoneNumber);
    if (!to) throw new Error("Invalid phone number.");
    return client.verify.v2
        .services(process.env.TWILIO_VERIFY_SERVICE_SID)
        .verificationChecks.create({ to, code: String(code) });
};

module.exports = { isVerifyConfigured, startVerification, checkVerification };
