import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import PaymentResult from './components/pages/PaymentResult';
import PaymentWaiting from './components/pages/PaymentWaiting';

const AppContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  position: relative;
  z-index: 1;
`;

const Section = styled.section`
  width: 100%;
`;

const ParticlesCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
`;

const App = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particleCount = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseSize = Math.random() * 1 + 0.5;
        this.size = this.baseSize;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        this.size = Math.max(0.1, this.baseSize + Math.sin(Date.now() * 0.003) * 0.2);
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let particlesArray = Array(particleCount).fill().map(() => new Particle());

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <Router>
      <GlobalStyle />
      <ParticlesCanvas ref={canvasRef} />
      <AppContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={
            <MainContent>
              <Section id="HeroSection"><HeroSection /></Section>
              <Section id="ForWhomSection"><ForWhomSection /></Section>
              <Section id="AuthorSection"><AuthorSection /></Section>
              <Section id="CourseContentSection"><CourseContentSection /></Section>
              <Section id="ReviewsSection"><ReviewsSection /></Section>
              <Section id="ResultsSection"><ResultsSection /></Section>
              <Section id="OfferSection"><OfferSection /></Section>
              <Section id="FAQSection"><FAQSection /></Section>
              <Footer />
            </MainContent>
          } />
          <Route path="/payment-result" element={<PaymentResult />} />
          <Route path="/payment-waiting" element={<PaymentWaiting />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;





/* 
{
  "name": "proviz_web",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@chakra-ui/icons": "^2.1.1",
    "@chakra-ui/react": "^2.8.2",
    "@emotion/react": "^11.13.0",
    "@emotion/styled": "^11.13.0",
    "@notionhq/client": "^2.2.15",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.7.7",
    "body-parser": "^1.20.3",
    "cors": "^2.8.5",
    "crypto": "^1.0.1",
    "dotenv": "^16.4.5",
    "express": "^4.21.0",
    "framer-motion": "^11.3.30",
    "gsap": "^3.12.5",
    "helmet": "^7.1.0",
    "lucide-react": "^0.419.0",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.15",
    "react": "^18.2.0",
    "react-app-rewired": "^2.2.1",
    "react-countdown": "^2.3.6",
    "react-dom": "^18.2.0",
    "react-icons": "^5.2.1",
    "react-modal": "^3.16.1",
    "react-router-dom": "^6.26.0",
    "react-scripts": "5.0.1",
    "react-slick": "^0.30.2",
    "react-sparkle": "^2.0.0",
    "react-spring": "^9.7.4",
    "react-youtube": "^10.1.0",
    "slick-carousel": "^1.8.1",
    "styled-components": "^6.1.12",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "concurrently \"npm run server\" \"npm run client\"",
    "client": "cross-env PORT=3000 react-scripts start",
    "server": "cross-env PORT=5000 nodemon -r dotenv/config server.js",
    "build": "react-scripts build && npm run build-server",
    "build-server": "echo '#!/usr/bin/env node' > ./build/server.js && cat ./server.js >> ./build/server.js && chmod +x ./build/server.js",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "start:prod": "node -r dotenv/config ./build/server.js",
    "heroku-postbuild": "npm run build"
  },
  "devDependencies": {
    "concurrently": "^8.2.2",
    "cross-env": "^7.0.3"
  },
  "proxy": "http://localhost:5000",
  "engines": {
  "node": "20.x"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
*/