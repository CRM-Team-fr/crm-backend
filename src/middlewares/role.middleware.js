const BusinessError =
require("../utils/errors/businessError");

const authorize = (...roles) => {

    return (

        req,

        res,

        next

    ) => {

        if(

            !roles.includes(req.user.role)

        ){

            return next(

                new BusinessError(

                    "Access denied.",

                    403

                )

            );

        }

        next();

    };

};

module.exports = authorize;