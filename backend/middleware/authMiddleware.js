const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    // Guest access: Always use a default user ID to store messages
    req.user = { id: "605c721c430e5218d867abc1" };
    next();
};

module.exports = { protect };
