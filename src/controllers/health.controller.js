const healthCheck = (req, res) => {

    res.status(200).json({

        success: true,

        message: "🚀 CRM Backend is Running"

    });

};

module.exports = {

    healthCheck

};