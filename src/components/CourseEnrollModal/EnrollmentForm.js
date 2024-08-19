import React, { useState } from 'react';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Enrolling with data:', formData, 'Price:', price);
      onClose();
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
      <SubmitButton type="submit">Отримати доступ за ${price}</SubmitButton>
    </Form>
  );
};

export default EnrollmentForm;