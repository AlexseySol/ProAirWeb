import React, { useState } from 'react';
import { Form, Input, SubmitButton, ErrorMessage } from './styles';
import { initializePayment } from '../fondy/api';
import { generateOrderId } from '../fondy/utils';

const EnrollmentForm = ({ price, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Ім'я обов'язкове";
    if (!formData.email.trim()) {
      newErrors.email = "Email обов'язковий";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Невірний формат email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Телефон обов'язковий";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const paymentData = await initializePayment({
          order_id: generateOrderId(),
          ...formData,
          amount: price
        });

        // Редирект на Fondy для завершения оплаты
        window.location.href = paymentData.checkout_url;
      } catch (error) {
        console.error('Error during payment initialization:', error);
        alert(`Помилка при ініціалізації платежу: ${error.message}. Спробуйте ще раз.`);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="name"
        placeholder="Ваше ім'я"
        value={formData.name}
        onChange={handleChange}
      />
      {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
      <Input
        type="email"
        name="email"
        placeholder="Ваш email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      <Input
        type="tel"
        name="phone"
        placeholder="Ваш телефон"
        value={formData.phone}
        onChange={handleChange}
      />
      {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
      <Input
        type="text"
        name="company"
        placeholder="Назва компанії"
        value={formData.company}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="position"
        placeholder="Ваша посада"
        value={formData.position}
        onChange={handleChange}
      />
      <SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Відправка...' : `Отримати доступ за $${price}`}
      </SubmitButton>
    </Form>
  );
};

export default EnrollmentForm;



/* import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, SubmitButton, ErrorMessage } from './styles';

const EnrollmentForm = ({ price, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Ім'я обов'язкове";
    if (!formData.email.trim()) {
      newErrors.email = "Email обов'язковий";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Невірний формат email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Телефон обов'язковий";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendToSheety = async (data) => {
    const SHEETY_URL = 'https://api.sheety.co/91a5ba3532c9f4acb83c0ff99d7cd1f5/dataList/лист1';
    const TOKEN = 'Bearer 1107KhmGPwQHNddUEHKhRkSaKmJdKIZ47RhkP4M9Kkfc';

    try {
      console.log('Отправка данных:', data);
      const response = await axios({
        method: 'POST',
        url: SHEETY_URL,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': TOKEN
        },
        data: { лист1: data }
      });
      console.log('Ответ от сервера:', response);
      return response.data;
    } catch (error) {
      console.error('Ошибка при отправке:', error.response || error.message);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const dataToSend = {
          name: formData.name,         // Поле 'Name'
          email: formData.email,       // Поле 'Email'
          company: formData.company,   // Поле 'Company'
          position: formData.position, // Поле 'Position'
          price: price.toString()      // Поле 'Price'
        };
        console.log('Попытка отправить данные:', dataToSend);
        
        const result = await sendToSheety(dataToSend);
        console.log('Данные успешно отправлены:', result);
        onClose();
      } catch (error) {
        console.error('Ошибка отправки:', error);
        alert(`Помилка при відправці даних: ${error.response?.data?.error || error.message}. Спробуйте ще раз.`);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="name"
        placeholder="Ваше ім'я"
        value={formData.name}
        onChange={handleChange}
      />
      {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
      <Input
        type="email"
        name="email"
        placeholder="Ваш email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      <Input
        type="tel"
        name="phone"
        placeholder="Ваш телефон"
        value={formData.phone}
        onChange={handleChange}
      />
      {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
      <Input
        type="text"
        name="company"
        placeholder="Назва компанії"
        value={formData.company}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="position"
        placeholder="Ваша посада"
        value={formData.position}
        onChange={handleChange}
      />
      <SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Відправка...' : `Отримати доступ за $${price}`}
      </SubmitButton>
    </Form>
  );
};

export default EnrollmentForm;
 */