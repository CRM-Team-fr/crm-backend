const OTP_EXPIRY_SECONDS = 120;      // 2 minutes

const OTP_RESEND_SECONDS = 30;       // Resend after 30 seconds

const OTP_MAX_RESEND = 3;            // Maximum resend attempts

const OTP_MAX_ATTEMPTS = 5;          // Wrong OTP attempts

const OTP_BLOCK_MINUTES = 15;        // Block duration

module.exports = {
    OTP_EXPIRY_SECONDS,
    OTP_RESEND_SECONDS,
    OTP_MAX_RESEND,
    OTP_MAX_ATTEMPTS,
    OTP_BLOCK_MINUTES
};