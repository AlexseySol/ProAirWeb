// App.js
import React from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import HeroSection from './components/HeroSection';
import ForWhomSection from './components/ForWhomSection';
import AuthorSection from './components/AuthorSection';
import CourseContentSection from './components/CourseContentSection';
import ResultsSection from './components/ResultsSection';
import OfferSection from './components/OfferSection';
import FAQSection from './components/FAQSection';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';

// Global gradient animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Global styles
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  
  :root {
    --primary-color: #8A2BE2; // Bright violet
    --secondary-color: #4A90E2; // Blue
    --background-color: #000000; // Black background
    --text-color: #FFFFFF; // White text
    --light-text-color: #CCCCCC; // Light gray text
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Poppins', sans-serif;
    line-height: 1.6;
    font-size: 16px;
    background: linear-gradient(270deg, #000000, #1a1a1a, #2c1f4a, #111111);
    background-size: 400% 400%;
    animation: ${gradientAnimation} 15s ease infinite;
    color: var(--text-color);
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
    font-weight: 700;
    line-height: 1.2;
    color: var(--primary-color);
  }

  p {
    margin-bottom: 1rem;
    font-weight: 400;
    color: var(--light-text-color);
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.3s;
    &:hover {
      color: var(--secondary-color);
    }
  }

  button {
    cursor: pointer;
    font-family: inherit;
    transition: background-color 0.3s, transform 0.3s;
    background-color: var(--primary-color);
    color: var(--text-color);
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: 600;
    &:hover {
      background-color: var(--secondary-color);
      transform: translateY(-2px);
    }
  }

  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }
`;

// App container
const AppContainer = styled(motion.div)`
  width: 100vw;
  position: relative;
  overflow: hidden;
`;

// Section wrapper
const SectionWrapper = styled(motion.div)`
  margin-bottom: 0px; /* Remove margin between sections */
  padding: 80px 20px; /* Adjust padding for better spacing */
  background: inherit;
  background-size: inherit;
  animation: inherit;
  color: inherit;

  &:first-child {
    padding-top: 0; /* Remove top padding for the first section */
  }

  @media (max-width: 768px) {
    padding: 60px 15px;
  }
`;

// Section animation
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: "easeOut"
    } 
  }
};

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SectionWrapper
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <HeroSection />
        </SectionWrapper>
        <SectionWrapper
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ForWhomSection />
        </SectionWrapper>
        <SectionWrapper
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <AuthorSection />
        </SectionWrapper>
        <SectionWrapper
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <CourseContentSection />
        </SectionWrapper>
        <SectionWrapper
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ResultsSection />
        </SectionWrapper>
        <SectionWrapper
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <OfferSection />
        </SectionWrapper>
        <SectionWrapper
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <FAQSection />
        </SectionWrapper>
        <SectionWrapper
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ReviewsSection />
        </SectionWrapper>
        <Footer />
      </AppContainer>
    </>
  );
};

export default App;
