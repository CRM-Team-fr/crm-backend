const followUpService = require("../services/followUp.service");

// ---------------------------------
// Create Follow-up
// ---------------------------------

const createFollowUp = async (req, res, next) => {

    try {

        const result = await followUpService.createFollowUp(

            req.body,

            req.user

        );

        return res.status(201).json(result);

    }

    catch (error) {

        next(error);

    }

};

// ---------------------------------
// Get My Follow-ups
// ---------------------------------

const getMyFollowUps = async (req, res, next) => {

    try {

        const result = await followUpService.getMyFollowUps(

            req.user,

            req.query

        );

        return res.status(200).json(result);

    }

    catch (error) {

        next(error);

    }

};

// ---------------------------------
// Complete Follow-up
// ---------------------------------

const completeFollowUp = async (req, res, next) => {

    try {

        const result = await followUpService.completeFollowUp(

            req.params.followUpId,

            req.body,

            req.user

        );

        return res.status(200).json(result);

    }

    catch (error) {

        next(error);

    }

};

// ---------------------------------
// Reschedule Follow-up
// ---------------------------------

const rescheduleFollowUp = async (req, res, next) => {

    try {

        const result = await followUpService.rescheduleFollowUp(

            req.params.followUpId,

            req.body.followUpDate,

            req.user

        );

        return res.status(200).json(result);

    }

    catch (error) {

        next(error);

    }

};

// ---------------------------------
// Cancel Follow-up
// ---------------------------------

const cancelFollowUp = async (req, res, next) => {

    try {

        const result = await followUpService.cancelFollowUp(

            req.params.followUpId,

            req.body.reason,

            req.user

        );

        return res.status(200).json(result);

    }

    catch (error) {

        next(error);

    }

};

// ---------------------------------
// Customer Follow-ups
// ---------------------------------

const getCustomerFollowUps = async (req, res, next) => {

    try {

        const { customerProfileId } = req.params;

        const result = await followUpService.getCustomerFollowUps(

            customerProfileId,

            req.user

        );

        return res.status(200).json(result);

    }

    catch (error) {

        next(error);

    }

};

// ---------------------------------
// Today's Follow-ups
// ---------------------------------

const getTodaysFollowUps = async (req, res, next) => {

    try {

        const result = await followUpService.getTodaysFollowUps(

            req.user

        );

        return res.status(200).json(result);

    }

    catch (error) {

        next(error);

    }

};

// ---------------------------------
// Overdue Follow-ups
// ---------------------------------

const getOverdueFollowUps = async (req, res, next) => {

    try {

        const result = await followUpService.getOverdueFollowUps(

            req.user

        );

        return res.status(200).json(result);

    }

    catch (error) {

        next(error);

    }

};

// ---------------------------------
// Team Follow-ups (Manager)
// ---------------------------------

const getTeamFollowUps = async (req, res, next) => {

    try {

        const result = await followUpService.getTeamFollowUps(

            req.user,

            req.query

        );

        return res.status(200).json(result);

    }

    catch (error) {

        next(error);

    }

};

// ---------------------------------
// Delete Follow-up
// ---------------------------------

const deleteFollowUp = async (req, res, next) => {

    try {

        const result = await followUpService.deleteFollowUp(

            req.params.followUpId

        );

        return res.status(200).json(result);

    }

    catch (error) {

        next(error);

    }

};

module.exports = {

    createFollowUp,

    getMyFollowUps,

    completeFollowUp,

    rescheduleFollowUp,

    cancelFollowUp,

    getCustomerFollowUps,

    getTodaysFollowUps,

    getOverdueFollowUps,

    getTeamFollowUps,

    deleteFollowUp

};
