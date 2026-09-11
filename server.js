const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// 1. Built-in Middleware: Parses incoming JSON requests
app.use(express.json());

// 2. Custom Middleware: Logs request details
const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} request made to: ${req.url}`);
    
    // Crucial: Call next() to pass control to the next middleware/route handler
    next(); 
};

// Apply the custom middleware globally to all routes
app.use(requestLogger);

// 3. Route Handler (Final Middleware)
app.get('/', (req, res) => {
    res.send('Welcome to your Express Middleware Server!');
});

app.get('/api/data', (req, res) => {
    res.json({ message: "Hello World", status: "success" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running smoothly on http://localhost:${PORT}`);
});
