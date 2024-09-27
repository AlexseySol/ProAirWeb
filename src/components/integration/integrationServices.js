const axios = require('axios');

const sendTelegramMessage = async (message) => {
  console.log('[LOG] Початок відправки повідомлення в Telegram');
  
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('[ERROR] Відсутній токен бота або ID чату для Telegram');
    throw new Error('Неправильна конфігурація Telegram');
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  try {
    const response = await axios.post(url, {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    });
    
    console.log('[LOG] Відповідь від API Telegram:', response.data);
    return response.data;
  } catch (error) {
    console.error('[ERROR] Помилка при відправці повідомлення в Telegram:', error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = {
  sendTelegramMessage
};