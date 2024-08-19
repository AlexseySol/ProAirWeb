import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Countdown from 'react-countdown';

const shine = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: linear-gradient(145deg, rgba(25, 25, 35, 0.95), rgba(40, 40, 60, 0.95));
  padding: 40px;
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  color: #fff;
  box-shadow: 0 0 30px rgba(0, 119, 204, 0.3);
  border: 2px solid rgba(0, 119, 204, 0.5);
  position: relative;
  overflow: hidden;
`;

const ModalHeader = styled.h2`
  margin-bottom: 30px;
  color: var(--primary-color);
  font-size: 2.2rem;
  text-align: center;
  text-shadow: 0 0 10px rgba(0, 119, 204, 0.5);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  font-size: 24px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-color);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 15px;
  font-size: 1.2rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 119, 204, 0.3);

  &:hover {
    background-color: var(--secondary-color);
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 119, 204, 0.4);
  }
`;

const TimerContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
  padding: 15px;
  background: linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3);
  background-size: 400% 400%;
  animation: ${shine} 15s ease infinite;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const TimerLabel = styled.div`
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: bold;
`;

const TimerValue = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const TimeUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeNumber = styled.span`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px 10px;
  border-radius: 5px;
`;

const TimeLabel = styled.span`
  font-size: 0.8rem;
  margin-top: 5px;
`;

const Price = styled(motion.div)`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5rem;
  font-weight: bold;
  color: #feca57;
  text-shadow: 0 0 10px rgba(254, 202, 87, 0.5);
`;

const SpecialOffer = styled(motion.div)`
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  color: white;
  padding: 10px 20px;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
`;

const CourseEnrollModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [endTime, setEndTime] = useState(Date.now() + 40 * 60 * 1000);
  const [price, setPrice] = useState(29);

  useEffect(() => {
    const visitTime = localStorage.getItem('visitTime');
    const currentTime = Date.now();
    
    if (!visitTime) {
      localStorage.setItem('visitTime', currentTime);
      setEndTime(currentTime + 40 * 60 * 1000);
      setPrice(29);
    } else {
      const elapsedTime = currentTime - parseInt(visitTime);
      if (elapsedTime < 40 * 60 * 1000) {
        setEndTime(parseInt(visitTime) + 40 * 60 * 1000);
        setPrice(29);
      } else {
        setPrice(109);
      }
    }
  }, []);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Тут можна додати логіку для обробки платежу
    console.log('Оформлення покупки для:', name, email, phone, 'Ціна:', price);
    onClose();
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      setPrice(109);
      return null;
    }
    return (
      <TimerValue>
        <TimeUnit>
          <TimeNumber>{hours.toString().padStart(2, '0')}</TimeNumber>
          <TimeLabel>годин</TimeLabel>
        </TimeUnit>
        <TimeUnit>
          <TimeNumber>{minutes.toString().padStart(2, '0')}</TimeNumber>
          <TimeLabel>хвилин</TimeLabel>
        </TimeUnit>
        <TimeUnit>
          <TimeNumber>{seconds.toString().padStart(2, '0')}</TimeNumber>
          <TimeLabel>секунд</TimeLabel>
        </TimeUnit>
      </TimerValue>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
          >
            <CloseButton onClick={onClose}>&times;</CloseButton>
            <ModalHeader>Приєднатися до курсу</ModalHeader>
            {price === 29 && (
              <>
                <SpecialOffer
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 120 }}
                >
                  Спеціальна пропозиція!
                </SpecialOffer>
                <TimerContainer>
                  <TimerLabel>До кінця акції залишилось:</TimerLabel>
                  <Countdown date={endTime} renderer={renderer} />
                </TimerContainer>
              </>
            )}
            <Price
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              ${price}
            </Price>
            <form onSubmit={handleSubmit}>
              <InputField
                type="text"
                placeholder="Ваше ім'я"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <InputField
                type="email"
                placeholder="Ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <InputField
                type="tel"
                placeholder="Ваш телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <SubmitButton
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Придбати зараз
              </SubmitButton>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default CourseEnrollModal;