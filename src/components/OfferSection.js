import React, { useState, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Countdown from 'react-countdown';
import Sparkle from 'react-sparkle';
import CourseEnrollModal from './CourseEnrollModal/CourseEnrollModal';

const SectionContainer = styled.section`
  padding: 30px 20px;
  background: inherit;
  background-size: inherit;
  animation: inherit;
  color: inherit;

  @media (max-width: 768px) {
    padding: 60px 15px;
  }
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled(motion.h2)`
  margin-bottom: 40px;
  font-size: 2.2em;
  color: var(--primary-color);

  @media (max-width: 768px) {
    font-size: 1.8em;
    margin-bottom: 30px;
  }
`;

const OfferList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 40px;
`;

const OfferItem = styled(motion.li)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(138, 43, 226, 0.1);
  text-align: left;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const OfferIcon = styled.span`
  font-size: 24px;
  margin-right: 10px;
  color: var(--secondary-color);

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(138, 43, 226, 0.5); }
  50% { box-shadow: 0 0 20px rgba(138, 43, 226, 0.8); }
  100% { box-shadow: 0 0 5px rgba(138, 43, 226, 0.5); }
`;

const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  padding: 15px;
  background: rgba(138, 43, 226, 0.1);
  border-radius: 15px;
  animation: ${glowAnimation} 2s infinite;
`;

const TimerBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
`;

const TimerValue = styled.div`
  font-size: 2.5em;
  font-weight: bold;
  color: var(--primary-color);
`;

const TimerLabel = styled.div`
  font-size: 0.9em;
  color: var(--secondary-color);
  text-transform: uppercase;
`;

const TimerSeparator = styled.div`
  font-size: 2.5em;
  color: var(--primary-color);
  margin: 0 5px;
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const glow = keyframes`
  0%, 100% { text-shadow: 0 0 5px rgba(255, 107, 107, 0.5), 0 0 10px rgba(255, 107, 107, 0.3); }
  50% { text-shadow: 0 0 20px rgba(255, 107, 107, 0.8), 0 0 30px rgba(255, 107, 107, 0.5); }
`;

const PriceTag = styled(motion.div)`
  font-size: 2.5em;
  font-weight: bold;
  color: var(--secondary-color);
  margin-bottom: 20px;
  display: inline-block;
  padding: 15px 25px;
  border-radius: 15px;
  background: rgba(138, 43, 226, 0.1);
  position: relative;
  animation: ${float} 3s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 2em;
  }
`;

const StrikethroughPrice = styled.span`
  text-decoration: line-through;
  color: #888;
  font-size: 0.6em;
  margin-left: 10px;
  vertical-align: middle;
`;

const HighlightedPrice = styled.span`
  color: #ff6b6b;
  font-weight: bold;
  animation: ${pulse} 2s infinite, ${glow} 2s infinite;
  display: inline-block;
`;

const RegularPrice = styled.div`
  font-size: 2.5em;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 20px;
`;

const CTAButton = styled(motion.button)`
  padding: 15px 30px;
  font-size: 1.2em;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(138, 43, 226, 0.3);
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: var(--secondary-color);
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 1em;
  }
`;

const offerItems = [
  { icon: "🎥", text: "Щоденні 15-20-хвилинні відео уроки, наповнені практичною інформацією та дієвими порадами" },
  { icon: "📚", text: "Додаткові ресурси та матеріали, які доповнюють ваше навчання" },
  { icon: "🎁", text: "БОНУС: \"Топ 20 інструментів AI для заробітку\"" },
];

const OfferSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOfferActive, setIsOfferActive] = useState(true);
  const initialEndTime = useMemo(() => Date.now() + 5 * 60 * 1000, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleTimerComplete = () => {
    setIsOfferActive(false);
  };

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return null;
    }
    return (
      <TimerContainer>
        <TimerBlock>
          <TimerValue>{minutes.toString().padStart(2, '0')}</TimerValue>
          <TimerLabel>хвилин</TimerLabel>
        </TimerBlock>
        <TimerSeparator>:</TimerSeparator>
        <TimerBlock>
          <TimerValue>{seconds.toString().padStart(2, '0')}</TimerValue>
          <TimerLabel>секунд</TimerLabel>
        </TimerBlock>
      </TimerContainer>
    );
  };

  return (
    <SectionContainer id="PricingSection">
      <Content>
        <Title
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Що ти отримаєш під час навчання:
        </Title>
        <OfferList>
          {offerItems.map((item, index) => (
            <OfferItem
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <OfferIcon>{item.icon}</OfferIcon> {item.text}
            </OfferItem>
          ))}
        </OfferList>
        <AnimatePresence>
          {isOfferActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Countdown
                date={initialEndTime}
                renderer={renderer}
                onComplete={handleTimerComplete}
              />
              <PriceTag
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                Спеціальна пропозиція: <HighlightedPrice>29$</HighlightedPrice> 
                <StrikethroughPrice>109$</StrikethroughPrice>
                <Sparkle
                  color="var(--secondary-color)"
                  count={30}
                  minSize={7}
                  maxSize={12}
                  overflowPx={0}
                  fadeOutSpeed={30}
                  flicker={false}
                />
              </PriceTag>
            </motion.div>
          )}
        </AnimatePresence>
        {!isOfferActive && (
          <RegularPrice>
            Вартість курсу: 109$
          </RegularPrice>
        )}
        <CTAButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openModal}
        >
          Долучитись до курсу
        </CTAButton>
      </Content>
      <CourseEnrollModal isOpen={isModalOpen} onClose={closeModal} />
    </SectionContainer>
  );
};

export default OfferSection;