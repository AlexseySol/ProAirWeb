// src/components/PaymentButton.js
import React from 'react';
import { initializePayment } from '../wayforpay/paymentService';

const PaymentButton = ({ price, email, onSuccess }) => {
  const handlePayment = async () => {
    try {
      // Вызов оплаты
      await initializePayment(price, email);
      alert('Оплата прошла успешно!');
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      alert('Ошибка при оплате. Попробуйте снова.');
      console.error('Payment error:', error);
    }
  };

  return <button onClick={handlePayment}>Оплатить сейчас {price} грн</button>;
};

export default PaymentButton;
