import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Іконки
const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const BookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
  </svg>
);

const StarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
  </svg>
);

const PriceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
  </svg>
);

const CommentsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/>
  </svg>
);

// Стилізовані компоненти
const HeaderWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background: transparent;
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 2%;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;

  @media (max-width: 1024px) {
    padding: 15px 2%;
  }

  @media (max-width: 768px) {
    padding: 10px 3%;
  }
`;

const LogoContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  transition: all 0.3s ease;

  @media (max-width: 1024px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: flex-end;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  margin-left: 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;

  &:hover, &.active {
    color: var(--primary-color);
  }

  svg {
    margin-right: 8px;
    font-size: 20px;
  }
`;

const MobileMenuIcon = styled.div`
  display: none;
  cursor: pointer;
  color: #ffffff;
  transition: all 0.3s ease;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 21px;
  }

  span {
    display: block;
    height: 3px;
    width: 100%;
    background-color: #ffffff;
    transition: all 0.3s ease;
  }

  &:hover span {
    background-color: var(--primary-color);
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const MobileNavLink = styled(NavLink)`
  margin: 15px 0;
  font-size: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 30px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: var(--primary-color);
  }
`;

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const sections = ['HeroSection', 'ForWhomSection', 'AuthorSection', 'CourseContentSection', 'ResultsSection', 'PricingSection', 'ReviewsSection'];

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight - 100) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'HeroSection', label: 'Головна', icon: <HomeIcon /> },
    { id: 'ForWhomSection', label: 'Про курс', icon: <BookIcon /> },
    { id: 'AuthorSection', label: 'Викладач', icon: <UserIcon /> },
    { id: 'CourseContentSection', label: 'Програма', icon: <BookIcon /> },
    { id: 'ResultsSection', label: 'Переваги', icon: <StarIcon /> },
    { id: 'PricingSection', label: 'Вартість', icon: <PriceIcon /> },
    { id: 'ReviewsSection', label: 'Відгуки', icon: <CommentsIcon /> }
  ];

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <LogoContainer>
          <Logo src="/img/proair-logo.png" alt="ProAir Лого" />
        </LogoContainer>
        <Nav>
          {navItems.map(({ id, label, icon }) => (
            <NavLink
              key={id}
              onClick={() => scrollToSection(id)}
              className={activeSection === id ? 'active' : ''}
            >
              {icon} {label}
            </NavLink>
          ))}
        </Nav>
        <MobileMenuIcon onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </MobileMenuIcon>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <MobileMenu
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <CloseButton onClick={toggleMobileMenu}>
                ✕
              </CloseButton>
              {navItems.map(({ id, label, icon }) => (
                <MobileNavLink
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={activeSection === id ? 'active' : ''}
                >
                  {icon} {label}
                </MobileNavLink>
              ))}
            </MobileMenu>
          )}
        </AnimatePresence>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;