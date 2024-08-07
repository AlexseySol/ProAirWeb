import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Анимация пульсации для изображений (более плавная)
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

// Стили для контейнера секции
const SectionContainer = styled.section`
  padding: 100px 20px;
  background: inherit;
  color: var(--text-color);
  overflow: hidden;
  position: relative;

  // Эффект вращающегося фона (более плавный)
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(138, 43, 226, 0.05) 0%, rgba(138, 43, 226, 0) 70%);
    animation: rotate 30s linear infinite;
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
  color: var(--primary-color);
  text-shadow: 0 0 10px rgba(138, 43, 226, 0.3);
  font-family: 'Megrim', cursive;

  @media (max-width: 768px) {
    font-size: 2.2em;
    margin-bottom: 40px;
  }
`;

// Контейнер для карточек
const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

// Стили для карточек
const Card = styled(motion.div)`
  width: 300px;
  margin: 20px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(138, 43, 226, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(74, 144, 226, 0.1) 0%, rgba(74, 144, 226, 0) 70%);
    transform: rotate(45deg);
    z-index: -1;
  }

  @media (max-width: 1024px) {
    width: calc(50% - 40px);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 20px 0;
  }
`;

// Контент внутри карточек
const CardContent = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

// Стили для изображений
const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0.3) 100%);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  animation: ${pulse} 3s infinite ease-in-out;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

// Заголовок карточки
const CardTitle = styled.h3`
  font-size: 1.6em;
  margin-bottom: 15px;
  color: var(--primary-color);
  text-shadow: 0 0 5px rgba(138, 43, 226, 0.2);
  font-family: 'Megrim', cursive;

  @media (max-width: 768px) {
    font-size: 1.4em;
  }
`;

// Описание карточки
const CardDescription = styled.p`
  font-size: 1.1em;
  color: var(--text-color);
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
          <ImageWrapper>
            <Image src="/img/фриланс1.png" alt="Фрілансер" />
          </ImageWrapper>
          <CardContent>
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
          <ImageWrapper>
            <Image src="/img/предприниматель.png" alt="Підприємець" />
          </ImageWrapper>
          <CardContent>
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
          <ImageWrapper>
            <Image src="/img/другое.png" alt="Зацікавлені" />
          </ImageWrapper>
          <CardContent>
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