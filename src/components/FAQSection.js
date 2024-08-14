// FAQSection.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserGraduate, FaBrain, FaCertificate, FaChalkboardTeacher } from 'react-icons/fa';

const SectionContainer = styled.section`
  padding: 30px 20px;
  background: inherit;  /* Вернем фон в исходное состояние */
  background-size: inherit;
  animation: inherit;
  color: inherit;

  @media (max-width: 768px) {
    padding: 60px 15px;
  }
`;

const Title = styled(motion.h2)`
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.2em;
  color: var(--primary-color);

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
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(138, 43, 226, 0.2);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(138, 43, 226, 0.3);
  }

  @media (max-width: 768px) {
    padding: 15px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const IconWrapper = styled.div`
  font-size: 2em;
  margin-right: 20px;
  color: ${({ active }) => (active ? 'var(--primary-color)' : 'var(--secondary-color)')};
  transition: color 0.3s;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 15px;
  }
`;

const Question = styled.h3`
  margin: 0;
  font-size: 1.2em;
  color: ${({ active }) => (active ? 'var(--primary-color)' : 'var(--secondary-color)')};
  transition: color 0.3s;

  @media (max-width: 768px) {
    font-size: 1.1em;
  }
`;

const Answer = styled(motion.div)`
  margin-top: 10px;
  font-size: 1em;
  color: var(--light-text-color);
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

const faqData = [
  {
    question: "Для кого підходить цей курс?",
    answer: "Курс підходить для фрілансерів, підприємців та всіх, хто зацікавлений у вивченні та застосуванні штучного інтелекту.",
    icon: FaUserGraduate
  },
  {
    question: "Які знання потрібні для початку навчання?",
    answer: "Для проходження курсу не потрібні спеціальні знання. Ми почнемо з основ і поступово перейдемо до складніших тем.",
    icon: FaBrain
  },
  {
    question: "Чи є можливість отримати сертифікат після закінчення курсу?",
    answer: "Так, після успішного завершення курсу ви отримаєте сертифікат, який підтверджує ваші знання та навички в області штучного інтелекту.",
    icon: FaCertificate
  },
  {
    question: "Який формат навчання пропонується?",
    answer: "Курс проводиться в онлайн форматі. Усі заняття доступні в записі, тож ви зможете навчатися у зручний для вас час.",
    icon: FaChalkboardTeacher
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
        {faqData.map((item, index) => {
          const isActive = expandedIndex === index;
          return (
            <FAQItem
              key={index}
              onClick={() => setExpandedIndex(isActive ? null : index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <IconWrapper active={isActive}>
                <item.icon />
              </IconWrapper>
              <div style={{ flex: 1 }}>
                <Question active={isActive}>{item.question}</Question>
                <AnimatePresence>
                  {isActive && (
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
              </div>
            </FAQItem>
          );
        })}
      </FAQContainer>
    </SectionContainer>
  );
};

export default FAQSection;
