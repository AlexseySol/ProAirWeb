// AuthorSection.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

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
  align-items: stretch;
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(138, 43, 226, 0.2);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 20px;
  }
`;

const AuthorImage = styled.img`
  width: 250px;
  height: auto;
  object-fit: cover;
  border-radius: 12px;
  margin-right: 30px;
  border: 3px solid var(--primary-color);

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const AuthorText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AuthorName = styled(motion.h3)`
  font-size: 2em;
  margin-bottom: 15px;
  font-weight: 500;
  color: var(--secondary-color);

  @media (max-width: 768px) {
    font-size: 1.7em;
  }
`;

const AuthorBio = styled(motion.p)`
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 20px;
  color: var(--light-text-color);

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
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(138, 43, 226, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(138, 43, 226, 0.3);
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
  color: var(--secondary-color);
  font-size: 24px;
  transition: color 0.3s;

  &:hover {
    color: var(--primary-color);
  }
`;

const Quote = styled(motion.blockquote)`
  font-style: italic;
  font-size: 1.3em;
  color: var(--secondary-color);
  text-align: center;
  margin-top: 30px;
  padding: 0 20px;
  position: relative;

  &::before,
  &::after {
    content: '"';
    font-size: 3em;
    color: rgba(138, 43, 226, 0.3);
    position: absolute;
  }

  &::before {
    top: -20px;
    left: -10px;
  }

  &::after {
    bottom: -40px;
    right: -10px;
  }
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
          <AuthorImage src="/img/Влад.jpg" alt="Влад Проценко" />
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
              Ми з дружиною родом з Києва. У 2022 році переїхали до США. Зараз
              ми маємо кілька сервісних бізнесів, проживаємо в Каліфорнії,
              Силіконовій Долині. Я - фахівець з AI та
              підприємець, захоплений інноваціями та їх впливом на бізнес. Моя
              мета - допомогти іншим опанувати AI та використовувати його для
              досягнення успіху.
            </AuthorBio>
            <SocialLinks>
              <SocialIcon
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
              >
                <FaLinkedin />
              </SocialIcon>
              <SocialIcon
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
              >
                <FaTwitter />
              </SocialIcon>
              <SocialIcon
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
              >
                <FaInstagram />
              </SocialIcon>
            </SocialLinks>
          </AuthorText>
        </AuthorInfo>
        <HighlightContainer>
          {[
            'AI визначає майбутнє',
            'AI потребує вмілих рук',
            'Стик експертиз - ключ до успіху',
          ].map((text, index) => (
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
          "AI - це не заміна людського розуму, а його розширення.
          Разом ми можемо досягти неймовірних висот."
        </Quote>
      </Content>
    </SectionContainer>
  );
};

export default AuthorSection;
