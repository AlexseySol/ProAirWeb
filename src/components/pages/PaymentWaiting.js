import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentWaiting = () => {
  const [status, setStatus] = useState('waiting');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const orderReference = searchParams.get('orderReference');

    const checkPaymentStatus = async () => {
      try {
        const response = await axios.get(`/api/check-payment-status?orderReference=${orderReference}`);
        if (response.data.status === 'completed') {
          navigate('/payment-result?status=success');
        } else if (response.data.status === 'failed') {
          navigate('/payment-result?status=failed');
        } else {
          setTimeout(checkPaymentStatus, 5000); // Check again in 5 seconds
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        setStatus('error');
      }
    };

    if (orderReference) {
      checkPaymentStatus();
    } else {
      setStatus('error');
    }
  }, [navigate, location]);

  return (
    <div>
      <h1>Перевірка статусу оплати...</h1>
      {status === 'waiting' && <p>Будь ласка, зачекайте. Ми перевіряємо статус вашого платежу.</p>}
      {status === 'error' && <p>Виникла помилка при перевірці статусу платежу. Будь ласка, зв'яжіться з підтримкою.</p>}
    </div>
  );
};

export default PaymentWaiting;