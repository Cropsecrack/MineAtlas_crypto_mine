/*
 * CryptoDrop helper chatbot.
 * This is a lightweight, local FAQ assistant—not a generative AI model.
 * It makes no network requests and never stores chat messages. For a real LLM,
 * connect a backend endpoint and keep provider credentials on that server.
 */
(() => {
  'use strict';

  if (document.getElementById('cryptodrop-chatbot')) return;

  const styles = `
    #cryptodrop-chatbot { --chat-bg:#0f1623; --chat-border:#26344c; --chat-accent:#06b6d4; color:#e2e8f0; font:14px/1.45 Inter,system-ui,sans-serif; }
    #cryptodrop-chatbot * { box-sizing:border-box; }
    #cryptodrop-chatbot button, #cryptodrop-chatbot input { font:inherit; }
    #cryptodrop-chatbot .chat-launcher { position:fixed; right:20px; bottom:20px; z-index:80; border:0; border-radius:999px; padding:13px 18px; background:var(--chat-accent); color:#06202a; font-weight:800; box-shadow:0 12px 32px #0008; cursor:pointer; }
    #cryptodrop-chatbot .chat-panel { position:fixed; right:20px; bottom:82px; z-index:80; width:min(380px,calc(100vw - 32px)); height:min(520px,calc(100vh - 120px)); display:none; flex-direction:column; overflow:hidden; background:var(--chat-bg); border:1px solid var(--chat-border); border-radius:18px; box-shadow:0 20px 60px #0009; }
    #cryptodrop-chatbot .chat-panel[data-open="true"] { display:flex; }
    #cryptodrop-chatbot .chat-head { display:flex; align-items:center; justify-content:space-between; padding:14px 16px; border-bottom:1px solid var(--chat-border); }
    #cryptodrop-chatbot .chat-title { margin:0; font-size:15px; color:#fff; }
    #cryptodrop-chatbot .chat-close { border:0; background:transparent; color:#cbd5e1; padding:4px 8px; cursor:pointer; }
    #cryptodrop-chatbot .chat-note { margin:0; padding:9px 14px; color:#cbd5e1; background:#111c2c; font-size:11px; }
    #cryptodrop-chatbot .chat-messages { display:flex; flex:1; flex-direction:column; gap:10px; overflow:auto; padding:14px; }
    #cryptodrop-chatbot .chat-message { max-width:90%; padding:10px 12px; border-radius:13px; white-space:pre-wrap; overflow-wrap:anywhere; }
    #cryptodrop-chatbot .chat-message.bot { align-self:flex-start; background:#1b293c; }
    #cryptodrop-chatbot .chat-message.user { align-self:flex-end; background:#075b6a; color:#fff; }
    #cryptodrop-chatbot .chat-form { display:flex; gap:8px; padding:12px; border-top:1px solid var(--chat-border); }
    #cryptodrop-chatbot .chat-input { flex:1; min-width:0; padding:10px 12px; color:#fff; background:#080c14; border:1px solid var(--chat-border); border-radius:10px; }
    #cryptodrop-chatbot .chat-send { border:0; border-radius:10px; padding:0 14px; background:var(--chat-accent); color:#06202a; font-weight:800; cursor:pointer; }
    #cryptodrop-chatbot button:focus-visible, #cryptodrop-chatbot input:focus-visible { outline:3px solid #67e8f9; outline-offset:2px; }
    @media (max-width:480px) { #cryptodrop-chatbot .chat-launcher { right:12px; bottom:12px; } #cryptodrop-chatbot .chat-panel { right:8px; bottom:70px; width:calc(100vw - 16px); height:min(70vh,560px); } }
    @media (prefers-reduced-motion: reduce) { #cryptodrop-chatbot *, #cryptodrop-chatbot *::before, #cryptodrop-chatbot *::after { scroll-behavior:auto !important; animation:none !important; transition:none !important; } }
  `;

  const root = document.createElement('div');
  root.id = 'cryptodrop-chatbot';
  root.innerHTML = `
    <button class="chat-launcher" type="button" aria-expanded="false" aria-controls="cryptodrop-chat-panel">Ask the store assistant</button>
    <section class="chat-panel" id="cryptodrop-chat-panel" role="dialog" aria-label="Store assistant" aria-modal="false" data-open="false">
      <header class="chat-head"><h2 class="chat-title">CryptoDrop Store Assistant</h2><button class="chat-close" type="button" aria-label="Close assistant">Close</button></header>
      <p class="chat-note">Local FAQ assistant, not a generative AI. Don’t share passwords, seed phrases, payment details, or personal information. Replies are informational; verify product, delivery, and price details with the store.</p>
      <div class="chat-messages" role="log" aria-live="polite" aria-relevant="additions text"></div>
      <form class="chat-form"><label for="cryptodrop-chat-input" class="sr-only">Ask a question</label><input class="chat-input" id="cryptodrop-chat-input" maxlength="500" autocomplete="off" placeholder="Ask about wallets, miners, or the calculator…"><button class="chat-send" type="submit">Send</button></form>
    </section>`;

  const style = document.createElement('style');
  style.textContent = styles;
  document.head.append(style);
  document.body.append(root);

  const launcher = root.querySelector('.chat-launcher');
  const panel = root.querySelector('.chat-panel');
  const closeButton = root.querySelector('.chat-close');
  const messages = root.querySelector('.chat-messages');
  const input = root.querySelector('.chat-input');
  const form = root.querySelector('.chat-form');

  function addMessage(text, sender) {
    const message = document.createElement('div');
    message.className = `chat-message ${sender}`;
    message.textContent = text;
    messages.append(message);
    messages.scrollTop = messages.scrollHeight;
  }

  function openChat() {
    panel.dataset.open = 'true';
    launcher.setAttribute('aria-expanded', 'true');
    input.focus();
  }

  function closeChat() {
    panel.dataset.open = 'false';
    launcher.setAttribute('aria-expanded', 'false');
    launcher.focus();
  }

  function answer(question) {
    const q = question.toLowerCase();
    if (/seed phrase|recovery phrase|private key|password|otp|one.time|wallet address|payment details/.test(q)) {
      return 'Please don’t share seed phrases, private keys, passwords, OTPs, payment details, or personal information here. This assistant cannot verify payments or handle account/order data.';
    }
    if (/roi|profit|profitable|electricity|mining calculator|payback/.test(q)) {
      return 'The ASIC calculator is an illustrative estimate only. Mining revenue, network difficulty, coin prices, pool fees, cooling, taxes, and electricity rates change. It is not financial advice or a guarantee of profit.';
    }
    if (/order|track|tracking|delivery|shipping|pincode/.test(q)) {
      return 'I can’t access live order or delivery records. Please use the store’s verified order-support channel; don’t post your order number, address, or phone number in this chat.';
    }
    if (/payment|upi|neft|crypto|bitcoin|btc|ethereum|eth|escrow/.test(q)) {
      return 'I can’t validate payment methods, escrow, wallet addresses, rates, or transactions. Confirm current payment instructions directly through a verified official store channel before sending money.';
    }
    if (/wallet|tangem|ledger|trezor|cold storage/.test(q)) {
      return 'The catalog includes hardware-wallet products. Compare supported networks, backup method, device compatibility, warranty, and the manufacturer’s official documentation before choosing. Never share a recovery phrase with anyone.';
    }
    if (/miner|antminer|asic|hashrate|kaspa/.test(q)) {
      return 'The catalog includes ASIC miners. Before buying, check the manufacturer’s specification sheet, power draw, electrical capacity, noise, cooling needs, warranty, and current mining economics. Estimates on this site are not profit guarantees.';
    }
    if (/price|cost|discount|promo|coupon/.test(q)) {
      return 'Please check the current catalog for displayed prices and promotion terms. I can’t confirm live inventory, final checkout totals, or whether a promotion is currently valid.';
    }
    if (/hello|hi|hey|namaste/.test(q)) {
      return 'Hello! I can answer general questions about catalog product types, hardware-wallet safety, ASIC considerations, and the calculator. What would you like to know?';
    }
    return 'I can help with general catalog, hardware-wallet safety, ASIC considerations, and calculator questions. I don’t have live inventory, order, payment, or delivery access. What would you like to know?';
  }

  launcher.addEventListener('click', () => panel.dataset.open === 'true' ? closeChat() : openChat());
  closeButton.addEventListener('click', closeChat);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;
    addMessage(question, 'user');
    input.value = '';
    window.setTimeout(() => addMessage(answer(question), 'bot'), 180);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && panel.dataset.open === 'true') closeChat();
  });

  addMessage('Hi! I’m a local FAQ assistant. I can help with general product and calculator questions, but I can’t access live orders or payments.', 'bot');
})();
