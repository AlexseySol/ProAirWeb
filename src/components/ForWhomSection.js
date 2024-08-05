// ForWhomSection.js
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaBusinessTime, FaUsers } from 'react-icons/fa';

// Анимация пульсации для иконок
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Стили для контейнера секции
const SectionContainer = styled.section`
  padding: 100px 20px;
  background: linear-gradient(135deg, #000000, #1a1a1a, #2c1f4a);
  color: #ffffff;
  overflow: hidden;
  position: relative;

  // Эффект вращающегося фона
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(138, 43, 226, 0.1) 0%, rgba(138, 43, 226, 0) 70%);
    animation: rotate 20s linear infinite;
  }

  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    padding: 60px 15px;
  }
`;

// Стили для заголовка
const Title = styled(motion.h2)`
  text-align: center;
  margin-bottom: 60px;
  font-size: 3em;
  color: #8A2BE2;
  text-shadow: 0 0 10px rgba(138, 43, 226, 0.5);

  @media (max-width: 768px) {
    font-size: 2.2em;
    margin-bottom: 40px;
  }
`;

// Контейнер для карточек
const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

// Стили для карточек
const Card = styled(motion.div)`
  width: 300px;
  height: 400px;
  margin: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(138, 43, 226, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(74, 144, 226, 0.3) 0%, rgba(74, 144, 226, 0) 70%);
    transform: rotate(45deg);
    z-index: -1;
  }

  @media (max-width: 1024px) {
    width: calc(50% - 40px);
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto; /* Высота авто для лучшего отображения на мобильных */
    margin: 20px 0;
  }
`;

// Контент внутри карточек
const CardContent = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

// Стили для иконок
const IconWrapper = styled.div`
  font-size: 4em;
  color: #4A90E2;
  margin-bottom: 20px;
  animation: ${pulse} 2s infinite ease-in-out;

  @media (max-width: 768px) {
    font-size: 3em;
  }
`;

// Заголовок карточки
const CardTitle = styled.h3`
  font-size: 1.6em;
  margin-bottom: 15px;
  color: #8A2BE2;
  text-shadow: 0 0 5px rgba(138, 43, 226, 0.3);

  @media (max-width: 768px) {
    font-size: 1.4em;
  }
`;

// Описание карточки
const CardDescription = styled.p`
  font-size: 1.1em;
  color: #CCCCCC;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

// Анимационные варианты для карточек
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8,
      ease: "easeOut"
    } 
  },
};

const ForWhomSection = () => {
  return (
    <SectionContainer>
      <Title
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Курс спеціально створено для:
      </Title>
      <CardContainer>
        <Card
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <CardContent>
            <IconWrapper>
              <FaLaptopCode />
            </IconWrapper>
            <div>
              <CardTitle>Фрілансерів</CardTitle>
              <CardDescription>
                Які хочуть підвищити вартість своїх послуг та кількість замовлень
              </CardDescription>
            </div>
          </CardContent>
        </Card>
        <Card
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <CardContent>
            <IconWrapper>
              <FaBusinessTime />
            </IconWrapper>
            <div>
              <CardTitle>Підприємців</CardTitle>
              <CardDescription>
                Які хочуть "приручити" АІ співробітників, які працюють ефективно та безкоштовно
              </CardDescription>
            </div>
          </CardContent>
        </Card>
        <Card
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <CardContent>
            <IconWrapper>
              <FaUsers />
            </IconWrapper>
            <div>
              <CardTitle>Всіх зацікавлених</CardTitle>
              <CardDescription>
                Хто розуміє, що ті, хто опанує АІ зараз - буде мати роботу чи бізнес завтра
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </CardContainer>
    </SectionContainer>
  );
};

export default ForWhomSection;
