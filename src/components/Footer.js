import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { FaHeart, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import TermsOfUse from './pages/TermsOfUse';
import RefundPolicy from './pages/RefundPolicy';
import ContactInfo from './pages/ContactInfo';

Modal.setAppElement('#root');

const StyledFooter = styled.footer`
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  padding: 20px 0;
  position: relative;
  overflow: hidden;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
`;

const FooterLink = styled(motion.a)`
  color: var(--text-color);
  text-decoration: none;
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: var(--primary-color);
  }
`;

const Copyright = styled.div`
  font-size: 0.8rem;
  color: var(--text-color-secondary);
  display: flex;
  align-items: center;
`;

const HeartIcon = styled(FaHeart)`
  color: var(--secondary-color);
  margin: 0 5px;
  font-size: 0.8rem;
`;

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(10, 11, 30, 0.9)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position: 'relative',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    border: 'none',
    background: 'var(--background-color)',
    overflow: 'hidden',
    borderRadius: '15px',
    padding: '0',
    width: '90%',
    maxWidth: '800px',
    height: '80vh',
    maxHeight: '800px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
  },
};

const ModalContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 100%;
  color: var(--text-color);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
`;

const ModalTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.3rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(90deg);
  }
`;

const ModalContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  font-size: 0.9rem;
  line-height: 1.6;

  @media (min-width: 768px) {
    padding: 30px;
    font-size: 1rem;
    line-height: 1.7;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--primary-color);
    border-radius: 4px;
  }
`;

const Footer = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeContent, setActiveContent] = useState(null);

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalIsOpen]);

  const openModal = (content) => {
    setActiveContent(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const getModalTitle = () => {
    switch (activeContent) {
      case 'terms':
        return 'Правила та умови використання';
      case 'refund':
        return 'Політика повернення';
      case 'contact':
        return 'Контактна інформація';
      default:
        return '';
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3, ease: 'easeIn' } }
  };

  return (
    <StyledFooter>
      <FooterContent>
        <FooterLinks>
          <FooterLink
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            onClick={() => openModal('terms')}
          >
            Правила та умови
          </FooterLink>
          <FooterLink
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            onClick={() => openModal('refund')}
          >
            Політика повернення
          </FooterLink>
          <FooterLink
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            onClick={() => openModal('contact')}
          >
            Контакти
          </FooterLink>
        </FooterLinks>
        <Copyright>
          © {new Date().getFullYear()} ProAir. Всі права захищені. Зроблено з <HeartIcon /> в Україні
        </Copyright>
      </FooterContent>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        closeTimeoutMS={300}
      >
        <AnimatePresence>
          {modalIsOpen && (
            <ModalContainer
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ModalHeader>
                <ModalTitle>{getModalTitle()}</ModalTitle>
                <CloseButton onClick={closeModal}>
                  <FaTimes />
                </CloseButton>
              </ModalHeader>
              <ModalContent>
                {activeContent === 'terms' && <TermsOfUse />}
                {activeContent === 'refund' && <RefundPolicy />}
                {activeContent === 'contact' && <ContactInfo />}
              </ModalContent>
            </ModalContainer>
          )}
        </AnimatePresence>
      </Modal>
    </StyledFooter>
  );
};

export default Footer;