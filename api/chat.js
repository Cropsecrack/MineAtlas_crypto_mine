'use strict';

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1500;

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'AI service is not configured' });

  const messages = req.body && req.body.messages;
  if (!Array.isArray(messages) || messages.length < 1 || messages.length > MAX_MESSAGES) {
    return res.status(400).json({ error: 'Provide between 1 and 12 chat messages.' });
  }

  const safeMessages = [];
  for (const message of messages) {
    if (!message || !['user', 'assistant'].includes(message.role) || typeof message.content !== 'string' || !message.content.trim() || message.content.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({ error: 'Invalid message. Each message must be plain text up to 1,500 characters.' });
    }
    safeMessages.push({ role: message.role, content: message.content.trim() });
  }
  if (safeMessages[safeMessages.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'The last message must be from the user.' });
  }

  try {
    const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are VoltDrop’s helpful general-purpose AI assistant. Answer the user’s actual question clearly and helpfully, including topics beyond mining. Be honest about uncertainty and do not claim access to live inventory, orders, financial data, or current market facts unless supplied in the conversation. For crypto/mining questions, explain risks and assumptions; never promise profits or provide personalized financial advice. Never ask for seed phrases, private keys, passwords, one-time codes, payment credentials, or personal data. If a user shares secrets, tell them to treat them as compromised and never repeat them.' },
          ...safeMessages
        ],
        max_tokens: 700,
        temperature: 0.6
      })
    });
    if (!upstream.ok) {
      console.error('AI provider returned status', upstream.status);
      return res.status(502).json({ error: 'AI provider request failed' });
    }
    const result = await upstream.json();
    const reply = result.choices && result.choices[0] && result.choices[0].message && result.choices[0].message.content;
    if (typeof reply !== 'string' || !reply.trim()) return res.status(502).json({ error: 'AI provider returned an empty response' });
    return res.status(200).json({ reply: reply.trim() });
  } catch (error) {
    console.error('AI chat request failed', error && error.message);
    return res.status(502).json({ error: 'Unable to reach AI provider' });
  }
};
