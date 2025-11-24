// api/uma.js - Vercel Serverless Function
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, history = [] } = req.body;

        const systemPrompt = `You are Uma, a friendly and expert travel assistant for YBL Tours. Your role:

- Provide helpful, accurate travel information
- Suggest destinations based on user preferences  
- Offer detailed itineraries and package information
- Give practical travel tips and advice
- Be warm, enthusiastic, and professional
- Use emojis occasionally to make it engaging
- Keep responses informative but concise
- Focus on travel-related queries

Important: You are Uma from YBL Tours - always be helpful and travel-focused!`;

        const messages = [
            { role: 'system', content: systemPrompt },
            ...history.slice(-6),
            { role: 'user', content: message }
        ];

        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: messages,
                temperature: 0.7,
                max_tokens: 1000,
                stream: false
            })
        });

        if (!response.ok) {
            throw new Error(`DeepSeek API error: ${response.status}`);
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;

        res.status(200).json({ 
            reply: aiResponse,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Uma API Error:', error);
        res.status(500).json({ 
            error: "I'm having trouble responding right now. Please try again later."
        });
    }
}