import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

// Removed gradient animation keyframes as they're no longer needed

// Updated styles for the section container
const SectionContainer = styled.section`
  padding: 30px 20px;
  background: inherit;
  background-size: inherit;
  animation: inherit;
  color: inherit;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 15px;
  }
`;

// Styles for content
const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

// Styles for title
const Title = styled(motion.h2)`
  text-align: center;
  margin-bottom: 60px;
  font-size: 2.5em;
  color: var(--primary-color);

  @media (max-width: 768px) {
    font-size: 2em;
    margin-bottom: 40px;
  }
`;

// Styles for result list
const ResultList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
`;

// Styles for result item
const ResultItem = styled(motion.li)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

// Styles for result icon
const ResultIcon = styled(motion.div)`
  width: 50px;
  height: 50px;
  background-color: var(--secondary-color);
  border-radius: 50%;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--background-color);
  font-size: 1.5em;
`;

// Styles for result text
const ResultText = styled.p`
  margin: 0;
  font-size: 1.1em;
  color: var(--text-color);
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

// List of results in Ukrainian
const results = [
  "Легко розбиратися в інструментах штучного інтелекту",
  "Опанувати нову технічну професію",
  "Використовувати AI для збільшення своїх доходів",
  "Економити час завдяки впровадженню інструментів AI",
  "Потрапити в ряди перших спеціалістів, хто володіє AI",
  "Автоматизувати частину процесів"
];

// Animation variants for result item
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ 
    opacity: 1, 
    y: 0,
    transition: { 
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

// Animation variants for icon
const iconVariants = {
  hidden: { scale: 0 },
  visible: { 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

// ResultsSection component
const ResultsSection = () => {
  return (
    <SectionContainer>
      <Content>
        <Title
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          В результаті проходження курсу ти зможеш:
        </Title>
        <ResultList>
          {results.map((result, index) => (
            <ResultItem
              key={index}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <ResultIcon
                variants={iconVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <FaCheck />
              </ResultIcon>
              <ResultText>{result}</ResultText>
            </ResultItem>
          ))}
        </ResultList>
      </Content>
    </SectionContainer>
  );
};

export default ResultsSection;