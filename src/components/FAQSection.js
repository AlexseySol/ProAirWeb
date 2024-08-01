import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const SectionContainer = styled.section`
  padding: 80px 20px;
  background-color: #ffffff;

  @media (max-width: 768px) {
    padding: 60px 15px;
  }
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

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FAQItem = styled(motion.div)`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Question = styled.h3`
  margin: 0;
  font-size: 1.2em;

  @media (max-width: 768px) {
    font-size: 1.1em;
  }
`;

const Answer = styled(motion.div)`
  margin-top: 10px;
  font-size: 1em;
  color: #666;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

const faqData = [
  {
    question: "Для кого підходить цей курс?",
    answer: "Курс підходить для фрілансерів, підприємців та всіх, хто зацікавлений у вивченні та застосуванні штучного інтелекту."
  },
  {
    question: "Які знання потрібні для початку навчання?",
    answer: "Для проходження курсу не потрібні спеціальні знання. Ми почнемо з основ і поступово перейдемо до складніших тем."
  },
  {
    question: "Чи є можливість отримати сертифікат після закінчення курсу?",
    answer: "Так, після успішного завершення курсу ви отримаєте сертифікат, який підтверджує ваші знання та навички в області штучного інтелекту."
  },
  {
    question: "Який формат навчання пропонується?",
    answer: "Курс проводиться в онлайн форматі. Усі заняття доступні в записі, тож ви зможете навчатися у зручний для вас час."
  }
];

const FAQSection = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <SectionContainer>
      <Title
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Часті питання
      </Title>
      <FAQContainer>
        {faqData.map((item, index) => (
          <FAQItem
            key={index}
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Question>{item.question}</Question>
            <AnimatePresence>
              {expandedIndex === index && (
                <Answer
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.answer}
                </Answer>
              )}
            </AnimatePresence>
          </FAQItem>
        ))}
      </FAQContainer>
    </SectionContainer>
  );
};

export default FAQSection;
