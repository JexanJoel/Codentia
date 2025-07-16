// Check authentication
function checkAuth() {
    const user = localStorage.getItem('cropkind_user');
    if (!user) {
        window.location.href = 'index.html';
        return;
    }
}

const apiKey = 'AIzaSyCDjk5_zYo7zXJmxhcfS5LzvTPAhhoFx4s'; // Replace with your real Gemini API key
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');

const chatHistory = [];

async function sendMessage() {
  const userMessage = messageInput.value.trim();
  if (!userMessage) return;

  // Add user message to chat UI
  addMessage(userMessage, 'user');
  messageInput.value = '';

  // Push to chat history
  chatHistory.push({
    role: "user",
    parts: [{ text: userMessage }]
  });

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: chatHistory })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Unknown error from Gemini');
    }

    const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't understand that.";
    addMessage(aiReply, 'ai');

    chatHistory.push({
      role: "model",
      parts: [{ text: aiReply }]
    });

  } catch (err) {
    console.error("Gemini Error:", err);
    addMessage(`⚠ Error: ${err.message}`, 'ai');
  }
}

function addMessage(text, sender) {
  const messageEl = document.createElement('div');
  messageEl.className = `flex items-start space-x-3 ${sender === 'user' ? 'justify-end' : ''}`;
  messageEl.innerHTML = `
    ${sender === 'user' ? '' : `<div class="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center text-white text-sm">🤖</div>`}
    <div class="${sender === 'user' ? 'bg-green-700 text-white' : 'bg-white dark:bg-gray-800 text-black dark:text-white'} p-3 rounded-lg shadow max-w-sm">
      ${text}
    </div>
    ${sender === 'user' ? `<div class="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-white text-sm">👤</div>` : ''}
  `;
  chatMessages.appendChild(messageEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Optional: Enter key support
messageInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});