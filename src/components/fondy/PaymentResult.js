import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { sendToGoogleSheets } from './api';

const PaymentResult = () => {
  const [status, setStatus] = useState('Перевірка статусу оплати...');
  const location = useLocation();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const params = new URLSearchParams(location.search);
      const data = Object.fromEntries(params.entries());

      if (data.order_status === 'approved') {
        setStatus('Оплата успішно проведена!');
        try {
          await sendToGoogleSheets(data);
          console.log('Data sent to Google Sheets successfully');
        } catch (error) {
          console.error('Error sending data to Google Sheets:', error);
          setStatus("Оплата пройшла успішно, але виникла помилка при збереженні даних. Ми зв'яжемося з вами незабаром.");
        }
      } else {
        setStatus("Помилка оплати. Будь ласка, спробуйте ще раз або зв'яжіться з нами для допомоги.");
      }
    };

    checkPaymentStatus();
  }, [location]);

  return (
    <div>
      <h2>Результат оплати</h2>
      <p>{status}</p>
    </div>
  );
};

export default PaymentResult;

