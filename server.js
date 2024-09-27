// server.js
require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const multer = require('multer');

const { sendTelegramMessage } = require('./src/components/integration/integrationServices');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));

// Настройка multer для обработки multipart/form-data
const upload = multer();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://secure.wayforpay.com"],
        connectSrc: ["'self'", "https://secure.wayforpay.com"],
        frameSrc: ["'self'", "https://secure.wayforpay.com"],
        imgSrc: ["'self'", "data:", "https:"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  })
);

// Утилиты
const generateSignature = (data, secret) => {
  const hmac = crypto.createHmac('md5', secret);
  hmac.update(data);
  return hmac.digest('hex');
};

// Хранилище для данных формы
const formDataStore = new Map();

// Роуты
app.post('/api/initialize-payment', async (req, res) => {
  try {
    const { price, name, email, phone, company, position } = req.body;
    console.log('[LOG] Отримано запит на ініціалізацію платежу:', { price, name, email, phone, company, position });

    if (!price || !name || !email || !phone) {
      console.error('[ERROR] Відсутні обов\'язкові параметри для ініціалізації платежу');
      return res.status(400).json({ error: 'Відсутні обов\'язкові параметри' });
    }

    const orderReference = `ORDER_${Date.now()}`;
    const orderDate = Math.floor(Date.now() / 1000);

    const productName = "Курс навчання";
    const productCount = 1;

    // Проверка на наличие данных
    if (name.length < 2) {
      throw new Error("Ім'я клієнта повинно мати мінімум 2 символи.");
    }

    const signString = `${process.env.WAYFORPAY_MERCHANT_ACCOUNT};${req.headers.origin};${orderReference};${orderDate};${price};UAH;${productName};${productCount};${price}`;
    const merchantSignature = generateSignature(signString, process.env.WAYFORPAY_SECRET_KEY);

    const paymentData = {
      merchantAccount: process.env.WAYFORPAY_MERCHANT_ACCOUNT,
      merchantAuthType: "SimpleSignature",
      merchantDomainName: req.headers.origin,
      merchantSignature: merchantSignature,
      orderReference: orderReference,
      orderDate: orderDate,
      amount: price,
      currency: "UAH",
      productName: [productName],
      productPrice: [price],
      productCount: [productCount],
      clientFirstName: name,
      clientLastName: position || "Н/Д", // Добавляем значение, если поле пустое
      clientEmail: email,
      clientPhone: phone,
      language: "UA",
      returnUrl: `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/payment-result`,
      serviceUrl: `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/wayforpay-callback`,
    };

    // Сохраняем данные формы
    formDataStore.set(orderReference, { name, email, phone, company, position, price, status: 'pending' });

    console.log('[LOG] Сформовані дані для оплати:', paymentData);
    res.json(paymentData);
  } catch (error) {
    console.error('[ERROR] Помилка при ініціалізації платежу:', error.message);
    res.status(500).json({ error: 'Внутрішня помилка сервера' });
  }
});

app.post('/api/wayforpay-callback', async (req, res) => {
  try {
    console.log('[LOG] Отримано callback від WayForPay:', req.body);
    const {
      merchantAccount,
      orderReference,
      amount,
      currency,
      authCode,
      cardPan,
      transactionStatus,
      reasonCode,
      merchantSignature,
    } = req.body;

    if (!merchantAccount || !orderReference || !amount || !currency || !transactionStatus || !merchantSignature) {
      console.error('[ERROR] Відсутні обов\'язкові параметри в callback від WayForPay');
      return res.status(400).json({ error: 'Відсутні обов\'язкові параметри' });
    }

    const signString = `${merchantAccount};${orderReference};${amount};${currency};${authCode};${cardPan};${transactionStatus};${reasonCode}`;
    const expectedSignature = generateSignature(signString, process.env.WAYFORPAY_SECRET_KEY);

    if (merchantSignature !== expectedSignature) {
      console.error('[ERROR] Невірний підпис у callback');
      return res.status(400).json({ error: 'Невірний підпис' });
    }

    console.log('[LOG] Transaction Status:', transactionStatus);

    // Обновляем статус платежа в хранилище
    const formData = formDataStore.get(orderReference);
    if (formData) {
      formData.status = transactionStatus === 'Approved' ? 'completed' : 'failed';
      formDataStore.set(orderReference, formData);
    } else {
      console.warn(`[WARN] Дані форми не знайдено для замовлення ${orderReference}`);
    }

    // Определяем статус и иконку для сообщения
    const statusIcon = transactionStatus === 'Approved' ? '✅' : '❌';
    const statusText = transactionStatus === 'Approved' ? 'Успішна оплата' : 'Неуспішна спроба оплати';

    // Отправляем уведомление в Telegram
    const fullMessage = `
<b>${statusText} ${statusIcon}</b>
Статус оплати: ${transactionStatus || 'Невідомо'}
Номер замовлення: ${orderReference || 'Невідомо'}
Ім'я: ${formData?.name || 'Не вказано'}
Email: ${formData?.email || 'Не вказано'}
Телефон: ${formData?.phone || 'Не вказано'}
Компанія: ${formData?.company || 'Не вказано'}
Посада: ${formData?.position || 'Не вказано'}
Сума: ${formData?.price || 'Не вказано'} ${currency || 'UAH'}
Час: ${new Date().toLocaleString()}
${reasonCode ? `Код причини: ${reasonCode}` : ''}
${cardPan ? `Карта: ${cardPan}` : ''}
${authCode ? `Код авторизації: ${authCode}` : ''}
    `;

    await sendTelegramMessage(fullMessage);

    // Формируем ответ для WayForPay
    const responseSignString = `${orderReference};accept;${Math.floor(Date.now() / 1000)}`;
    const responseSignature = generateSignature(responseSignString, process.env.WAYFORPAY_SECRET_KEY);

    const response = {
      orderReference: orderReference,
      status: 'accept',
      time: Math.floor(Date.now() / 1000),
      signature: responseSignature,
    };

    console.log('[LOG] Відправка відповіді на callback:', response);
    res.json(response);
  } catch (error) {
    console.error('[ERROR] Помилка при обробці callback від WayForPay:', error.message);
    res.status(500).json({ error: 'Внутрішня помилка сервера' });
  }
});

// Обработчик POST-запроса с результатом платежа
app.post('/api/payment-result', upload.none(), (req, res) => {
  console.log('[LOG] Отримано POST-запит з результатом платежу');
  console.log('[LOG] Тіло запиту:', req.body);
  
  const { orderReference, transactionStatus, reasonCode } = req.body;

  // Обновляем статус платежа в хранилище
  const formData = formDataStore.get(orderReference);
  if (formData) {
    formData.status = transactionStatus === 'Approved' ? 'completed' : 'failed';
    formDataStore.set(orderReference, formData);
  }

  // Определяем статус и иконку для сообщения
  const statusIcon = transactionStatus === 'Approved' ? '✅' : '❌';
  const statusText = transactionStatus === 'Approved' ? 'Успішна оплата' : 'Неуспішна спроба оплати';

  // Формируем сообщение для Telegram
  const telegramMessage = `
<b>${statusText} ${statusIcon}</b>
Статус оплати: ${transactionStatus || 'Невідомо'}
Номер замовлення: ${orderReference || 'Невідомо'}
Ім'я: ${formData?.name || 'Не вказано'}
Email: ${formData?.email || 'Не вказано'}
Телефон: ${formData?.phone || 'Не вказано'}
Компанія: ${formData?.company || 'Не вказано'}
Посада: ${formData?.position || 'Не вказано'}
Сума: ${formData?.price || 'Не вказано'} UAH
Час: ${new Date().toLocaleString()}
${reasonCode ? `Код причини: ${reasonCode}` : ''}
  `;

  sendTelegramMessage(telegramMessage);

  // Перенаправляем пользователя на фронтенд с результатом оплаты
  const redirectUrl = `${process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000'}/payment-result?orderReference=${orderReference || ''}&transactionStatus=${transactionStatus || ''}&reasonCode=${reasonCode || ''}`;
  
  console.log('[LOG] Перенаправлення на:', redirectUrl);
  res.redirect(303, redirectUrl);
});

// Обработчик GET-запроса с результатом платежа
app.get('/api/payment-result', (req, res) => {
  console.log('[LOG] Отримано GET-запит з результатом платежу');
  console.log('[LOG] Параметри запиту:', req.query);
  
  const { orderReference, transactionStatus, reasonCode } = req.query;

  // Перенаправляем пользователя на фронтенд с результатом оплаты
  const redirectUrl = `${process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000'}/payment-result?orderReference=${orderReference || ''}&transactionStatus=${transactionStatus || ''}&reasonCode=${reasonCode || ''}`;
  
  console.log('[LOG] Перенаправлення на:', redirectUrl);
  res.redirect(303, redirectUrl);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[LOG] Сервер запущено на порту ${PORT}`);
});

  module.exports = app;



/* // server.js
require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const nodemailer = require('nodemailer');
const multer = require('multer');

const { sendTelegramMessage } = require('./src/components/integration/integrationServices');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));

// Настройка multer для обработки multipart/form-data
const upload = multer();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://secure.wayforpay.com"],
        connectSrc: ["'self'", "https://secure.wayforpay.com"],
        frameSrc: ["'self'", "https://secure.wayforpay.com"],
        imgSrc: ["'self'", "data:", "https:"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  })
);

// Утилиты
const generateSignature = (data, secret) => {
  const hmac = crypto.createHmac('md5', secret);
  hmac.update(data);
  return hmac.digest('hex');
};

// Хранилище для данных формы
const formDataStore = new Map();

// Роуты
app.post('/api/initialize-payment', async (req, res) => {
  try {
    const { price, name, email, phone, company, position } = req.body;
    console.log('[LOG] Отримано запит на ініціалізацію платежу:', { price, name, email, phone, company, position });

    if (!price || !name || !email || !phone) {
      console.error('[ERROR] Відсутні обов\'язкові параметри для ініціалізації платежу');
      return res.status(400).json({ error: 'Відсутні обов\'язкові параметри' });
    }

    const orderReference = `ORDER_${Date.now()}`;
    const orderDate = Math.floor(Date.now() / 1000);

    const productName = "Курс навчання";
    const productCount = 1;

    // Проверка на наличие данных
    if (name.length < 2) {
      throw new Error("Ім'я клієнта повинно мати мінімум 2 символи.");
    }

    const signString = `${process.env.WAYFORPAY_MERCHANT_ACCOUNT};${req.headers.origin};${orderReference};${orderDate};${price};UAH;${productName};${productCount};${price}`;
    const merchantSignature = generateSignature(signString, process.env.WAYFORPAY_SECRET_KEY);

    const paymentData = {
      merchantAccount: process.env.WAYFORPAY_MERCHANT_ACCOUNT,
      merchantAuthType: "SimpleSignature",
      merchantDomainName: req.headers.origin,
      merchantSignature: merchantSignature,
      orderReference: orderReference,
      orderDate: orderDate,
      amount: price,
      currency: "UAH",
      productName: [productName],
      productPrice: [price],
      productCount: [productCount],
      clientFirstName: name,
      clientLastName: position || "Н/Д", // Добавляем значение, если поле пустое
      clientEmail: email,
      clientPhone: phone,
      language: "UA",
      returnUrl: `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/payment-result`,
      serviceUrl: `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/wayforpay-callback`,
    };

    // Сохраняем данные формы
    formDataStore.set(orderReference, { name, email, phone, company, position, price, status: 'pending' });

    console.log('[LOG] Сформовані дані для оплати:', paymentData);
    res.json(paymentData);
  } catch (error) {
    console.error('[ERROR] Помилка при ініціалізації платежу:', error.message);
    res.status(500).json({ error: 'Внутрішня помилка сервера' });
  }
});

app.post('/api/wayforpay-callback', async (req, res) => {
  try {
    console.log('[LOG] Отримано callback від WayForPay:', req.body);
    const {
      merchantAccount,
      orderReference,
      amount,
      currency,
      authCode,
      cardPan,
      transactionStatus,
      reasonCode,
      merchantSignature,
    } = req.body;

    if (!merchantAccount || !orderReference || !amount || !currency || !transactionStatus || !merchantSignature) {
      console.error('[ERROR] Відсутні обов\'язкові параметри в callback від WayForPay');
      return res.status(400).json({ error: 'Відсутні обов\'язкові параметри' });
    }

    const signString = `${merchantAccount};${orderReference};${amount};${currency};${authCode};${cardPan};${transactionStatus};${reasonCode}`;
    const expectedSignature = generateSignature(signString, process.env.WAYFORPAY_SECRET_KEY);

    if (merchantSignature !== expectedSignature) {
      console.error('[ERROR] Невірний підпис у callback');
      return res.status(400).json({ error: 'Невірний підпис' });
    }

    console.log('[LOG] Transaction Status:', transactionStatus);

    // Обновляем статус платежа в хранилище
    const formData = formDataStore.get(orderReference);
    if (formData) {
      formData.status = transactionStatus === 'Approved' ? 'completed' : 'failed';
      formDataStore.set(orderReference, formData);
    } else {
      console.warn(`[WARN] Дані форми не знайдено для замовлення ${orderReference}`);
    }

    // Отправляем уведомление в Telegram
    const fullMessage = `
<b>${transactionStatus === 'Approved' ? 'Успішна оплата' : 'Неуспішна спроба оплати'}</b>
Номер замовлення: ${orderReference}
Сума: ${amount} ${currency}
Статус: ${transactionStatus}
${reasonCode ? `Код причини: ${reasonCode}` : ''}
${cardPan ? `Карта: ${cardPan}` : ''}
${authCode ? `Код авторизації: ${authCode}` : ''}
    `;

    await sendTelegramMessage(fullMessage);

    // Формируем ответ для WayForPay
    const responseSignString = `${orderReference};accept;${Math.floor(Date.now() / 1000)}`;
    const responseSignature = generateSignature(responseSignString, process.env.WAYFORPAY_SECRET_KEY);

    const response = {
      orderReference: orderReference,
      status: 'accept',
      time: Math.floor(Date.now() / 1000),
      signature: responseSignature,
    };

    console.log('[LOG] Відправка відповіді на callback:', response);
    res.json(response);
  } catch (error) {
    console.error('[ERROR] Помилка при обробці callback від WayForPay:', error.message);
    res.status(500).json({ error: 'Внутрішня помилка сервера' });
  }
});

app.post('/api/payment-result', upload.none(), (req, res) => {
  console.log('[LOG] Отримано POST-запит з результатом платежу');
  console.log('[LOG] Тіло запиту:', req.body);
  
  const { orderReference, transactionStatus, reasonCode } = req.body;

  // Обновляем статус платежа в хранилище
  if (orderReference) {
    const formData = formDataStore.get(orderReference);
    if (formData) {
      formData.status = transactionStatus === 'Approved' ? 'completed' : 'failed';
      formDataStore.set(orderReference, formData);
    }
  }

  // Отправляем уведомление в Telegram
  const telegramMessage = `
<b>Результат оплати</b>
Статус: ${transactionStatus || 'Невідомо'}
Номер замовлення: ${orderReference || 'Невідомо'}
${reasonCode ? `Код причини: ${reasonCode}` : ''}
  `;

  sendTelegramMessage(telegramMessage);

  // Перенаправляем пользователя на фронтенд с результатом оплаты
  const redirectUrl = `${process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000'}/payment-result?orderReference=${orderReference || ''}&transactionStatus=${transactionStatus || ''}&reasonCode=${reasonCode || ''}`;
  
  console.log('[LOG] Перенаправлення на:', redirectUrl);
  res.redirect(303, redirectUrl);
});

app.get('/api/payment-result', (req, res) => {
  console.log('[LOG] Отримано GET-запит з результатом платежу');
  console.log('[LOG] Параметри запиту:', req.query);
  
  const { orderReference, transactionStatus, reasonCode } = req.query;

  // Перенаправляем пользователя на фронтенд с результатом оплаты
  const redirectUrl = `${process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000'}/payment-result?orderReference=${orderReference || ''}&transactionStatus=${transactionStatus || ''}&reasonCode=${reasonCode || ''}`;
  
  console.log('[LOG] Перенаправлення на:', redirectUrl);
  res.redirect(303, redirectUrl);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[LOG] Сервер запущено на порту ${PORT}`);
}); */