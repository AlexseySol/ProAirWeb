import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Icons can be imported from an external file or defined here directly
// Here, I will define them directly for simplicity.

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

const QuestionIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
  </svg>
);

const CommentsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/>
  </svg>
);

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
  padding: 20px 5%;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    padding: 15px 3%;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;

const LogoContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%; /* Make the logo container circular */

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%; /* Make the logo image circular */
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  margin-left: 30px;
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
  font-size: 24px;
  color: #ffffff;

  @media (max-width: 1024px) {
    display: block;
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
`;

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const sections = ['HeroSection', 'ForWhomSection', 'AuthorSection', 'CourseContentSection', 'ResultsSection', 'FAQSection', 'ReviewsSection'];

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
    { id: 'ForWhomSection', label: 'Для кого', icon: <UserIcon /> },
    { id: 'AuthorSection', label: 'Автор', icon: <UserIcon /> },
    { id: 'CourseContentSection', label: 'Програма', icon: <BookIcon /> },
    { id: 'ResultsSection', label: 'Результати', icon: <StarIcon /> },
    { id: 'FAQSection', label: 'FAQ', icon: <QuestionIcon /> },
    { id: 'ReviewsSection', label: 'Відгуки', icon: <CommentsIcon /> }
  ];

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <LogoContainer>
          <Logo src="/img/proair-logo.png" alt="ProAir Logo" />
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
          ☰
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
