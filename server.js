const bcrypt = require('bcryptjs');
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const fs = require('fs');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');

const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});


// Local JSON user store
const USERS_FILE = path.join(__dirname, 'users.json');

// Register route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Missing username or password');
    }

    let users = [];
    if (fs.existsSync(USERS_FILE)) {
        users = JSON.parse(fs.readFileSync(USERS_FILE));
    }

    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(409).send('Username already taken');
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    users.push({ username, password: hashedPassword });
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    res.redirect(`/login.html`);
});


// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Missing credentials');
    }

    let users = [];
    if (fs.existsSync(USERS_FILE)) {
        users = JSON.parse(fs.readFileSync(USERS_FILE));
    }

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).send('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).send('Invalid credentials');
    }

    res.redirect(`/chat.html?user=${encodeURIComponent(username)}`);
});

// Socket.io
io.on('connection', (socket) => {
    console.log('✅ A user connected');

    socket.on('join', (username) => {
        console.log(`User joined: ${username}`);
        socket.username = username;  // associate username with this socket
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', {
            user: socket.username || 'Guest', // use socket.username here
            text: msg,
            time: new Date()
        });
    });

    socket.on('typing', (user) => {
        socket.username = user;
        socket.broadcast.emit('typing', user);
    });

    socket.on('disconnect', () => {
        console.log('❌ User disconnected');
    });
    socket.on('disconnect', () => {
        console.log('❌ User disconnected');
    });
    socket.on('message read', (user) => {
        socket.broadcast.emit('message read', user);
    });
});


// Handle typing




// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});