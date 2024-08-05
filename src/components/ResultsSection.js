// ResultsSection.js
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

// Анимация движения фона
const moveBackground = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 100% 100%; }
`;

// Стили для контейнера секции
const SectionContainer = styled.section`
  padding: 100px 20px;
  background: 
    linear-gradient(135deg, rgba(138, 43, 226, 0.1) 25%, transparent 25%) -50px 0,
    linear-gradient(225deg, rgba(138, 43, 226, 0.1) 25%, transparent 25%) -50px 0,
    linear-gradient(315deg, rgba(138, 43, 226, 0.1) 25%, transparent 25%),
    linear-gradient(45deg, rgba(138, 43, 226, 0.1) 25%, transparent 25%);
  background-size: 100px 100px;
  background-color: #000000;
  animation: ${moveBackground} 20s linear infinite;
  color: inherit;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%);
  }

  @media (max-width: 768px) {
    padding: 60px 15px;
  }
`;

// Стили для контента
const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

// Стили для заголовка
const Title = styled(motion.h2)`
  text-align: center;
  margin-bottom: 60px;
  font-size: 2.5em;
  color: #8A2BE2;
  text-shadow: 0 0 10px rgba(138, 43, 226, 0.5);

  @media (max-width: 768px) {
    font-size: 2em;
    margin-bottom: 40px;
  }
`;

// Стили для списка результатов
const ResultList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
`;

// Стили для элемента результата
const ResultItem = styled(motion.li)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(138, 43, 226, 0.1);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(138, 43, 226, 0.2);
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

// Стили для иконки результата
const ResultIcon = styled(motion.div)`
  width: 50px;
  height: 50px;
  background-color: #4A90E2;
  border-radius: 50%;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5em;
`;

// Стили для текста результата
const ResultText = styled.p`
  margin: 0;
  font-size: 1.1em;
  color: #CCCCCC;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

// Список результатов на украинском языке с заменой "ШІ" на "AI"
const results = [
  "Легко розбиратися в інструментах штучного інтелекту",
  "Опанувати нову технічну професію",
  "Використовувати AI для збільшення своїх доходів",
  "Економити час завдяки впровадженню інструментів AI",
  "Потрапити в ряди перших спеціалістів, хто володіє AI",
  "Автоматизувати частину процесів"
];

// Анимационные варианты для элемента результата
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

// Анимационные варианты для иконки
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

// Компонент ResultsSection
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
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
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
