const path = require("path");
// Explicitly resolve the path to your .env file
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const mongoose = require("mongoose");
const connectDB = require("../config/database");
const Otp = require("../models/otp.model");

const testOtpModel = async () => {
    try {
        // 1. Connect to the database
        await connectDB();
        console.log("✅ Database connected successfully.");

        // 2. Clean old test OTP data
        await Otp.deleteMany({});
        console.log("🧹 Old OTP data cleared.");

        const testPhone = "9876543210";
        const plainTextOtp = "123456";

        // --- TEST 1: Create OTP ---
        console.log("\n--- Testing OTP Creation ---");
        
        // Setting expiration for 5 minutes from now
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); 

        const createdOtp = await Otp.create({
            phoneNumber: testPhone,
            otpHash: plainTextOtp, // The pre-save hook will hash this automatically
            expiresAt: expiresAt
        });

        console.log("✔ OTP Document Created Successfully!");
        console.log("Raw Document details:");
        console.log(`  Phone: ${createdOtp.phoneNumber}`);
        console.log(`  Hashed OTP in DB: ${createdOtp.otpHash}`);
        console.log(`  Expires At: ${createdOtp.expiresAt}`);

        // --- TEST 2: compareOtp Instance Method ---
        console.log("\n--- Testing compareOtp Method ---");
        
        // Test with the CORRECT OTP string
        const isMatchCorrect = await createdOtp.compareOtp(plainTextOtp);
        console.log(`Testing correct OTP "${plainTextOtp}": ${isMatchCorrect ? "🟢 MATCH" : "🔴 FAILED"}`);

        // Test with an INCORRECT OTP string
        const incorrectOtp = "654321";
        const isMatchIncorrect = await createdOtp.compareOtp(incorrectOtp);
        console.log(`Testing incorrect OTP "${incorrectOtp}": ${isMatchIncorrect ? "🔴 MATCH (Bug!)" : "🟢 REJECTED (Correct Behavior)"}`);

        // --- BONUS TEST: Static Helpers ---
        console.log("\n--- Testing Static Helper Methods ---");
        
        // Find by phone number
        const foundOtp = await Otp.findByPhoneNumber(testPhone);
        console.log(foundOtp ? "🟢 findByPhoneNumber works!" : "🔴 findByPhoneNumber failed.");

        // Remove OTP
        await Otp.removeOtp(testPhone);
        const checkDeleted = await Otp.findByPhoneNumber(testPhone);
        console.log(!checkDeleted ? "🟢 removeOtp works! (Document safely deleted)" : "🔴 removeOtp failed.");

    } catch (error) {
        console.error("❌ Error running OTP model tests:", error.message);
    } finally {
        // Always cleanly close the connection pool
        await mongoose.connection.close();
        console.log("\n🔌 Database connection closed cleanly.");
    }
};

// Fire up the test execution
testOtpModel();