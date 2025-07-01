const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Local JSON user store
const USERS_FILE = path.join(__dirname, 'users.json');

// Register route
app.post('/register', (req, res) => {
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

  users.push({ username, password });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  res.redirect(`/login.html`);
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Missing credentials');
  }

  let users = [];
  if (fs.existsSync(USERS_FILE)) {
    users = JSON.parse(fs.readFileSync(USERS_FILE));
  }

  const matched = users.find(u => u.username === username && u.password === password);
  if (!matched) {
    return res.status(401).send('Invalid credentials');
  }

  // Redirect to chat.html with query param
  res.redirect(`/chat.html?user=${encodeURIComponent(username)}`);
});

// Socket.io
io.on('connection', (socket) => {
  console.log('✅ A user connected');

  // Handle chat messages
  socket.on('chat message', (msg) => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    io.emit('chat message', {
      user: socket.username || 'Guest',
      text: msg,
      time: new Date()
    });
  });

  // Handle typing
  socket.on('typing', (user) => {
    socket.username = user;
    socket.broadcast.emit('typing', user);
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
