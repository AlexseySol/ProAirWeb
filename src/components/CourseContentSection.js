// CourseContentSection.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaRobot, FaComments, FaImages, FaPen, FaUserCircle, FaTable, FaVideo, FaDollarSign } from 'react-icons/fa';

const SectionContainer = styled.section`
  padding: 80px 20px;
  background: inherit;
  background-size: inherit;
  animation: inherit;
  color: inherit;

  @media (max-width: 768px) {
    padding: 60px 15px;
  }
`;

const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5em;
  color: var(--primary-color);

  @media (max-width: 768px) {
    font-size: 2em;
    margin-bottom: 30px;
  }
`;

const ModuleList = styled.ol`
  list-style-type: none;
  padding: 0;
`;

const Module = styled(motion.li)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(138, 43, 226, 0.2);
  display: flex;
  align-items: center;
  transition: transform 0.3s, box-shadow 0.3s;

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
  font-size: 2.5em;
  margin-right: 20px;
  color: var(--secondary-color);

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 15px;
  }
`;

const ModuleContent = styled.div`
  flex: 1;
`;

const ModuleTitle = styled.h3`
  font-size: 1.3em;
  margin-bottom: 10px;
  color: var(--secondary-color);

  @media (max-width: 768px) {
    font-size: 1.1em;
  }
`;

const ModuleDescription = styled.p`
  font-size: 1em;
  color: var(--light-text-color);

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

const courseModules = [
  { title: "Огляд інструментів AI", description: "Знайомство з можливостями AI після їх вивчення", icon: FaRobot },
  { title: "Chat GPT", description: "Налаштування персонального асистента, магазин GPTs, написання промптів", icon: FaComments },
  { title: "Створення візуального контенту", description: "Midjourney та його аналоги", icon: FaImages },
  { title: "Копірайтинг", description: "Написання постів та статей, інтеграція з Google Docs", icon: FaPen },
  { title: "Особистий аватар в HeyGen", description: "Створення та налаштування особистого аватару", icon: FaUserCircle },
  { title: "Робота з таблицями", description: "Використання AI в Google Sheets", icon: FaTable },
  { title: "Генерація відео", description: "Створення та покращення відео контенту за допомогою AI", icon: FaVideo },
  { title: "Бонус: Як заробити $1000/місяць з AI", description: "Дізнайся про стратегії та інструменти для заробітку", icon: FaDollarSign }
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
              <IconWrapper>
                <module.icon />
              </IconWrapper>
              <ModuleContent>
                <ModuleTitle>{`${index + 1}. ${module.title}`}</ModuleTitle>
                <ModuleDescription>{module.description}</ModuleDescription>
              </ModuleContent>
            </Module>
          ))}
        </ModuleList>
      </Content>
    </SectionContainer>
  );
};

export default CourseContentSection;
