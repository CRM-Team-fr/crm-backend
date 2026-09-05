
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const mongoose = require("mongoose");
const connectDB = require("../config/database");
const User = require("../models/user.model");

const testUserModel = async () => {
    try {
        // 1. Connect to the database
        await connectDB();
        console.log("Database connected successfully.");

        // 2. Clear old test data
        await User.deleteMany({});
        console.log("Old users cleared.");

        // 3. Create a test customer
        const customer = await User.create({
            Name: "Lovish Gupta", 
            phoneNumber: "9876543210",
            businessName: "Gupta Traders",
            address: "Batala",
            role: "customer"
        });

        console.log("Customer Created Successfully:\n", customer);
        const employee = await User.create({

    Name: "Rahul Sharma",

    phoneNumber: "9999999999",

    email: "rahul@company.com",

    password: "Rahul@123",

    role: "salesperson"

});
console.log(employee);
console.log(

employee.isEmployee()

);
console.log(

customer.isCustomer()
);
const pendingCustomers =
await User.findPendingCustomers();

console.log(pendingCustomers);



    } catch (error) {
        console.error("Error testing user model:", error.message);
    } finally {
        // 4. Always close the connection so the script finishes executing cleanly
        await mongoose.connection.close();
        console.log("Database connection closed.");
    }
};

// Execute the function safely
testUserModel();