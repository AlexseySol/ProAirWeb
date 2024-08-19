// файл: src/payment/CheckoutPage.js

import React, { useState } from 'react';
import PayPalButton from './PayPalButton';

// Страница оформления заказа
const CheckoutPage = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePaymentSuccess = (details) => {
    console.log("Payment successful:", details);
    setPaymentStatus('success');
    // Логика обработки успешного платежа
  };

  const handlePaymentError = (error) => {
    console.log("Payment error:", error);
    setPaymentStatus('error');
  };

  return (
    <div>
      <h1>Оформление заказа</h1>
      <PayPalButton
        amount="49.99"
        currency="USD"
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
      {paymentStatus === 'success' && <p>Платеж успешно завершен!</p>}
      {paymentStatus === 'error' && <p>Произошла ошибка при обработке платежа. Попробуйте еще раз.</p>}
    </div>
  );
};

export default CheckoutPage;
