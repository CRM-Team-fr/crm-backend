const generateTemporaryPassword = () => {

    const random = Math.floor(
        1000 + Math.random() * 9000
    );

    return `Welcome@${random}`;

};

module.exports = generateTemporaryPassword;