const axios = require('axios');

// Telegram Service
const sendTelegramMessage = async (message) => {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  try {
    console.log('[LOG] Attempting to send Telegram message');
    console.log('[LOG] Telegram Bot Token:', process.env.TELEGRAM_BOT_TOKEN);
    console.log('[LOG] Telegram Chat ID:', process.env.TELEGRAM_CHAT_ID);
    console.log('[LOG] Message:', message);

    const response = await axios.post(url, {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    });
    
    console.log('[LOG] Telegram API Response:', response.data);
    
    if (response.data.ok) {
      console.log('[LOG] Повідомлення в Telegram відправлено успішно');
    } else {
      throw new Error(response.data.description);
    }
  } catch (error) {
    console.error('[ERROR] Помилка при відправці повідомлення в Telegram:', error.message);
    if (error.response) {
      console.error('[ERROR] Telegram API Error Response:', error.response.data);
    }
  }
};

const sendPaymentNotification = async (paymentData, status) => {
  const message = `
<b>${status === 'Approved' ? 'Нове оплачене замовлення' : 'Неуспішна спроба оплати'}:</b>
Ім'я: ${paymentData.clientName}
Email: ${paymentData.clientEmail}
Телефон: ${paymentData.clientPhone}
Сума: ${paymentData.amount} ${paymentData.currency}
Статус: ${status}
${paymentData.reasonCode ? `Код причини: ${paymentData.reasonCode}` : ''}
  `;

  await sendTelegramMessage(message);
};

// Dummy function for Notion (temporary)
const addNotionEntry = async (formData) => {
  console.log('[LOG] Notion integration is temporarily disabled');
  return null;
};

module.exports = {
  sendPaymentNotification,
  addNotionEntry,
  sendTelegramMessage  // Экспортируем эту функцию для тестирования
};