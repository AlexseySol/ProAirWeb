// src/wayforpay/paymentService.js

import axios from 'axios';

// Валидация данных клиента перед отправкой на оплату
const validatePaymentData = (data) => {
  if (!data.clientFirstName || data.clientFirstName.length < 2) {
    throw new Error("Недійсне ім'я клієнта. Мінімум 2 символи.");
  }
  if (!data.clientLastName || data.clientLastName.length < 2) {
    // Если фамилии нет, укажите "Н/Д" (Неизвестно)
    data.clientLastName = "Н/Д";
  }
};

// Генерация подписи с использованием HMAC_MD5
const generateSignature = (data, secret) => {
  const hmac = crypto.createHmac('md5', secret);
  hmac.update(data);
  return hmac.digest('hex');
};

// Основная функция инициализации платежа
export const initializePayment = async (price, formData) => {
  try {
    // Валидация данных перед отправкой
    validatePaymentData(formData);

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/initialize-payment`,
      {
        price,
        ...formData,
      }
    );

    const { data } = response;

    if (!data.orderReference || !data.merchantSignature) {
      throw new Error("Неправильно сформированы данные для оплаты");
    }

    // Формируем и отправляем форму на WayForPay
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://secure.wayforpay.com/pay';
    form.acceptCharset = 'utf-8';

    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = `${key}[]`;
          input.value = item;
          form.appendChild(input);
        });
      } else {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }
    }

    document.body.appendChild(form);
    form.submit();
  } catch (error) {
    console.error("Ошибка при инициализации платежа:", error);
    throw error;
  }
};
