import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';

// Стили для контейнера секции
const SectionContainer = styled.section`
  padding: 80px 20px;
  background: inherit;
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
  max-width: 1200px;
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
  z-index: 2;

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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 60px;
`;

// Анимация покачивания
const wobble = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(1deg); }
  75% { transform: rotate(-1deg); }
  100% { transform: rotate(0deg); }
`;

// Стили для флип-карточки
const FlipCard = styled(motion.div)`
  perspective: 1000px;
  height: 400px;
  cursor: pointer;
  animation: ${wobble} 3s ease-in-out infinite;
`;

const FlipCardInner = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
`;

const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(138, 43, 226, 0.1);
`;

const CardFront = styled(CardSide)`
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(138, 43, 226, 0.1));
`;

const CardBack = styled(CardSide)`
  background: linear-gradient(145deg, rgba(138, 43, 226, 0.1), rgba(255, 255, 255, 0.1));
  transform: rotateY(180deg);
  padding: 20px;
`;

const ReviewerImage = styled.img`
  width: 100%;
  height: 80%;
  object-fit: cover;
`;

const ReviewerInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
`;

const ReviewerName = styled.h4`
  font-size: 1.2em;
  color: var(--primary-color);
  margin-bottom: 5px;
`;

const ReviewerPosition = styled.p`
  font-size: 1em;
  color: var(--secondary-color);
`;

const ReviewText = styled.p`
  font-size: 1.1em;
  color: var(--text-color);
  line-height: 1.5;
  overflow-y: auto;
  height: 100%;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--secondary-color);
    border-radius: 10px;
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

// Массив отзывов
const reviews = [
  {
    videoUrl: "https://www.youtube.com/embed/sampleVideoID1",
    imageUrl: "/img/card1.png",
    name: "Іван Іванов",
    position: "Фрілансер, Web Developer",
    text: "Цей курс дійсно змінив моє бачення роботи з AI. Я навчився створювати неймовірні речі, про які раніше тільки мріяв. Рекомендую всім, хто хоче бути на передовій технологій!"
  },
  {
    videoUrl: "https://www.youtube.com/embed/sampleVideoID2",
    imageUrl: "/img/card2.png",
    name: "Олена Петрова",
    position: "CEO, DesignPro Studio",
    text: "Відмінний курс! Дуже багато практичної інформації. Особливо сподобалась частина про створення візуального контенту - тепер я можу легко генерувати унікальні зображення для своїх проектів."
  },
  {
    videoUrl: "https://www.youtube.com/embed/sampleVideoID3",
    imageUrl: "/img/card4.png",
    name: "Михайло Сидоренко",
    position: "Підприємець, AI Enthusiast",
    text: "Завдяки цьому курсу я зміг автоматизувати багато процесів у своєму бізнесі. Економія часу просто вражаюча! Дякую за такий цінний досвід."
  },
  {
    videoUrl: "https://www.youtube.com/embed/sampleVideoID4",
    imageUrl: "/img/card3.png",
    name: "Анна Ковальчук",
    position: "Маркетолог, AI Creator",
    text: "Курс перевершив усі мої очікування! Тепер я можу створювати унікальний контент за допомогою AI, що значно підвищило ефективність моїх маркетингових кампаній."
  }
];

// Компонент ReviewsSection
const ReviewsSection = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [flippedCards, setFlippedCards] = useState({});

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % reviews.length);
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const toggleCard = (index) => {
    setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <SectionContainer>
      <Title
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Відгуки наших студентів
      </Title>
      <ReviewsContainer>
        <VideoCarousel>
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
          <PrevButton onClick={prevVideo}><FaChevronLeft /></PrevButton>
          <NextButton onClick={nextVideo}><FaChevronRight /></NextButton>
        </VideoCarousel>
        <TextReviewsContainer>
          {reviews.map((review, index) => (
            <FlipCard key={index} onClick={() => toggleCard(index)}>
              <FlipCardInner
                animate={{ rotateY: flippedCards[index] ? 180 : 0 }}
                transition={{ duration: 0.6 }}
              >
                <CardFront>
                  <ReviewerImage src={review.imageUrl} alt={review.name} />
                  <ReviewerInfo>
                    <ReviewerName>{review.name}</ReviewerName>
                    <ReviewerPosition>{review.position}</ReviewerPosition>
                  </ReviewerInfo>
                </CardFront>
                <CardBack>
                  <QuoteIcon />
                  <ReviewText>{review.text}</ReviewText>
                </CardBack>
              </FlipCardInner>
            </FlipCard>
          ))}
        </TextReviewsContainer>
      </ReviewsContainer>
    </SectionContainer>
  );
};

export default ReviewsSection;