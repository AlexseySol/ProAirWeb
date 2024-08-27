import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Header from './Header';
import CourseEnrollModal from './CourseEnrollModal/CourseEnrollModal';
import DiscountCorner from './DiscountCorner';

const SectionContainer = styled.section`
  position: relative;
  min-height: 100vh;
  width: 100%;
  color: var(--text-color);
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.8) 100%
    ),
    url('/img/фон1.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
`;

const StyledHeader = styled(Header)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
`;

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: calc(6rem + 15px) 2rem 2rem;
  min-height: 100vh;
  z-index: 2;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    padding-top: calc(8rem + 15px);
  }

  @media (max-width: 768px) {
    padding-top: calc(6rem + 15px);
  }
`;

const TextContainer = styled.div`
  flex: 1;
  max-width: 50%;
  padding-right: 2rem;

  @media (max-width: 1200px) {
    max-width: 100%;
    padding-right: 0;
    margin-bottom: 2rem;
    text-align: center;
  }
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  color: var(--primary-color);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Bonus = styled(motion.p)`
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: var(--secondary-color);
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CTAButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: var(--secondary-color);
    transform: translateY(-5px);
  }
`;

const VideoContainer = styled.div`
  width: 560px;
  height: 315px;
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  margin-right: 5%;

  @media (max-width: 1200px) {
    margin-top: 2rem;
    margin-right: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 56.25vw; // 16:9 aspect ratio
    max-height: 315px;
  }
`;

const VideoEmbed = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const HeroSection = () => {
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  const openEnrollModal = () => {
    setIsEnrollModalOpen(true);
  };

  const closeEnrollModal = () => {
    setIsEnrollModalOpen(false);
  };

  return (
    <SectionContainer>
      <BackgroundImage />
      <StyledHeader />
      <DiscountCorner discountPercentage={73} />
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
            onClick={openEnrollModal}
          >
            Приєднатися до курсу
          </CTAButton>
        </TextContainer>
        <VideoContainer>
          <VideoEmbed
            src="https://www.youtube.com/embed/NpQ5HDJxhgY?autoplay=1&controls=0&rel=0&loop=1&playlist=NpQ5HDJxhgY"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </VideoContainer>
      </ContentWrapper>
      <CourseEnrollModal isOpen={isEnrollModalOpen} onClose={closeEnrollModal} />
    </SectionContainer>
  );
};

export default HeroSection;