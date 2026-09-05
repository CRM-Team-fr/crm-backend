const {
    buildFollowUp,
    buildFollowUpList
} = require("../dto/followUp.dto");
const FollowUp = require("../models/followUp.model");
const {
    verifyCustomerOwnership
} = require("../helpers/customerOwnership.helper");
const CustomerProfile = require("../models/customerProfile.model");
const BusinessError = require("../utils/errors/businessError");

const {
    createInternalActivity
} = require("./customerActivity.service");

const {
    createNotification
} = require("./notification.service");

const createFollowUp = async (
    followUpData,
    loggedInUser
) => {

    const {

        customerProfileId,

        title,

        description,

        followUpDate,

        taskType,

        priority

    } = followUpData;

    // -----------------------
    // Find Customer
    // -----------------------

    const customerProfile =
await verifyCustomerOwnership(

    customerProfileId,

    loggedInUser

);
    

    // -----------------------
    // Check salesperson
    // -----------------------

    

    // -----------------------
    // Create Follow-up
    // -----------------------




    const followUp = await FollowUp.create({

        customerProfile: customerProfile._id,

        createdBy: loggedInUser._id,

        title,

        description,

        followUpDate,

        taskType,

        priority

    });

    // -----------------------
    // Create Timeline Activity
    // -----------------------

    await createInternalActivity({

        customerProfileId: customerProfile._id,

        createdBy: loggedInUser._id,

        activityType: "follow_up",

        title: "Follow-up Created",

        description: title,

        metadata: {

            followUpId: followUp._id,

            followUpDate,

            priority,

            taskType

        }

    });

   await followUp.populate([
    {
        path: "customerProfile",
        populate: {
            path: "user",
            select: "Name phoneNumber"
        }
    },
    {
        path: "createdBy",
        select: "Name role"
    }
]);

return {

    success: true,

    message: "Follow-up created successfully.",

    followUp: buildFollowUp(followUp)

};

};
const getMyFollowUps = async (
    loggedInUser,
    query
) => {

    const page = Number(query.page) || 1;

    const limit = Number(query.limit) || 10;

    const skip = (page - 1) * limit;

   const customerProfiles =
await CustomerProfile.find({

    assignedSalesperson:
    loggedInUser._id

}).select("_id");

const customerProfileIds =
customerProfiles.map(

    customer => customer._id

);
const filter = {

    customerProfile: {

        $in: customerProfileIds

    }

};

    if (query.status) {

        filter.status = query.status;

    }

    if (query.priority) {

        filter.priority = query.priority;

    }

    const totalFollowUps =
        await FollowUp.countDocuments(filter);

    const followUps =
        await FollowUp.find(filter)

            .populate({

                path: "customerProfile",

                populate: {

                    path: "user",

                    select: "Name phoneNumber"

                }

            })

            .sort({

                followUpDate: 1

            })

            .skip(skip)

            .limit(limit);

    // -------------------------
    // Dashboard Summary
    // -------------------------

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);

    const summary = {

        pending: await FollowUp.countDocuments({

            customerProfile: { $in: customerProfileIds },

            status: "pending"

        }),

        completed: await FollowUp.countDocuments({

    customerProfile: {

        $in: customerProfileIds

    },

    status: "completed"

}),

        overdue: await FollowUp.countDocuments({

    customerProfile: {

        $in: customerProfileIds

    },

    status: "pending",

    followUpDate: {

        $lt: today

    }

}),

        today: await FollowUp.countDocuments({

    customerProfile: {

        $in: customerProfileIds

    },

    status: "pending",

    followUpDate: {

        $gte: today,

        $lt: tomorrow

    }

})

    };

    return {

        success: true,

        summary,

        page,

        limit,

        totalFollowUps,

        totalPages: Math.ceil(totalFollowUps / limit),

        followUps: buildFollowUpList(followUps)

    };

};
const completeFollowUp = async (
    followUpId,
    data,
    loggedInUser
) => {

    const {

        outcome,

        remarks,

        nextFollowUp

    } = data;

    const followUp = await FollowUp.findById(followUpId);
     if (!followUp) {

        throw new BusinessError(
            "Follow-up not found.",
            404
        );

    }
    await verifyCustomerOwnership(

    followUp.customerProfile,

    loggedInUser

);

   

    if (followUp.status !== "pending") {

        throw new BusinessError(
            "Only pending follow-ups can be completed.",
            400
        );

    }

    followUp.status = "completed";

    followUp.completedAt = new Date();

    followUp.outcome = outcome || "";

    followUp.remarks = remarks || "";

    await followUp.save();

    await createInternalActivity({

        customerProfileId: followUp.customerProfile,

        createdBy: loggedInUser._id,

        activityType: "follow_up",

        title: "Follow-up Completed",

        description: outcome || "Follow-up completed.",

        metadata: {

            followUpId: followUp._id,

            remarks

        }

    });

    const customerProfile = await CustomerProfile.findById(followUp.customerProfile);

    if (customerProfile && customerProfile.assignedSalesperson) {

        await createNotification({

            recipient: customerProfile.assignedSalesperson,

            type: "follow_up_due",

            title: "Follow-up Completed",

            message: `Follow-up for ${customerProfile.businessName} has been completed.`,

            referenceEntity: "follow_up",

            referenceId: followUp._id

        });

    }

    // Automatically create next follow-up

    if (nextFollowUp) {

        await createFollowUp({

            customerProfileId: followUp.customerProfile,

            title: nextFollowUp.title,

            description: nextFollowUp.description,

            followUpDate: nextFollowUp.followUpDate,

            taskType: nextFollowUp.taskType,

            priority: nextFollowUp.priority

        }, loggedInUser);

    }
    await followUp.populate([
    {
        path: "customerProfile",
        populate: {
            path: "user",
            select: "Name phoneNumber"
        }
    },
    {
        path: "createdBy",
        select: "Name role"
    }
]);

    return {

        success: true,

        message: "Follow-up completed successfully.",

        followUp: buildFollowUp(followUp)

    };

};
const rescheduleFollowUp = async (
    followUpId,
    followUpDate,
    loggedInUser
) => {

    const followUp =
        await FollowUp.findById(followUpId);
         if (!followUp) {

        throw new BusinessError(
            "Follow-up not found.",
            404
        );

    }
        await verifyCustomerOwnership(

    followUp.customerProfile,

    loggedInUser

);

    

    const oldDate = followUp.followUpDate;

    followUp.followUpDate = followUpDate;

    await followUp.save();

    await createInternalActivity({

        customerProfileId: followUp.customerProfile,

        createdBy: loggedInUser._id,

        activityType: "follow_up",

        title: "Follow-up Rescheduled",

        description:
            "Follow-up date updated.",

        metadata: {

            followUpId: followUp._id,

            oldDate,

            newDate: followUpDate

        }

    });
    await followUp.populate([
    {
        path: "customerProfile",
        populate: {
            path: "user",
            select: "Name phoneNumber"
        }
    },
    {
        path: "createdBy",
        select: "Name role"
    }
]);

    return {

        success: true,

        message:
            "Follow-up rescheduled successfully.",

        followUp: buildFollowUp(followUp)

    };

};
const cancelFollowUp = async (
    followUpId,
    reason,
    loggedInUser
) => {

    const followUp =
        await FollowUp.findById(followUpId);
         if (!followUp) {

        throw new BusinessError(
            "Follow-up not found.",
            404
        );

    }

    await verifyCustomerOwnership(
        followUp.customerProfile,
        loggedInUser
    );

   

    if (followUp.status !== "pending") {

        throw new BusinessError(
            "Only pending follow-ups can be cancelled.",
            400
        );

    }

    followUp.status = "cancelled";

    followUp.remarks = reason || "";

    await followUp.save();

    await createInternalActivity({

        customerProfileId: followUp.customerProfile,

        createdBy: loggedInUser._id,

        activityType: "follow_up",

        title: "Follow-up Cancelled",

        description: reason || "Follow-up cancelled.",

        metadata: {

            followUpId: followUp._id

        }

    });
    await followUp.populate([
    {
        path: "customerProfile",
        populate: {
            path: "user",
            select: "Name phoneNumber"
        }
    },
    {
        path: "createdBy",
        select: "Name role"
    }
]);

    return {

        success: true,

        message:
            "Follow-up cancelled successfully.",

       followUp: buildFollowUp(followUp)

    };

};
const getCustomerFollowUps = async (
    customerProfileId,
    loggedInUser
) => {

    await verifyCustomerOwnership(
        customerProfileId,
        loggedInUser
    );

    const followUps = await FollowUp.find({

    customerProfile: customerProfileId

})
.populate({
    path: "customerProfile",
    populate: {
        path: "user",
        select: "Name phoneNumber"
    }
})
.populate({
    path: "createdBy",
    select: "Name role"
})
.sort({
    followUpDate: -1
});

    return {

    success: true,

    count: followUps.length,

    followUps: buildFollowUpList(followUps)

};

};
const getTodaysFollowUps = async (
    loggedInUser
) => {

    const customerProfiles =
        await CustomerProfile.find({

            assignedSalesperson:
                loggedInUser._id

        }).select("_id");

    const customerProfileIds =
        customerProfiles.map(
            customer => customer._id
        );

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);

    tomorrow.setDate(
        tomorrow.getDate() + 1
    );

    const followUps =
        await FollowUp.find({

            customerProfile: {

                $in: customerProfileIds

            },

            status: "pending",

            followUpDate: {

                $gte: today,

                $lt: tomorrow

            }

        })

            .populate({

                path: "customerProfile",

                populate: {

                    path: "user",

                    select: "Name phoneNumber"

                }

            })

            .sort({

                followUpDate: 1

            });

    return {

        success: true,

        count: followUps.length,

       followUps: buildFollowUpList(followUps)

    };

};
const getOverdueFollowUps = async (
    loggedInUser
) => {

    const customerProfiles =
        await CustomerProfile.find({

            assignedSalesperson:
                loggedInUser._id

        }).select("_id");

    const customerProfileIds =
        customerProfiles.map(
            customer => customer._id
        );

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const followUps =
        await FollowUp.find({

            customerProfile: {

                $in: customerProfileIds

            },

            status: "pending",

            followUpDate: {

                $lt: today

            }

        })

            .populate({

                path: "customerProfile",

                populate: {

                    path: "user",

                    select: "Name phoneNumber"

                }

            })

            .sort({

                followUpDate: 1

            });

    return {

        success: true,

        count: followUps.length,

       followUps: buildFollowUpList(followUps)

    };

};
const getTeamFollowUps = async (
    loggedInUser,
    query
) => {

    if (loggedInUser.role !== "manager") {

        throw new BusinessError(

            "Only managers can view team follow-ups.",

            403

        );

    }

    const salespersons = await User.find({

        managerId: loggedInUser._id,

        role: "salesperson"

    }).select("_id");

    const salespersonIds = salespersons.map(sp => sp._id);

    const customerProfiles = await CustomerProfile.find({

        assignedSalesperson: { $in: salespersonIds }

    }).select("_id");

    const customerProfileIds = customerProfiles.map(cp => cp._id);

    const filter = {

        customerProfile: { $in: customerProfileIds }

    };

    if (query.status) {

        filter.status = query.status;

    }

    if (query.priority) {

        filter.priority = query.priority;

    }

    const totalFollowUps =
        await FollowUp.countDocuments(filter);

    const followUps =
        await FollowUp.find(filter)

            .populate({

                path: "customerProfile",

                populate: {

                    path: "user",

                    select: "Name phoneNumber"

                }

            })

            .sort({

                followUpDate: 1

            })

            .skip(Number(query.skip) || 0)

            .limit(Number(query.limit) || 10);

    return {

        success: true,

        page: Number(query.page) || 1,

        limit: Number(query.limit) || 10,

        totalFollowUps,

        totalPages: Math.ceil(totalFollowUps / (Number(query.limit) || 10)),

        followUps: buildFollowUpList(followUps)

    };

};
const deleteFollowUp = async (
    followUpId
) => {

    const followUp =
        await FollowUp.findById(
            followUpId
        );

    if (!followUp) {

        throw new BusinessError(

            "Follow-up not found.",

            404

        );

    }

    await FollowUp.findByIdAndDelete(
        followUpId
    );

    return {

        success: true,

        message:
            "Follow-up deleted successfully."

    };

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