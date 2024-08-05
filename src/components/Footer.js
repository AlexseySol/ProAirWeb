// Footer.js
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

// Анимация для градиентного фона
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled container for the footer
const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #1a1a1a, #2c2c2c, #1a1a1a);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  color: var(--light-text-color);
  padding: 3rem 0;
  font-family: 'Poppins', sans-serif;
`;

// Styled content wrapper
const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

// Styled logo title
const Logo = styled.h2`
  color: var(--primary-color);
  font-size: 2rem;
  margin-bottom: 1rem;
  &:hover {
    color: var(--secondary-color);
    transition: color 0.3s;
  }
`;

// Styled copyright text
const Copyright = styled.p`
  margin-bottom: 1rem;
`;

// Styled contact info section
const ContactInfo = styled.div`
  margin-bottom: 1rem;
`;

// Styled link section
const LinkSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

// Styled link with motion effects
const Link = styled(motion.a)`
  color: var(--secondary-color);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: var(--primary-color);
  }
`;

// Styled address text
const Address = styled.p`
  max-width: 300px;
  margin-top: 1rem;
`;

// Social media icon section
const SocialMediaSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled(motion.a)`
  color: var(--light-text-color);
  font-size: 1.5rem;
  transition: color 0.3s;

  &:hover {
    color: var(--primary-color);
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Logo>ProAir</Logo>
        <Copyright>&copy; 2024 ProAir. All Rights Reserved.</Copyright>
        <ContactInfo>
          <p>Contact Us: 123-456-7890</p>
          <p>Email: support@proair.com</p>
        </ContactInfo>
        <LinkSection>
          <Link 
            href="/privacy" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Privacy Policy
          </Link>
          <Link 
            href="/terms" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Terms of Service
          </Link>
          <Link 
            href="/careers" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Careers
          </Link>
          <Link 
            href="/contact" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact
          </Link>
          <Link 
            href="/about" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            About Us
          </Link>
        </LinkSection>
        <SocialMediaSection>
          <SocialIcon 
            href="https://facebook.com"
            target="_blank"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaFacebook />
          </SocialIcon>
          <SocialIcon 
            href="https://twitter.com"
            target="_blank"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaTwitter />
          </SocialIcon>
          <SocialIcon 
            href="https://instagram.com"
            target="_blank"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaInstagram />
          </SocialIcon>
          <SocialIcon 
            href="https://linkedin.com"
            target="_blank"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedin />
          </SocialIcon>
        </SocialMediaSection>
        <Address>Headquarters: 123 Airway Ave, Miami, FL 33130</Address>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
