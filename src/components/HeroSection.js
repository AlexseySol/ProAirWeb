import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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
  z-index: -1;
`;

const SectionContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 2rem 0;
  color: var(--text-color);
  position: relative;
  overflow: hidden;
`;

const LogoContainer = styled(motion.div)`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    top: 10px;
    left: 10px;
    width: 50px;
    height: 50px;
  }
`;

const Logo = styled(motion.img)`
  width: 80%;
  height: 80%;
  border-radius: 50%;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 80px 2rem 0;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    padding-top: 100px;
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
  flex: 1;
  max-width: 50%;
  aspect-ratio: 16 / 9;
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  background: rgba(0, 119, 204, 0.1);
  padding: 20px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 119, 204, 0.2) 0%, rgba(0, 48, 80, 0.2) 100%);
    z-index: -1;
  }

  @media (max-width: 1200px) {
    max-width: 100%;
    width: 100%;
    margin-top: 2rem;
  }
`;

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
      <BackgroundImage />
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