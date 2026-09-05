// ----------------------------
// Employee DTO
// ----------------------------

const buildEmployeeProfile = (user) => {

    if (!user) return null;

    return {

        id: user._id,

        Name: user.Name,

        email: user.email,

        phoneNumber: user.phoneNumber,

        role: user.role,

        status: user.status,

        createdAt: user.createdAt,

        updatedAt: user.updatedAt

    };

};

module.exports = {

    buildEmployeeProfile

};