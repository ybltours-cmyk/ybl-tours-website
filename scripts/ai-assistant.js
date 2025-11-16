// Uma AI Assistant Functionality
document.addEventListener('DOMContentLoaded', function() {
    const aiAssistant = document.querySelector('.ai-assistant');
    const aiToggle = document.querySelector('.ai-toggle');
    const aiClose = document.querySelector('.ai-close');
    const aiSend = document.getElementById('ai-send-btn');
    const aiInput = document.getElementById('ai-chat-input');
    const aiMessages = document.querySelector('.ai-messages');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');

    // Toggle chat window
    if (aiToggle) {
        aiToggle.addEventListener('click', function() {
            aiAssistant.classList.toggle('active');
            if (aiAssistant.classList.contains('active')) {
                aiInput.focus();
            }
        });
    }

    // Close chat window
    if (aiClose) {
        aiClose.addEventListener('click', function() {
            aiAssistant.classList.remove('active');
        });
    }

    // Send message functionality
    if (aiSend && aiInput) {
        aiSend.addEventListener('click', sendMessage);
        aiInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Suggestion chips
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            aiInput.value = question;
            sendMessage();
        });
    });

    function sendMessage() {
        const message = aiInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            
            // Clear input
            aiInput.value = '';
            
            // Simulate AI typing
            simulateTyping();
            
            // Generate AI response
            setTimeout(() => {
                generateAIResponse(message);
            }, 1000);
        }
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ${sender}-message`;
        
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-${sender === 'user' ? 'user' : 'robot'}"></i>
            </div>
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${time}</span>
            </div>
        `;
        
        aiMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    function simulateTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'ai-message';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        aiMessages.appendChild(typingDiv);
        scrollToBottom();
    }

    function removeTyping() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    function generateAIResponse(userMessage) {
        removeTyping();
        
        // Simple response logic - you'll replace this with DeepSeek API
        const responses = {
            'europe': "I'd be happy to help you with Europe packages! We have amazing deals starting from ₹60,600. Popular destinations include Paris, Rome, Swiss Alps, and Greek Islands. Would you like me to show you specific packages?",
            'honeymoon': "Perfect! For honeymooners, I recommend Bali (₹19,400), Kerala (₹49,900), or Andaman (₹53,400). These packages include romantic dinners, couple spa treatments, and private transfers. Which destination interests you?",
            'thailand': "Thailand is amazing! Best time to visit is November to February. Our 'Highlights of Thailand' package starts at ₹71,900 and includes Bangkok, Pattaya, and Phuket with luxury accommodations.",
            'offers': "We have exclusive offers! 🌟 Europe packages at 15% off, honeymoon packages with free upgrades, and early bird discounts. Which type of package are you interested in?",
            'default': "I can help you find the perfect travel package! I have information on international destinations, honeymoon packages, and special deals. You can ask me about specific countries, budgets, or travel dates. How can I assist you further?"
        };

        const lowerMessage = userMessage.toLowerCase();
        let response = responses.default;

        if (lowerMessage.includes('europe')) response = responses.europe;
        else if (lowerMessage.includes('honeymoon')) response = responses.honeymoon;
        else if (lowerMessage.includes('thailand')) response = responses.thailand;
        else if (lowerMessage.includes('offer')) response = responses.offers;

        addMessage(response, 'ai');
    }

    function scrollToBottom() {
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }

    // Close AI assistant when clicking outside
    document.addEventListener('click', function(event) {
        if (aiAssistant.classList.contains('active') && 
            !aiAssistant.contains(event.target) && 
            event.target !== aiToggle) {
            aiAssistant.classList.remove('active');
        }
    });

    // Add typing dots animation CSS
    const style = document.createElement('style');
    style.textContent = `
        .typing-dots {
            display: flex;
            gap: 4px;
        }
        .typing-dots span {
            width: 8px;
            height: 8px;
            background: var(--text-light);
            border-radius: 50%;
            animation: typingAnimation 1.4s infinite ease-in-out;
        }
        .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
        .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
        @keyframes typingAnimation {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});