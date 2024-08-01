import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionContainer = styled.section`
  padding: 80px 20px;
  background-color: #ffffff;

  @media (max-width: 768px) {
    padding: 60px 15px;
  }
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.2em;

  @media (max-width: 768px) {
    font-size: 1.8em;
    margin-bottom: 30px;
  }
`;

const ResultList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ResultItem = styled(motion.li)`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const ResultIcon = styled(motion.div)`
  width: 40px;
  height: 40px;
  background-color: #007bff;
  border-radius: 50%;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    margin-right: 15px;
  }
`;

const ResultText = styled.p`
  margin: 0;
  font-size: 1em;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

const results = [
  "Легко розбиратись в інструментах штучного інтелекту",
  "Опанувати нову технічну професію",
  "Використовувати ШІ для збільшення своїх доходів",
  "Економити час завдяки впровадженню інструментів АІ",
  "Потрапити в ряди перших спеціалістів, хто володіє АІ",
  "Автоматизувати частину процесів"
];

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
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <ResultIcon
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
              >
                {index + 1}
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
