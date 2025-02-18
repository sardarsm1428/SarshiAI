document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    // Replace this with your actual API key
    const API_KEY = '';

    // Function to add a message to the chat box
    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
        // Add title to the message
        const titleElement = document.createElement('div');
        titleElement.classList.add('message-title');
        titleElement.textContent = sender === 'user' ? 'You' : 'Sarshi';
        messageElement.appendChild(titleElement);
        // Add message content
        const contentElement = document.createElement('div');
        contentElement.textContent = message;
        messageElement.appendChild(contentElement);
        // Append the message to the chat box
        chatBox.appendChild(messageElement);
        // Scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Function to send user message and get bot response
    async function sendMessage() {
        const userMessage = userInput.value.trim().toLowerCase();
        if (!userMessage) return;

        // Add user message to the chat
        addMessage(userMessage, 'user');

        // Clear input field
        userInput.value = '';

        // Check for custom responses
        if (userMessage.includes('who are you') || userMessage.includes('who was you') || userMessage.includes('who are you ?')) {
            addMessage(
                "Greetings! I'm Sarshi, an artificial intelligence assistant created by Sardar Peer Ali. I'm at your service and would be delighted to assist you with any inquiries or tasks you may have.",
                'bot'
            );
            return;
        }
        if (userMessage.includes('who developed you') || userMessage.includes('who developed you?') || userMessage.includes('who created you') || userMessage.includes('who created you?')) {
            addMessage(
                "I was developed by Sardar Peer Ali, specialized in artificial intelligence and related technologies. If you have any more questions or need assistance, feel free to ask!",
                'bot'
            );
            return;
        }
        if (
            userMessage.includes('when were you developed') ||
            userMessage.includes('development year') ||
            userMessage.includes('when were you launched') ||
            userMessage.includes('in which year you was developed') ||
            userMessage.includes('when was you developed') ||
            userMessage.includes('your development year')
        ) {
            addMessage(
                "I was developed in the year 2025 and officially launched on May 28, 2025.",
                'bot'
            );
            return;
        }

        // Send message to the API and get the response
        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: "qwen/qwen-vl-plus:free", // Updated model name
                    messages: [{ role: "user", content: userMessage }],
                }),
            });
            const data = await response.json();
            const botMessage = data.choices[0].message.content;

            // Add bot message to the chat
            addMessage(botMessage, 'bot');
        } catch (error) {
            console.error('Error fetching response:', error);
            addMessage('Sorry, there was an error processing your request.', 'bot');
        }
    }

    // Event listener for the send button
    sendBtn.addEventListener('click', sendMessage);

    // Event listener for pressing Enter key
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Background Formulas
    const formulas = [
        "if d[u] + w(u,v) < d[v], then d[v] = d[u] + w(u,v)",
        "xₙ₊₁ = xₙ - f(xₙ) / f'(xₙ)",
        "F(n) = F(n-1) + F(n-2)",
        "E = mc²",
        "∑_(i=1)^n i = n(n+1)/2",
        "A = πr²",
        "V = 4/3 πr³",
        "O(log n)",
        "∇f(x) = [∂f/∂x₁, ∂f/∂x₂, ..., ∂f/∂xₙ]",
        "P(A|B) = P(B|A) * P(A) / P(B)"
    ];
    const backgroundFormulas = document.querySelector('.background-formulas');

    function createBackgroundFormulas() {
        for (let i = 0; i < 50; i++) {
            const formulaElement = document.createElement('div');
            formulaElement.classList.add('formula');
            formulaElement.textContent = formulas[Math.floor(Math.random() * formulas.length)];
            formulaElement.style.top = `${Math.random() * 100}vh`;
            formulaElement.style.left = `${Math.random() * 100}vw`;
            formulaElement.style.fontSize = `${Math.random() * 1.5 + 0.8}rem`;
            formulaElement.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
            backgroundFormulas.appendChild(formulaElement);
        }
    }

    createBackgroundFormulas();
});
