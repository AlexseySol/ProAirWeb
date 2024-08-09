import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, rgba(0, 119, 204, 0.1), rgba(0, 48, 80, 0.1));
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  color: var(--text-color);
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 119, 204, 0.03) 0%, rgba(0, 119, 204, 0) 70%);
    animation: rotate 30s linear infinite;
  }

  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const LogoWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 119, 204, 0.3);
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CompanyName = styled.h2`
  color: var(--primary-color);
  font-size: 2.5rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FooterText = styled.p`
  margin-bottom: 1rem;
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
`;

const SectionTitle = styled.h4`
  color: var(--primary-color);
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const LinkSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Link = styled(motion.a)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: var(--primary-color);
  }
`;

const SocialMediaSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled(motion.a)`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.5rem;
  transition: color 0.3s, transform 0.3s;

  &:hover {
    color: var(--primary-color);
    transform: translateY(-3px);
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <LogoContainer>
            <LogoWrapper>
              <LogoImage src="/img/proair-logo.png" alt="ProAir Logo" />
            </LogoWrapper>
            <CompanyName>ProAir</CompanyName>
          </LogoContainer>
          <FooterText>Інноваційні рішення для авіаційної галузі</FooterText>
          <FooterText>&copy; 2024 ProAir. Усі права захищені.</FooterText>
        </FooterSection>
        <FooterSection>
          <SectionTitle>Контакти</SectionTitle>
          <Link href="tel:+380441234567"><FaPhone /> +380 44 123 4567</Link>
          <Link href="mailto:info@proair.com"><FaEnvelope /> info@proair.com</Link>
          <Link href="#"><FaMapMarkerAlt /> вул. Авіаційна, 1, Київ, 03058</Link>
        </FooterSection>
        <FooterSection>
          <SectionTitle>Швидкі посилання</SectionTitle>
          <LinkSection>
            <Link href="/about" whileHover={{ x: 5 }}>Про нас</Link>
            <Link href="/services" whileHover={{ x: 5 }}>Послуги</Link>
            <Link href="/products" whileHover={{ x: 5 }}>Продукти</Link>
            <Link href="/careers" whileHover={{ x: 5 }}>Кар'єра</Link>
            <Link href="/contact" whileHover={{ x: 5 }}>Контакти</Link>
          </LinkSection>
        </FooterSection>
        <FooterSection>
          <SectionTitle>Слідкуйте за нами</SectionTitle>
          <SocialMediaSection>
            <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </SocialIcon>
            <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialIcon>
          </SocialMediaSection>
          <FooterText>Приєднуйтесь до нас у соціальних мережах для отримання останніх новин та оновлень!</FooterText>
        </FooterSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;