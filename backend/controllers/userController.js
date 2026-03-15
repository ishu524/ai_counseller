// @desc    Get user dashboard data
// @route   GET /api/user/dashboard
// @access  Private
const getDashboardData = async (req, res) => {
    try {
        // Return sample wellness data as requested
        const dashboardData = {
            moodToday: "Calm",
            weeklyConversations: 3,
            wellnessScore: 85,
            reflectionPrompt: "What is one thing you did well today?"
        };

        res.status(200).json(dashboardData);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Server error while fetching dashboard data' });
    }
};

module.exports = {
    getDashboardData
};
