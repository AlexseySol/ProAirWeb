// файл: src/payment/paypalService.js

// Пример службы для взаимодействия с API PayPal
export const createOrder = async (orderData) => {
    try {
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      if (!response.ok) {
        throw new Error('Не удалось создать заказ');
      }
  
      const data = await response.json();
      return data.orderID;
    } catch (error) {
      console.error('Ошибка при создании заказа:', error);
      throw error;
    }
  };
  
  export const captureOrder = async (orderID) => {
    try {
      const response = await fetch(`/api/paypal/capture-order/${orderID}`, {
        method: 'POST',
      });
  
      if (!response.ok) {
        throw new Error('Не удалось завершить заказ');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка при завершении заказа:', error);
      throw error;
    }
  };
  