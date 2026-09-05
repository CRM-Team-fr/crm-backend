const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../../.env")
});
console.log("MONGODB_URI:", process.env.MONGODB_URI);

const connectDB = require("../config/database");

const User = require("../models/user.model");

const seedAdmin = async () => {

    try {

        await connectDB();

        const existingAdmin =
        await User.findOne({
            role:"admin"
        });

        if(existingAdmin){

            console.log("Admin already exists.");

            process.exit();

        }

        await User.create({

            Name:"Super Admin",

            email:"admin@crm.com",

            phoneNumber:"9999999999",

            password:"hello999",

            role:"admin",
            
            mustChangePassword: false,

             status: "approved"

        });

        console.log("Admin created.");

        process.exit();

    }

    catch(error){

        console.log(error);

        process.exit(1);

    }

};

seedAdmin();