const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    // For local testing purposes to connect frontend directly to Gemini without Login UI:
    // We are temporarily hardcoding a fallback valid ObjectId 
    req.user = { id: "605c721c430e5218d867abc1" };
    next();
    
    /* 
    // REAL AUTHENTICATION LOGIC:
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = { id: decoded.userId };
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
    */
};

module.exports = { protect };
