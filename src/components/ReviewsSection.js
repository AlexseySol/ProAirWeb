// ReviewsSection.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';

// Стили для контейнера секции
const SectionContainer = styled.section`
  padding: 80px 20px;
  background: inherit;
  background-size: inherit;
  animation: inherit;
  color: inherit;

  @media (max-width: 768px) {
    padding: 60px 15px;
  }
`;

// Стили для заголовка
const Title = styled(motion.h2)`
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5em;
  color: var(--primary-color);

  @media (max-width: 768px) {
    font-size: 2em;
    margin-bottom: 30px;
  }
`;

// Стили для контейнера отзывов
const ReviewsContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

// Стили для видео-карусели
const VideoCarousel = styled.div`
  position: relative;
  margin-bottom: 40px;
`;

// Стили для обертки видео
const VideoWrapper = styled(motion.div)`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
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

// Стили для кнопок управления каруселью
const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(138, 43, 226, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: rgba(138, 43, 226, 1);
  }

  &:focus {
    outline: none;
  }
`;

const PrevButton = styled(CarouselButton)`
  left: 10px;
`;

const NextButton = styled(CarouselButton)`
  right: 10px;
`;

// Стили для контейнера текстовых отзывов
const TextReviewsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

// Стили для карточки текстового отзыва
const TextReviewCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(138, 43, 226, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(138, 43, 226, 0.2);
  }
`;

// Стили для иконки цитаты
const QuoteIcon = styled(FaQuoteLeft)`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 2em;
  color: rgba(138, 43, 226, 0.2);
`;

// Стили для текста отзыва
const ReviewText = styled.p`
  font-size: 1.1em;
  color: var(--text-color); /* Изменено на основной цвет текста для лучшего контраста */
  margin-bottom: 15px;
  position: relative;
  z-index: 1;
  line-height: 1.5; /* Улучшенная читаемость */
`;

// Стили для имени автора отзыва
const ReviewerName = styled.h4`
  font-size: 1.2em;
  font-weight: 600; /* Более четкое форматирование имени */
  color: var(--secondary-color);
  text-align: right;
  margin-top: auto; /* Удерживает имя внизу карточки */
`;

// Массив отзывов
const reviews = [
  {
    videoUrl: "https://www.youtube.com/embed/sampleVideoID1",
    text: "Цей курс дійсно змінив моє бачення роботи з AI. Я навчився створювати неймовірні речі, про які раніше тільки мріяв. Рекомендую всім, хто хоче бути на передовій технологій!",
    name: "Іван Іванов"
  },
  {
    videoUrl: "https://www.youtube.com/embed/sampleVideoID2",
    text: "Відмінний курс! Дуже багато практичної інформації. Особливо сподобалась частина про створення візуального контенту - тепер я можу легко генерувати унікальні зображення для своїх проектів.",
    name: "Олена Петрова"
  },
  {
    videoUrl: "https://www.youtube.com/embed/sampleVideoID3",
    text: "Завдяки цьому курсу я зміг автоматизувати багато процесів у своєму бізнесі. Економія часу просто вражаюча! Дякую за такий цінний досвід.",
    name: "Михайло Сидоренко"
  }
];

// Компонент ReviewsSection
const ReviewsSection = () => {
  const [currentVideo, setCurrentVideo] = useState(0);

  // Функция для переключения на следующее видео
  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % reviews.length);
  };

  // Функция для переключения на предыдущее видео
  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <SectionContainer>
      <Title
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Відгуки наших студентів
      </Title>
      <ReviewsContainer>
        <VideoCarousel>
          <AnimatePresence mode="wait">
            <VideoWrapper
              key={currentVideo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Video
                src={reviews[currentVideo].videoUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`Review Video ${currentVideo + 1}`}
              />
            </VideoWrapper>
          </AnimatePresence>
          <PrevButton onClick={prevVideo}><FaChevronLeft /></PrevButton>
          <NextButton onClick={nextVideo}><FaChevronRight /></NextButton>
        </VideoCarousel>
        <TextReviewsContainer>
          {reviews.map((review, index) => (
            <TextReviewCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <QuoteIcon />
              <ReviewText>{review.text}</ReviewText>
              <ReviewerName>{review.name}</ReviewerName>
            </TextReviewCard>
          ))}
        </TextReviewsContainer>
      </ReviewsContainer>
    </SectionContainer>
  );
};

export default ReviewsSection;
