import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaSync } from 'react-icons/fa';

const SectionContainer = styled.section`
  padding: 30px 20px;
  background: inherit;
  color: inherit;

  @media (max-width: 768px) {
    padding: 60px 15px;
  }
`;

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

const ReviewsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TextReviewsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 60px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FlipCard = styled(motion.div)`
  perspective: 1000px;
  height: 0;
  padding-bottom: 177.78%; // Соотношение сторон 9:16 для вертикального видео
  cursor: pointer;
`;

const FlipCardInner = styled(motion.div)`
  position: absolute;
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
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(138, 43, 226, 0.1);
`;

const CardFront = styled(CardSide)`
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(138, 43, 226, 0.1));
`;

const CardBack = styled(CardSide)`
  background: black;
  transform: rotateY(180deg);
`;

const ReviewerImage = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ReviewerInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  padding: 15px;
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

const ShortsEmbed = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const FlipIndicator = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(138, 43, 226, 0.7);
  color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  z-index: 10;

  &:hover {
    transform: rotate(180deg);
  }
`;

const reviews = [
  {
    videoId: "1ZBbaDn1bZ8",
    imageUrl: "/img/card1.png",
    name: "Іван Іванов",
    position: "Фрілансер, Web Developer",
  },
  {
    videoId: "0YStEv1QjkA",
    imageUrl: "/img/card2.png",
    name: "Олена Петрова",
    position: "CEO, DesignPro Studio",
  },
  {
    videoId: "TsT_mlMMdvQ",
    imageUrl: "/img/card4.png",
    name: "Михайло Сидоренко",
    position: "Підприємець, AI Enthusiast",
  },
  {
    videoId: "Qhl9tQfQr1w",
    imageUrl: "/img/card3.png",
    name: "Анна Ковальчук",
    position: "Маркетолог, AI Creator",
  }
];

const ReviewsSection = () => {
  const [activeCard, setActiveCard] = useState(null);
  const iframeRef = useRef(null);

  const toggleCard = (index) => {
    if (activeCard === index) {
      setActiveCard(null);
    } else {
      setActiveCard(index);
    }
  };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === 'YT_video_ended') {
        setActiveCard(null);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 20px rgba(138, 43, 226, 0.2)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
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
        <TextReviewsContainer>
          {reviews.map((review, index) => (
            <FlipCard 
              key={index} 
              onClick={() => toggleCard(index)}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <FlipCardInner
                animate={{ rotateY: activeCard === index ? 180 : 0 }}
                transition={{ duration: 0.6 }}
              >
                <CardFront>
                  <ReviewerImage>
                    <img src={review.imageUrl} alt={review.name} />
                  </ReviewerImage>
                  <ReviewerInfo>
                    <ReviewerName>{review.name}</ReviewerName>
                    <ReviewerPosition>{review.position}</ReviewerPosition>
                  </ReviewerInfo>
                  <FlipIndicator>
                    <FaSync />
                  </FlipIndicator>
                </CardFront>
                <CardBack>
                  {activeCard === index && (
                    <ShortsEmbed
                      ref={iframeRef}
                      src={`https://www.youtube.com/embed/${review.videoId}?autoplay=1&controls=0&rel=0&loop=1&playlist=${review.videoId}&enablejsapi=1`}
                      title="YouTube Shorts video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                  <FlipIndicator onClick={(e) => {
                    e.stopPropagation();
                    toggleCard(index);
                  }}>
                    <FaSync />
                  </FlipIndicator>
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