💬 Real-Time Chat Application
A real-time chat app built with Node.js, Express, and Socket.io.
Users can register, login, and chat instantly with others in a clean and responsive interface. 🚀

✨ Features
📝 User Registration & Login with secure password hashing using bcryptjs

⚡ Real-time Messaging powered by Socket.io WebSockets

👥 Display online/offline user status dynamically

🎨 Responsive, clean UI with a light green theme

🔐 Passwords are securely hashed for user safety

☁️ Deployed on Render.com for easy access anywhere

🔗 Live Demo
Try the app here:
https://chatting-app-z3j8.onrender.com

🛠 Technologies Used
Backend: Node.js, Express, Socket.io, bcryptjs

Frontend: HTML, CSS, JavaScript

Deployment: Render.com

Data Storage: (Add here if using JSON, MongoDB, or any other DB)

📂 Project Structure
bash
Copy code
/backend
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
      └── chat.html        # Chat interface page
🚀 Getting Started
Prerequisites
Node.js (v12+ recommended)

npm (comes with Node.js)

Installation
Clone the repository

bash
Copy code
git clone <repository-url>
cd chatting-app
Install dependencies

bash
Copy code
npm install
Start the server

bash
Copy code
npm start
Access the app

Open your browser and go to:

arduino
Copy code
http://localhost:10000
⚙️ Environment Variables
Create a .env file in the project root with the following:

ini
Copy code
PORT=10000
SESSION_SECRET=your_secret_key
PORT: Server port (default 10000)

SESSION_SECRET: Secret key for session management and security

🧑‍💻 How to Use
Register a new account by filling out the registration form 📝

Login using your username and password 🔐

Start chatting in real-time with other online users 💬

See messages update instantly without page reloads ⚡

Log out when done or switch accounts 🔄

🛠 Key Code Highlights
Passwords are hashed with bcryptjs before saving for security 🔐

Socket.io handles real-time bidirectional communication between client & server ⚡

Express serves static frontend files and APIs 🚦

Sessions track logged-in users securely with cookies and session middleware 🔑

❓ Troubleshooting
502 Bad Gateway on Render?
Use uptime monitoring tools like UptimeRobot to send periodic pings and keep your app awake ⏰

Socket connection errors?
Ensure your client and server Socket.io versions match closely to avoid compatibility issues 🔄

Static files (CSS/JS) not loading?
Verify Express middleware for serving static files is properly configured 📂

Environment variables not working?
Double-check .env file is correctly named and variables are loaded properly 🔍

🚧 Future Enhancements
🔐 Private one-on-one messaging between users

🕒 Display message timestamps

🌙 Dark mode toggle

⌨️ Typing indicators to show when someone is typing

💾 Persist chat history using a database (MongoDB, etc.)

🔔 Notifications for new messages

📄 License
This project is licensed under the MIT License — see the LICENSE file for details.

If you want, I can also help generate setup instructions for deployment or add screenshots — just ask! 😊
