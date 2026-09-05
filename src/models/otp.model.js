const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const otpSchema = new mongoose.Schema(
    {
        phoneNumber: {
            type: String,
            required: [true, "Phone number is required."],
            unique: true,
            trim: true
        },
        otpHash: {
            type: String,
            required: true
        },
        wrongOtpAttempts: {
            type: Number,
            default: 0
        },
        resendCount: {
            type: Number,
            default: 0
        },
        lastSentAt: {
            type: Date,
            default: Date.now
        },
        blockedUntil: {
            type: Date
        },
        expiresAt: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// --- Hooks ---
// Removed deprecated 'next' callback from async middleware
otpSchema.pre("save", async function () {
    if (!this.isModified("otpHash")) {
        return;
    }
    this.otpHash = await bcrypt.hash(this.otpHash, 10);
});

// --- Instance Methods ---
otpSchema.methods.compareOtp = async function (candidateOtp) {
    return await bcrypt.compare(candidateOtp, this.otpHash);
};

// --- Statics ---
otpSchema.statics.findByPhoneNumber = function (phoneNumber) {
    return this.findOne({ phoneNumber });
};

otpSchema.statics.removeOtp = function (phoneNumber) {
    return this.deleteOne({ phoneNumber });
};

// --- Indexes ---
// TTL Index to automatically delete expired OTPs from MongoDB
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// (Removed duplicate phoneNumber index since unique: true already handles it)

// --- Model Export ---
const Otp = mongoose.model("Otp", otpSchema);
module.exports = Otp;
