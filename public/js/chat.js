document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    const messages = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');

    const gifInput = document.getElementById('gifInput');
    const gifBtn = document.getElementById('gifBtn');
    const gifResults = document.getElementById('gifResults');

    const typingIndicator = document.getElementById('typing-indicator');
    let typingTimeout; // Add this line

    // Get username from query string
    const params = new URLSearchParams(window.location.search);
    const currentUser = params.get('user') || 'Guest';

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
    socket.on('typing', (username) => {
        typingIndicator.textContent = `${username} is typing`;
        typingIndicator.style.display = 'block';

        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            typingIndicator.style.display = 'none';
        }, 1000);
    });

});