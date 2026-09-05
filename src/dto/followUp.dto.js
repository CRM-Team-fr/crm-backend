// ----------------------------
// Single Follow-up DTO
// ----------------------------

const buildFollowUp = (followUp) => {

    if (!followUp) return null;

    return {

        id: followUp._id,

        customerProfileId: followUp.customerProfile?._id ||

            followUp.customerProfile,

        customer:

            followUp.customerProfile?.user

                ? {

                    id: followUp.customerProfile._id,

                    businessName:

                        followUp.customerProfile.businessName,

                    customerName:

                        followUp.customerProfile.user.Name,

                    phoneNumber:

                        followUp.customerProfile.user.phoneNumber

                }

                : undefined,

        title: followUp.title,

        description: followUp.description,

        followUpDate: followUp.followUpDate,

        taskType: followUp.taskType,

        priority: followUp.priority,

        status: followUp.status,

        outcome: followUp.outcome,

        remarks: followUp.remarks,

        completedAt: followUp.completedAt,

        createdBy:

            followUp.createdBy

                ? {

                    id: followUp.createdBy._id,

                    Name: followUp.createdBy.Name,

                    role: followUp.createdBy.role

                }

                : null,

        createdAt: followUp.createdAt,

        updatedAt: followUp.updatedAt

    };

};

// ----------------------------
// Follow-up List DTO
// ----------------------------

const buildFollowUpList = (followUps = []) => {

    return followUps.map(buildFollowUp);

};

module.exports = {

    buildFollowUp,

    buildFollowUpList

};