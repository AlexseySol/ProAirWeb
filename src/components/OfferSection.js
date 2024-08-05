// OfferSection.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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

const PriceTag = styled(motion.div)`
  font-size: 2em;
  font-weight: bold;
  color: var(--secondary-color);
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.6em;
  }
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
  return (
    <SectionContainer>
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
        <PriceTag
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Спеціальна пропозиція: 29$ замість 105$
        </PriceTag>
        <CTAButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Долучитись до курсу
        </CTAButton>
      </Content>
    </SectionContainer>
  );
};

export default OfferSection;
