# 💬 Real-Time Chat Application
---
 A real-time chat app built with Node.js, Express, and Socket.io.
Users can register, login, and chat instantly with others in a clean and ##responsive interface. 🚀


# ✨ Features
---

 • 📝 User Registration & Login with secure password hashing using bcryptjs

 • 🕒 Display message timestamps

 • 🌙 Dark mode toggle

 • ⌨️ Typing indicators to show when someone is typing

 • ⚡ Real-time Messaging powered by Socket.io WebSockets

 • 🎨 Responsive, clean UI with a light green theme

 • 🔐 Passwords are securely hashed for user safety

 • ☁️ Deployed on Render.com for easy access anywhere


# 🔗 Live Demo
---

 Try the app here:
 https://chatting-app-z3j8.onrender.com


# 🛠 Technologies Used

• Backend: Node.js, Express, Socket.io, bcryptjs

• Frontend: HTML, CSS, JavaScript

• Deployment: Render.com

• Data Storage: (Add here if using JSON, MongoDB, or any other DB)


# 📂 Project Structure
---

<pre>```bash/chatting-app
  ├── server.js            # Main server file
  ├── routes.js            # API routes (if any)
  ├── controllers/         # (Optional) Business logic handlers
  ├── models/              # (Optional) Data models
  └── public/              # Frontend static files
      ├── css/
      │   └── style.css    # Stylesheet
      ├── js/
      │   └── chat.js      # Frontend JS for chat functionality
      ├── login.html       # Login page
      ├── register.html    # Registration page
      └── chat.html        # Chat interface page ```</pre>



# 🚀 Getting Started
---
## Prerequisites

• Node.js (v12+ recommended)   
• npm (comes with Node.js)

# Installation
---
1.Clone the repository

```bash

git clone <repository-url>
cd chatting-app
```

2.Install dependencies

```bash

Copy code
npm install
```

3.Start the server

```bash
npm start
```

4.Access the app

Open your browser and go to:

```arduino

http://localhost:10000
```

## ⚙️ Environment Variables

Create a .env file in the project root with the following:

```ini

PORT=10000
SESSION_SECRET=your_secret_key
```
• PORT: Server port (default 10000)

• SESSION_SECRET: Secret key for session management and security


# 🧑‍💻 How to Use
---

1. Register a new account by filling out the registration form 📝

2. Login using your username and password 🔐

3. Start chatting in real-time with other online users 💬

4. See messages update instantly without page reloads ⚡

5. Log out when done or switch accounts 🔄


# 🛠 Key Code Highlights
---

• Passwords are hashed with bcryptjs before saving for security 🔐

• Socket.io handles real-time bidirectional communication between client & server ⚡

• Express serves static frontend files and APIs 🚦

• Sessions track logged-in users securely with cookies and session middleware 🔑

# ❓ Troubleshooting
---

• 502 Bad Gateway on Render?

Use uptime monitoring tools like UptimeRobot to send periodic pings and keep your app awake ⏰

• Socket connection errors?

Ensure your client and server Socket.io versions match closely to avoid compatibility issues 🔄

• Static files (CSS/JS) not loading?

Verify Express middleware for serving static files is properly configured 📂

• Environment variables not working?

Double-check .env file is correctly named and variables are loaded properly 🔍


#🚧 Future Enhancements
---

• 🔐 Private one-on-one messaging between users

• 💾 Persist chat history using a database (MongoDB, etc.)

• 🔔 Notifications for new messages


# 📄 License
---

 This project is licensed under the MIT License — see the LICENSE file for details.

