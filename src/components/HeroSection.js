// HeroSection.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Стили для контейнера секции
const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 20px;
  background: inherit; /* Восстановлен исходный фон */
  background-size: inherit;
  animation: inherit;
  color: inherit;
  position: relative;
  overflow: hidden;
`;

// Стили для контейнера логотипа
const LogoContainer = styled(motion.div)`
  position: absolute;
  top: 20px; /* Уменьшено значение для более аккуратного размещения */
  left: 20px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

// Стили для логотипа
const Logo = styled(motion.img)`
  width: 60px; /* Установлено конкретное значение ширины для логотипа */
  height: 60px; /* Установлено конкретное значение высоты для логотипа */
  border-radius: 50%; /* Сделаем логотип круговым */
`;

// Стили для обертки контента
const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 1;

  @media (max-width: 968px) {
    flex-direction: column;
    justify-content: center;
  }
`;

// Стили для контейнера текста
const TextContainer = styled.div`
  flex: 1;
  padding-right: 40px;

  @media (max-width: 968px) {
    padding-right: 0;
    text-align: center;
    margin-bottom: 40px;
  }
`;

// Стили для заголовка
const Title = styled(motion.h1)`
  font-size: 3.5em;
  margin-bottom: 20px;
  font-weight: 700;
  color: var(--primary-color);

  @media (max-width: 768px) {
    font-size: 2.5em;
  }
`;

// Стили для подзаголовка
const Subtitle = styled(motion.p)`
  font-size: 1.5em;
  margin-bottom: 30px;
  color: var(--light-text-color);

  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

// Стили для бонусного текста
const Bonus = styled(motion.p)`
  font-size: 1.2em;
  margin-bottom: 30px;
  color: var(--secondary-color);
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.1em;
  }
`;

// Стили для кнопки призыва к действию (CTA)
const CTAButton = styled(motion.button)`
  padding: 15px 30px;
  font-size: 1.2em;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 4px 8px rgba(138, 43, 226, 0.3);

  &:hover {
    background-color: var(--secondary-color);
    transform: translateY(-5px);
  }
`;

// Стили для контейнера видео
const VideoContainer = styled.div`
  flex: 1;
  max-width: 600px;
  aspect-ratio: 16 / 9;
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(138, 43, 226, 0.2);

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

// Стили для видео
const Video = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const HeroSection = () => {
  return (
    <SectionContainer>
      <LogoContainer
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Logo
          src="/img/proair-logo.png"
          alt="Logo"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, loop: Infinity, ease: "linear" }}
        />
      </LogoContainer>
      <ContentWrapper>
        <TextContainer>
          <Title
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Стань експертом в AI та заробляй на цьому
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Опануйте 5 найпотужніших AI-інструментів і дізнайтеся, як заробляти від
            $1000/міс на 7-денному курсі від експерта з Кремнієвої долини.
          </Subtitle>
          <Bonus
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Придбайте курс сьогодні та отримайте бонус: "Топ 20 AI-інструментів для
            заробітку"
          </Bonus>
          <CTAButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Приєднатися до курсу
          </CTAButton>
        </TextContainer>
        <VideoContainer>
          <Video
            src="https://www.youtube.com/embed/your-video-id"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Вступне відео"
          />
        </VideoContainer>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default HeroSection;
