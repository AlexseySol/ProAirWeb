import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import HeroSection from './components/HeroSection';
import ForWhomSection from './components/ForWhomSection';
import AuthorSection from './components/AuthorSection';
import CourseContentSection from './components/CourseContentSection';
import ResultsSection from './components/ResultsSection';
import OfferSection from './components/OfferSection';
import FAQSection from './components/FAQSection';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  
  :root {
    --primary-color: #FF6F61; // Bright Coral
    --secondary-color: #4A90E2; // Soothing Blue
    --background-color: #FFFFFF; // White Background for Clean Look
    --text-color: #333333; // Dark Gray Text
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
    background-color: var(--background-color);
    color: var(--text-color);
    overflow-x: hidden; // Prevent horizontal scroll
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
  }

  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }
`;

const AppContainer = styled(motion.div)`
  width: 100vw;
  position: relative;
  overflow: hidden;
`;

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
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <HeroSection />
        </motion.div>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ForWhomSection />
        </motion.div>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <AuthorSection />
        </motion.div>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <CourseContentSection />
        </motion.div>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ResultsSection />
        </motion.div>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <OfferSection />
        </motion.div>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <FAQSection />
        </motion.div>
      </AppContainer>
    </>
  );
};

export default App;
