import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionContainer = styled.section`
  padding: 80px 20px;
  background-color: #f8f9fa;

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

const ModuleList = styled.ol`
  list-style-type: none;
  padding: 0;
`;

const Module = styled(motion.li)`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const ModuleTitle = styled.h3`
  font-size: 1.3em;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 1.1em;
  }
`;

const ModuleDescription = styled.p`
  font-size: 1em;
  color: #666;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

const courseModules = [
  { title: "Огляд інструментів AI", description: "Знайомство з можливостями після їх вивчення" },
  { title: "Chat GPT", description: "Налаштування персонального асистента, магазин GPTs, написання промптів" },
  { title: "Створення візуального контенту", description: "Midjourney та його аналоги" },
  { title: "Копірайт", description: "Написання постів та статей, інтеграція з Google Docs" },
  { title: "Особистий аватар в HeyGen", description: "Створення та налаштування особистого аватару" },
  { title: "Робота з таблицями", description: "Використання AI в Google Sheets" },
  { title: "Відео генерація", description: "Створення та покращення відео контенту за допомогою AI" },
];

const CourseContentSection = () => {
  return (
    <SectionContainer>
      <Content>
        <Title
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          З чого складається курс
        </Title>
        <ModuleList>
          {courseModules.map((module, index) => (
            <Module
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <ModuleTitle>{module.title}</ModuleTitle>
              <ModuleDescription>{module.description}</ModuleDescription>
            </Module>
          ))}
        </ModuleList>
      </Content>
    </SectionContainer>
  );
};

export default CourseContentSection;
