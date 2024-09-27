import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 350px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const Input = styled.input`
  padding: 12px;
  border: 2px solid rgba(184, 77, 255, 0.3);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #b84dff;
    box-shadow: 0 0 10px rgba(184, 77, 255, 0.3);
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 10px;
  }
`;

export const SubmitButton = styled.button`
  padding: 12px;
  background-color: #b84dff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 5px 15px rgba(184, 77, 255, 0.4);
  width: 100%;

  &:hover {
    background-color: #a030ff;
    transform: translateY(-2px);
    box-shadow: 0 7px 20px rgba(184, 77, 255, 0.6);
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 10px;
  }
`;

export const ErrorMessage = styled.div`
  color: #ff4d4d;
  font-size: 0.8rem;
  margin-top: -10px;

  @media (max-width: 480px) {
    font-size: 0.7rem;
    margin-top: -8px;
  }
`;

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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Невірний формат email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон обов'язковий";
    } else if (!/^\+?3?8?(0\d{9})$/.test(formData.phone)) {
      newErrors.phone = "Невірний формат телефону. Використовуйте формат +380XXXXXXXXX";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Здесь цена отправляется на сервер вместе с другими данными формы
        const response = await axios.post('/api/initialize-payment', {
          ...formData,
          price,
        });

        const { data } = response;
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://secure.wayforpay.com/pay';

        for (const key in data) {
          if (Array.isArray(data[key])) {
            data[key].forEach((value, index) => {
              const input = document.createElement('input');
              input.type = 'hidden';
              input.name = `${key}[]`;
              input.value = value;
              form.appendChild(input);
            });
          } else {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = data[key];
            form.appendChild(input);
          }
        }

        document.body.appendChild(form);
        form.submit();
      } catch (error) {
        console.error('Помилка при обробці оплати:', error);
        alert(`Помилка при обробці оплати: ${error.message}. Спробуйте ще раз.`);
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
        {isSubmitting ? 'Обробка...' : `ОТРИМАТИ ДОСТУП ЗА $${price}`}
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