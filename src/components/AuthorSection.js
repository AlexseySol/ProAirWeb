import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(motion.h2)`
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5em;
  font-weight: 600;
  color: var(--primary-color);
  @media (max-width: 768px) {
    font-size: 2em;
    margin-bottom: 30px;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const AuthorText = styled.div``;

const AuthorName = styled(motion.h3)`
  font-size: 1.8em;
  margin-bottom: 10px;
  font-weight: 500;
  color: var(--secondary-color);
  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`;

const AuthorBio = styled(motion.p)`
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 20px;
  color: var(--text-color);
  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

const HighlightContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Highlight = styled(motion.div)`
  text-align: center;
  width: 30%;
  padding: 15px;
  background-color: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  @media (max-width: 768px) {
    width: 80%;
    margin-bottom: 15px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const SocialIcon = styled(motion.a)`
  color: var(--primary-color);
  font-size: 24px;
  transition: color 0.3s;
  &:hover {
    color: var(--secondary-color);
  }
`;

const Quote = styled(motion.blockquote)`
  font-style: italic;
  font-size: 1.2em;
  color: var(--light-text-color);
  text-align: center;
  margin-top: 30px;
  padding: 0 20px;
`;

const AuthorSection = () => {
  return (
    <SectionContainer>
      <Content>
        <Title
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Про Автора
        </Title>
        <AuthorInfo>

          <AuthorText>
            <AuthorName
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Влад Проценко
            </AuthorName>
            <AuthorBio
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Ми з дружиною родом з Києва. В 2022му році переїхали до США. Зараз ми маємо кілька сервісних бізнесів, проживаємо в Каліфорнії, Силіконовій Долині. Я - фахівець з штучного інтелекту та підприємець, захоплений інноваціями та їх впливом на бізнес. Моя мета - допомогти іншим опанувати AI та використовувати його для досягнення успіху.
            </AuthorBio>
            <SocialLinks>
              <SocialIcon href="#" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }}>
                <FaLinkedin />
              </SocialIcon>
              <SocialIcon href="#" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }}>
                <FaTwitter />
              </SocialIcon>
              <SocialIcon href="#" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }}>
                <FaInstagram />
              </SocialIcon>
            </SocialLinks>
          </AuthorText>
        </AuthorInfo>
        <HighlightContainer>
          {["АІ визначає майбутнє", "АІ потребує вмілих рук", "Стик експертиз - ключ до успіху"].map((text, index) => (
            <Highlight
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {text}
            </Highlight>
          ))}
        </HighlightContainer>
        <Quote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          "Штучний інтелект - це не заміна людського розуму, а його розширення. Разом ми можемо досягти неймовірних висот."
        </Quote>
      </Content>
    </SectionContainer>
  );
};

export default AuthorSection;
