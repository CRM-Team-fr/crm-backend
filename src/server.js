// 1. Force Node.js to use Google's Public DNS (Fixes querySrv ECONNREFUSED)
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// 2. Load Environment Variables
require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/database");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

const { testEmailConnection } = require("./services/email.service");

testEmailConnection();

startServer();