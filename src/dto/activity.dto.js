// ----------------------------
// Single Activity DTO
// ----------------------------

const buildActivity = (activity) => {

    if (!activity) return null;

    return {

        id: activity._id,

        customerProfileId: activity.customerProfile,

        activityType: activity.activityType,

        title: activity.title,

        description: activity.description,

        metadata: activity.metadata,

        isPinned: activity.isPinned,

        createdBy: activity.createdBy

            ? {

                id: activity.createdBy._id,

                Name: activity.createdBy.Name,

                role: activity.createdBy.role

            }

            : null,

        createdAt: activity.createdAt,

        updatedAt: activity.updatedAt

    };

};

// ----------------------------
// Activity List DTO
// ----------------------------

const buildActivityList = (activities = []) => {

    return activities.map(buildActivity);

};

module.exports = {

    buildActivity,

    buildActivityList

};