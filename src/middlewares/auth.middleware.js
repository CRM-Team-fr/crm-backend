const { verifyAccessToken } = require("../utils/jwt");

const User = require("../models/user.model");

const BusinessError = require('../utils/errors/businessError');

const authenticate = async (
    req,
    res,
    next
) => {

    try{

        const authorization =
        req.headers.authorization;

        if(
            !authorization ||
            !authorization.startsWith("Bearer ")
        ){

            return next(

                new BusinessError(

                    "Access token is missing.",

                    401

                )

            );

        }

        const token =
        authorization.split(" ")[1];

        const decoded =
        verifyAccessToken(token);

        const user =
        await User.findById(
            decoded.userId
        );

        if(!user){

            return next(

                new BusinessError(

                    "User not found.",

                    401

                )

            );

        }

        req.user = user;

        next();

    }

    catch(error){

        next(error);

    }

};

module.exports = authenticate;