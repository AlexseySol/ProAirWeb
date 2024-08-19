// файл: src/payment/PayPalButton.js

import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// Компонент кнопки PayPal
const PayPalButton = ({ amount, currency, onSuccess, onError }) => {
  
  const initialOptions = {
    "client-id": "ВАШ_PAYPAL_CLIENT_ID", // Замените на реальный клиентский идентификатор
    currency: currency || "USD", // Валюта по умолчанию USD
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount,
              },
            }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            onSuccess(details);
          });
        }}
        onError={(err) => {
          console.error("PayPal Checkout Error:", err);
          onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
