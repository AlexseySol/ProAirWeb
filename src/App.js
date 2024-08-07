import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import GlobalStyle from './styles/GlobalStyles';
import HeroSection from './components/HeroSection';
import ForWhomSection from './components/ForWhomSection';
import AuthorSection from './components/AuthorSection';
import CourseContentSection from './components/CourseContentSection';
import ResultsSection from './components/ResultsSection';
import OfferSection from './components/OfferSection';
import FAQSection from './components/FAQSection';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';

const AppContainer = styled(motion.div)`
  width: 100vw;
  position: relative;
  overflow: hidden;
`;

const SectionWrapper = styled(motion.div)`
  margin-bottom: 0px;
  padding: 80px 20px;
  background: inherit;
  background-size: inherit;
  animation: inherit;
  color: inherit;

  &:first-child {
    padding-top: 0;
  }

  @media (max-width: 768px) {
    padding: 60px 15px;
  }
`;

const ParticlesCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: "easeOut"
    } 
  }
};

const App = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.01;
      }

      draw() {
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let particlesArray = Array(100).fill().map(() => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.size <= 0.2) {
          particlesArray[index] = new Particle();
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <ParticlesCanvas ref={canvasRef} />
      <AppContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {[HeroSection, ForWhomSection, AuthorSection, CourseContentSection, 
          ResultsSection, OfferSection, FAQSection, ReviewsSection].map((Section, index) => (
          <SectionWrapper
            key={index}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Section />
          </SectionWrapper>
        ))}
        <Footer />
      </AppContainer>
    </>
  );
};

export default App;