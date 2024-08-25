import axios from 'axios';

const FONDY_API_URL = process.env.REACT_APP_FONDY_API_URL;

export const initializePayment = async (orderData) => {
  try {
    const response = await axios.post(FONDY_API_URL, {
      request: {
        merchant_id: process.env.REACT_APP_FONDY_MERCHANT_ID,
        order_id: orderData.order_id,
        order_desc: 'Order description',
        currency: 'USD',
        amount: orderData.amount * 100, // Fondy принимает сумму в центах
        server_callback_url: process.env.REACT_APP_FONDY_CALLBACK_URL,
        lang: 'en'
      }
    });
    return response.data.response;
  } catch (error) {
    console.error('Error initializing payment:', error);
    throw error;
  }
};

export const sendToGoogleSheets = async (data) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_GOOGLE_SHEETS_API_URL,
      data,
      {
        headers: {
          Authorization: process.env.REACT_APP_GOOGLE_SHEETS_API_TOKEN,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error sending data to Google Sheets:', error);
    throw error;
  }
};
