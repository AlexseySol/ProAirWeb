/* import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const ResultMessage = styled.h1`
  color: ${(props) => (props.success === 'true' ? '#4CAF50' : '#f44336')};
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ResultText = styled.p`
  font-size: 1.2rem;
  text-align: center;
  max-width: 600px;
  margin-bottom: 2rem;
`;

const ReturnButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const PaymentResult = () => {
  const [paymentStatus, setPaymentStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const orderReference = searchParams.get('orderReference');
    const transactionStatus = searchParams.get('transactionStatus');
    const reasonCode = searchParams.get('reasonCode');

    console.log('Order Reference:', orderReference);
    console.log('Transaction Status:', transactionStatus);
    console.log('Reason Code:', reasonCode);

    if (transactionStatus === 'Approved') {
      setPaymentStatus('success');
    } else {
      setPaymentStatus('failed');
      setErrorMessage(getErrorMessage(reasonCode));
    }
  }, [location]);

  const getErrorMessage = (code) => {
    const errorMessages = {
      '1100': 'Платіж дозволений',
      '1101': 'Платіж відхилений банком',
      '1102': 'Відхилено за підозрою в шахрайстві',
      '1103': 'Викрадена карта',
      '1104': 'Карта в чорному списку',
      '1105': 'Неприпустима транзакція',
      '1106': 'Недостатньо коштів',
      '1107': 'Неправильний CVV',
      '1108': 'Неможливо провести операцію',
      '1109': 'Тимчасова відмова в проведенні операції',
    };
    return errorMessages[code] || 'Невідома помилка';
  };

  const handleReturn = () => {
    navigate('/');
  };

  return (
    <ResultContainer>
      <ResultMessage success={paymentStatus === 'success' ? 'true' : 'false'}>
        {paymentStatus === 'success' ? 'Оплату успішно завершено!' : 'Оплата не вдалася'}
      </ResultMessage>
      <ResultText>
        {paymentStatus === 'success'
          ? 'Дякуємо за вашу покупку! Ми надіслали вам електронний лист з подальшими інструкціями.'
          : `На жаль, виникла проблема з оплатою: ${errorMessage}. Будь ласка, спробуйте ще раз або зв'яжіться з нашою службою підтримки.`}
      </ResultText>
      <ReturnButton onClick={handleReturn}>Повернутися на головну</ReturnButton>
    </ResultContainer>
  );
};

export default PaymentResult;
 */



// src/components/PaymentResult.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const ResultMessage = styled.h1`
  color: ${(props) => (props.success === 'true' ? '#4CAF50' : '#f44336')};
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ResultText = styled.p`
  font-size: 1.2rem;
  text-align: center;
  max-width: 600px;
  margin-bottom: 2rem;
`;

const ReturnButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const PaymentResult = () => {
  const [paymentStatus, setPaymentStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const orderReference = searchParams.get('orderReference');
    const transactionStatus = searchParams.get('transactionStatus');
    const reasonCode = searchParams.get('reasonCode');

    console.log('Order Reference:', orderReference);
    console.log('Transaction Status:', transactionStatus);
    console.log('Reason Code:', reasonCode);

    if (transactionStatus === 'Approved') {
      setPaymentStatus('success');
    } else {
      setPaymentStatus('failed');
      setErrorMessage(getErrorMessage(reasonCode));
    }
  }, [location]);

  const getErrorMessage = (code) => {
    const errorMessages = {
      '1100': 'Платіж дозволений',
      '1101': 'Платіж відхилений банком',
      '1102': 'Відхилено за підозрою в шахрайстві',
      '1103': 'Викрадена карта',
      '1104': 'Карта в чорному списку',
      '1105': 'Неприпустима транзакція',
      '1106': 'Недостатньо коштів',
      '1107': 'Неправильний CVV',
      '1108': 'Неможливо провести операцію',
      '1109': 'Тимчасова відмова в проведенні операції',
    };
    return errorMessages[code] || 'Невідома помилка';
  };

  const handleReturn = () => {
    navigate('/');
  };

  return (
    <ResultContainer>
      <ResultMessage success={paymentStatus === 'success' ? 'true' : 'false'}>
        {paymentStatus === 'success' ? 'Оплату успішно завершено!' : 'Оплата не вдалася'}
      </ResultMessage>
      <ResultText>
        {paymentStatus === 'success'
          ? 'Дякуємо за вашу покупку! Ми надіслали вам електронний лист з подальшими інструкціями.'
          : `На жаль, виникла проблема з оплатою: ${errorMessage}. Будь ласка, спробуйте ще раз або зв'яжіться з нашою службою підтримки.`}
      </ResultText>
      <ReturnButton onClick={handleReturn}>Повернутися на головну</ReturnButton>
    </ResultContainer>
  );
};

export default PaymentResult;
