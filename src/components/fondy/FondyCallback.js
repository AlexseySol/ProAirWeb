import { generateSignature } from './utils';
import { sendToGoogleSheets } from './api';

export const handleFondyCallback = async (req, res) => {
  const data = req.body;
  const signature = data.signature;
  delete data.signature;

  const calculatedSignature = await generateSignature(data, process.env.REACT_APP_FONDY_SECRET_KEY);

  if (calculatedSignature === signature && data.order_status === 'approved') {
    // Платеж успешен, отправляем данные в Google Sheets
    try {
      await sendToGoogleSheets({
        name: data.sender_email,
        email: data.sender_email,
        phone: data.sender_phone,
        price: data.amount / 100, // конвертируем обратно в доллары
        orderId: data.order_id,
        paymentDate: new Date().toISOString()
      });
      res.status(200).send('OK');
    } catch (error) {
      console.error('Error sending data to Google Sheets:', error);
      res.status(500).send('Error processing payment');
    }
  } else {
    res.status(400).send('Invalid signature or payment not approved');
  }
};
