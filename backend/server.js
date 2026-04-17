require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors({
    origin: [
        'https://ai-counseller-two.vercel.app', 
        'http://localhost:5173', 
        'http://localhost:5174', 
        'http://localhost:5175', 
        'http://localhost:5176'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/user', userRoutes);

// Base route
app.get('/api', (req, res) => {
    res.json({ message: "Neo AI Counsellor Backend Running" });
});

// Basic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;

const startServer = (port) => {
    const server = app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is busy. Clearing it for you...`);
            const { exec } = require('child_process');
            // Forcefully kill any process on this port (cross-platform compatible)
            const command = process.platform === 'win32' 
                ? `npx -y kill-port ${port}` 
                : `lsof -ti:${port} | xargs kill -9`;
            
            exec(command, (killErr) => {
                if (killErr) {
                    console.error(`Could not clear port ${port}:`, killErr.message);
                    console.log(`PERMANENT FIX: Please run 'npm run dev' instead of 'nodemon server.js'`);
                    process.exit(1);
                } else {
                    console.log(`Port ${port} cleared. Restarting now...`);
                    // Small delay to ensure port is released by OS
                    setTimeout(() => startServer(port), 1000);
                }
            });
        } else {
            console.error('Server error:', err);
        }
    });
};

startServer(PORT);
