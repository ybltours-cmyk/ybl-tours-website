// Enhanced AI Assistant with DeepSeek API Integration
document.addEventListener('DOMContentLoaded', function() {
    const aiAssistant = document.querySelector('.ai-assistant');
    const aiToggle = document.querySelector('.ai-toggle');
    const aiClose = document.querySelector('.ai-close');
    const aiSend = document.getElementById('ai-send-btn');
    const aiInput = document.getElementById('ai-chat-input');
    const aiMessages = document.querySelector('.ai-messages');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');

    // Check if elements exist
    if (!aiAssistant || !aiToggle || !aiMessages) {
        console.error('AI Assistant elements not found');
        return;
    }

    let chatHistory = [];
    let isProcessing = false;

    // Initialize AI Assistant
    initAIAssistant();

    function initAIAssistant() {
        setupEventListeners();
        showWelcomeMessage();
    }

    function setupEventListeners() {
        // Toggle chat window
        aiToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            aiAssistant.classList.toggle('active');
            if (aiAssistant.classList.contains('active') && aiInput) {
                aiInput.focus();
            }
        });

        // Close chat window
        if (aiClose) {
            aiClose.addEventListener('click', function(e) {
                e.stopPropagation();
                aiAssistant.classList.remove('active');
            });
        }

        // Send message functionality
        if (aiSend && aiInput) {
            aiSend.addEventListener('click', sendMessage);
            aiInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });

            // Auto-resize textarea
            aiInput.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = Math.min(this.scrollHeight, 120) + 'px';
            });
        }

        // Suggestion chips
        if (suggestionChips.length > 0) {
            suggestionChips.forEach(chip => {
                chip.addEventListener('click', function() {
                    const question = this.getAttribute('data-question');
                    if (aiInput) {
                        aiInput.value = question;
                        sendMessage();
                    }
                });
            });
        }

        // Close when clicking outside
        document.addEventListener('click', function(event) {
            if (aiAssistant.classList.contains('active') && 
                !aiAssistant.contains(event.target) && 
                !event.target.closest('.ai-toggle')) {
                aiAssistant.classList.remove('active');
            }
        });
    }

    function showWelcomeMessage() {
        const welcomeMessage = `Hello! I'm Uma, your AI travel assistant! ✈️

I can help you with:
• Destination recommendations worldwide
• Custom travel itineraries
• Package details and pricing
• Travel tips and advice
• Booking assistance

What would you like to explore today?`;

        addMessage(welcomeMessage, 'ai');
    }

    async function sendMessage() {
        if (isProcessing || !aiInput) return;
        
        const message = aiInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, 'user');
        chatHistory.push({ role: 'user', content: message });
        
        // Clear input and reset height
        aiInput.value = '';
        aiInput.style.height = 'auto';
        
        // Disable send button during processing
        isProcessing = true;
        if (aiSend) aiSend.disabled = true;
        
        // Show typing indicator
        showTypingIndicator();
        
        try {
            const response = await callDeepSeekAPI(message);
            removeTypingIndicator();
            addMessage(response, 'ai');
            chatHistory.push({ role: 'assistant', content: response });
            
        } catch (error) {
            console.error('AI Assistant Error:', error);
            removeTypingIndicator();
            
            const errorMessage = "I'm having trouble connecting right now. Please try again in a moment or contact our support team for immediate assistance.";
            addMessage(errorMessage, 'ai');
        } finally {
            isProcessing = false;
            if (aiSend) aiSend.disabled = false;
            if (aiInput) aiInput.focus();
        }
    }

    async function callDeepSeekAPI(userMessage) {
        // For now, we'll use mock responses since we don't have the API endpoint
        // In production, you would call your actual API here
        return await generateMockResponse(userMessage);
        
        /* 
        // Example of actual API call (uncomment when you have the endpoint)
        try {
            const response = await fetch('/api/uma', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    history: chatHistory
                })
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            return data.reply || data.message || "I apologize, but I'm having trouble processing your request.";

        } catch (error) {
            console.error('API call failed:', error);
            return await generateMockResponse(userMessage);
        }
        */
    }

    async function generateMockResponse(userMessage) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        
        const lowerMessage = userMessage.toLowerCase();
        
        // Enhanced mock responses
        const responses = {
            'europe': `🇪🇺 **Europe Travel Packages** 🌍
            
• **European Wonders** - 10 Days / 9 Nights from ₹1,62,500
  Explore Paris, Switzerland, Amsterdam with luxury stays

• **Scandinavian Magic** - 8 Days / 7 Nights from ₹1,85,000  
  Discover Norway fjords, Swedish archipelagos, Danish charm

• **Mediterranean Dreams** - 12 Days / 11 Nights from ₹1,45,000
  Spain, Italy, Greece with coastal luxury

All packages include 4-star hotels, daily breakfast, guided tours & airport transfers!`,

            'honeymoon': `💖 **Romantic Honeymoon Packages** 💑
            
• **Maldives Paradise** - 6 Days / 5 Nights from ₹89,999
  ✓ Overwater villa with private pool
  ✓ Couple spa treatments
  ✓ Sunset dolphin cruise
  ✓ Romantic beach dinners

• **Bali Romance** - 7 Days / 6 Nights from ₹54,999
  ✓ Private pool villa
  ✓ Temple tours & cultural shows
  ✓ Couple massage sessions
  ✓ Beach club experiences

• **Swiss Alps Retreat** - 8 Days / 7 Nights from ₹1,25,000
  ✓ Mountain view resorts
  ✓ Scenic train journeys
  ✓ Lake Geneva luxury cruise
  ✓ Alpine adventure activities`,

            'thailand': `🇹🇭 **Thailand Adventure Packages** 🏝️
            
• **Highlights of Thailand** - 7 Days / 6 Nights from ₹71,900
  Bangkok → Pattaya → Phuket
  ✓ City temple tours
  ✓ Coral island speedboat
  ✓ Phi Phi islands exploration
  ✓ Cultural shows & night markets

• **Thai Culture Explorer** - 10 Days / 9 Nights from ₹82,999
  Bangkok → Chiang Mai → Phuket
  ✓ Ancient temple visits
  ✓ Ethical elephant sanctuary
  ✓ Traditional cooking class
  ✓ Mountain trekking experiences`,

            'india': `🇮🇳 **Incredible India Packages** 🕌
            
• **Rajasthan Royalty** - 8 Days / 7 Nights from ₹47,000
  Jaipur → Jodhpur → Udaipur
  ✓ Palace hotel stays
  ✓ Desert camel safari
  ✓ Cultural folk shows
  ✓ Fort and temple tours

• **Kerala Backwaters** - 7 Days / 6 Nights from ₹32,000
  ✓ Houseboat cruise
  ✓ Ayurvedic spa treatments
  ✓ Tea plantation visits
  ✓ Kathakali dance performances

• **Andaman Bliss** - 6 Days / 5 Nights from ₹39,000
  ✓ Island hopping tours
  ✓ Water sports activities
  ✓ Beach resort luxury
  ✓ Cellular jail light show`,

            'default': `I'd love to help you plan your perfect vacation! ✈️

Here's what I can assist you with:
• **Destination recommendations** based on your preferences
• **Detailed package information** and current pricing
• **Custom itinerary planning** for your dream trip
• **Travel tips** and local insights
• **Special offers** and exclusive discounts

Tell me more about what you're looking for:
- Preferred destination or type of vacation
- Travel dates and duration
- Number of people traveling
- Budget range
- Any specific interests (beaches, adventure, culture, relaxation)`
        };

        // Keyword matching for responses
        if (lowerMessage.includes('europe')) return responses.europe;
        if (lowerMessage.includes('honeymoon') || lowerMessage.includes('romantic')) return responses.honeymoon;
        if (lowerMessage.includes('thailand')) return responses.thailand;
        if (lowerMessage.includes('india') || lowerMessage.includes('domestic')) return responses.india;
        if (lowerMessage.includes('offer') || lowerMessage.includes('discount') || lowerMessage.includes('deal')) return `🎉 **Special Offers Available!** 🎊

• **Early Bird Discount**: 15% off on bookings made 60+ days in advance
• **Group Special**: Extra 10% off for groups of 4 or more
• **Honeymoon Bonus**: Free room upgrade + couple massage
• **Summer Sale**: Up to 25% off on selected destinations
• **Last Minute Deals**: Special pricing for upcoming departures

Which destination are you interested in? I'll check the latest offers for you!`;
        
        return responses.default;
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ${sender}-message`;
        
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        const avatarIcon = sender === 'user' ? 'user' : 'robot';
        const formattedText = formatMessage(text);
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-${avatarIcon}"></i>
            </div>
            <div class="message-content">
                <div class="message-text">${formattedText}</div>
                <span class="message-time">${time}</span>
            </div>
        `;
        
        aiMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    function formatMessage(text) {
        return text
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/•/g, '•')
            .replace(/🇪🇺|🇹🇭|💖|🎉|🏖️|✈️|🌍|💑|🏝️|🕌|🎊|🇮🇳/g, '<span style="font-size: 1.2em;">$&</span>');
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'ai-message typing-message';
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

    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    function scrollToBottom() {
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }

    // Add CSS for typing animation
    const style = document.createElement('style');
    style.textContent = `
        .typing-dots {
            display: inline-block;
        }
        .typing-dots span {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #3498db;
            margin: 0 2px;
            animation: typing-bounce 1.4s infinite ease-in-out both;
        }
        .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
        .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
        @keyframes typing-bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
        .ai-message.typing-message .message-content {
            min-height: 40px;
            display: flex;
            align-items: center;
        }
    `;
    document.head.appendChild(style);

    // Make functions globally available
    window.openAIChat = function() {
        aiAssistant.classList.add('active');
        if (aiInput) aiInput.focus();
    };

    window.closeAIChat = function() {
        aiAssistant.classList.remove('active');
    };
});