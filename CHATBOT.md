# Chatbot integration

The chatbot in `chatbot.js` is a lightweight, browser-only FAQ assistant. It is not a generative AI model and does not make network requests or persist chat messages.

To enable it on the storefront, add this script tag immediately before `</body>` in `index.html`:

```html
<script src="chatbot.js" defer></script>
```

The widget uses `textContent` for user-provided text and does not request seed phrases, credentials, payment details, or personal information. Do not treat it as a live payment/order support channel.

For a real generative AI integration, send requests to a server-side endpoint that enforces rate limits, privacy controls, and safe input handling. Keep AI provider API keys on the server—never put them in browser JavaScript. Avoid sending checkout, payment, recovery-phrase, or other sensitive information to a model.
