import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionContainer = styled.section`
  padding: 120px 20px;
  background: linear-gradient(135deg, #f8f9fa, #e0e7ff);
  text-align: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 80px 15px;
  }

  &:before {
    content: '';
    position: absolute;
    top: -60px;
    left: -60px;
    width: 120px;
    height: 120px;
    background-color: #007bff;
    border-radius: 50%;
    opacity: 0.1;
    z-index: 1;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: -60px;
    right: -60px;
    width: 120px;
    height: 120px;
    background-color: #6c757d;
    border-radius: 50%;
    opacity: 0.1;
    z-index: 1;
  }
`;

const Title = styled(motion.h1)`
  font-size: 3.5em;
  margin-bottom: 25px;
  font-weight: 700;
  color: #343a40;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 2.5em;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.7em;
  margin-bottom: 50px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  color: #495057;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 1.3em;
    margin-bottom: 40px;
  }
`;

const Bonus = styled(motion.p)`
  font-size: 1.2em;
  margin-bottom: 30px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  color: #007bff;
  position: relative;
  z-index: 2;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1em;
    margin-bottom: 20px;
  }
`;

const CTAButton = styled(motion.button)`
  padding: 18px 36px;
  font-size: 1.3em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  position: relative;
  z-index: 2;
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);

  &:hover {
    background-color: #0056b3;
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 1.1em;
  }
`;

const HeroSection = () => {
  return (
    <SectionContainer>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Стань просунутим користувачем штучного інтелекту
      </Title>
      <Subtitle
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Опануй 5 найпотужніших інструментів АІ та дізнайся, як заробляти на них від $1000/міс
        на 7-денному курсі від автора з Силіконової Долини.
      </Subtitle>
      <Bonus
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        При купівлі курсу сьогодні отримай бонус: “Топ 20 інструментів AI для заробітку”
      </Bonus>
      <CTAButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Долучитись до курсу
      </CTAButton>
    </SectionContainer>
  );
};

export default HeroSection;
