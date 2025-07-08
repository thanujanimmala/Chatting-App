document.addEventListener('DOMContentLoaded', () => {

    fetch('/current-user')
  .then(res => res.json())
  .then(data => {
    currentUser = data.username || 'Guest';
    // You can also update UI to show username if needed
  })
  .catch(() => {
    currentUser = 'Guest';
  });
    
    const socket = io();

    const messages = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');

    const gifInput = document.getElementById('gifInput');
    const gifBtn = document.getElementById('gifBtn');
    const gifResults = document.getElementById('gifResults');

    const typingIndicator = document.getElementById('typingIndicator');
    let typingTimeout; // Add this line

    // Get username from query string
    const params = new URLSearchParams(window.location.search);
    const currentUser = params.get('user') || 'Guest';
    // Send username to server immediately
    socket.emit('join', currentUser);

    const darkModeToggle = document.getElementById('darkModeToggle');

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.textContent = '☀️ Light Mode';
        } else {
            darkModeToggle.textContent = '🌙 Dark Mode';
        }
    });


    // Append message to chat window
    // ...existing code...
    function appendMessage(user, content, time = new Date()) {
        const isOwn = user === currentUser;

        const wrapper = document.createElement('div');
        wrapper.classList.add('message-container', isOwn ? 'right' : 'left');

        const message = document.createElement('div');
        message.classList.add(isOwn ? 'my-message' : 'other-message');
        message.innerHTML = `<strong>${user}:</strong> ${content}`;

        const timestamp = document.createElement('span');
        timestamp.classList.add('timestamp');
        timestamp.textContent = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Place timestamp inside the message bubble
        message.appendChild(timestamp);

        wrapper.appendChild(message);
        messages.appendChild(wrapper);
        messages.scrollTop = messages.scrollHeight;

        socket.on('message read', (user) => {
            // Remove previous read receipts if any
            const existing = document.querySelectorAll('.read-receipt');
            existing.forEach(el => el.remove());


            // Attach it to the last message
            const allMessages = document.querySelectorAll('.message-container');
            const last = allMessages[allMessages.length - 1];
            if (last) last.appendChild(readNotice);
            let gifCloseTimeout;

            function resetGifCloseTimer() {
                clearTimeout(gifCloseTimeout);
                gifCloseTimeout = setTimeout(() => {
                    gifResults.innerHTML = '';
                }, 10000); // 10 seconds of no activity = close GIF box
            }

            // Call this function every time GIF results update or user types in GIF input
            gifInput.addEventListener('input', () => {
                resetGifCloseTimer();
            });



        });


    }
    // ...existing code...

    // Send text message
    sendBtn.addEventListener('click', () => {
        const msg = messageInput.value.trim();
        if (msg !== '') {
            socket.emit('chat message', msg);
            messageInput.value = '';
        }
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendBtn.click();
        else socket.emit('typing', currentUser);
    });

    // Send GIF
    gifBtn.addEventListener('click', () => {
        const keyword = gifInput.value.trim();
        if (!keyword) return;

        const GIPHY_API_KEY = 'kdGvVwD9yZ8OwrktXRmCNgncVDgVocqC';

        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${keyword}&limit=15`)
            .then(res => res.json())
            .then(data => {
                gifResults.innerHTML = '';

                if (data.data.length === 0) {
                    gifResults.innerHTML = '<p>No GIFs found!</p>';
                    return;
                }

                data.data.forEach(gif => {
                    const img = document.createElement('img');
                    img.src = gif.images.fixed_height.url;
                    img.alt = 'GIF';
                    img.addEventListener('click', () => {
                        const imgHTML = `<img src="${gif.images.fixed_height.url}" alt="GIF" style="max-width:200px;">`;
                        socket.emit('chat message', imgHTML);
                        gifResults.innerHTML = '';
                    });
                    gifResults.appendChild(img);
                });
            })

            .catch(err => {
                console.error('GIF Fetch Error:', err);
                alert('Failed to load GIF');
            });
        fetch(`https://api.giphy.com/v1/gifs/search?...`)
            .then(res => res.json())
            .then(data => {
                // show GIFs code ...

                resetGifCloseTimer();  // <-- start/refresh timer
            });

        gifInput.value = '';
    });

    // Receive and display message
    // ...existing code...
    // Receive and display message
    socket.on('chat message', ({ user, text, time }) => {
        let dateObj;
        if (time) {
            // Try to parse time, fallback to now if invalid
            dateObj = new Date(time);
            if (isNaN(dateObj.getTime())) {
                dateObj = new Date();
            }
        } else {
            dateObj = new Date();
        }
        appendMessage(user, text, dateObj);
    });
    // ...existing code...
    // Typing indicator
    let typingUsers = new Set();  // Track who is typing

    socket.on('typing', (username) => {
        if (username === currentUser) return;  // Don't show own typing

        typingUsers.add(username);
        updateTypingIndicator();

        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            typingUsers.delete(username);
            updateTypingIndicator();
        }, 2000);
    });

    function updateTypingIndicator() {
        if (typingUsers.size === 0) {
            typingIndicator.style.display = 'none';
        } else {
            typingIndicator.style.display = 'block';
            const users = Array.from(typingUsers);
            const msg = users.length === 1
                ? `${users[0]} is typing...`
                : `${users.join(', ')} are typing...`;
            typingIndicator.textContent = msg;
        }
    }

    document.getElementById('logoutBtn').addEventListener('click', () => {
        window.location.href = '/login.html';
    });
    document.addEventListener('click', (event) => {
        if (!gifResults.contains(event.target) && event.target !== gifInput && event.target !== gifBtn) {
            gifResults.innerHTML = '';
        }   
    });



});