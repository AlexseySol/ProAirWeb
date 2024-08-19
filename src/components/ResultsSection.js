import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

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

const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

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

const ResultList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
`;

const ResultItem = styled(motion.li)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  position: relative;
  height: 300px;
  cursor: pointer;
`;

const ResultImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const ResultContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  z-index: 2;
`;

const ResultText = styled.p`
  margin: 0;
  font-size: 1.1em;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

const CheckCircle = styled(motion.div)`
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  background-color: var(--primary-color);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--background-color);
  font-size: 1.2em;
  z-index: 3;
`;

const results = [
  "Легко розбиратися в інструментах штучного інтелекту",
  "Опанувати нову технічну професію",
  "Використовувати AI для збільшення своїх доходів",
  "Економити час завдяки впровадженню інструментів AI",
  "Потрапити в ряди перших спеціалістів, хто володіє AI",
  "Автоматизувати частину процесів"
];

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
              <ResultImage src={`img/card${index + 1}.jpg`} alt={`Result ${index + 1}`} />
              <ResultContent>
                <ResultText>{result}</ResultText>
              </ResultContent>
              <CheckCircle
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1, rotate: 360, transition: { duration: 0.3 } }}
              >
                <FaCheck />
              </CheckCircle>
            </ResultItem>
          ))}
        </ResultList>
      </Content>
    </SectionContainer>
  );
};

export default ResultsSection;