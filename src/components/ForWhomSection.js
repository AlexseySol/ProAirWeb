import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionContainer = styled.section`
  padding: 80px 20px;
  background-color: #ffffff;

  @media (max-width: 768px) {
    padding: 60px 15px;
  }
`;

const Title = styled(motion.h2)`
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.2em;
  font-weight: 600;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.8em;
    margin-bottom: 30px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Card = styled(motion.div)`
  width: 300px;
  padding: 20px;
  margin: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 1024px) {
    width: calc(50% - 40px);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 10px 0;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.4em;
  margin-bottom: 10px;
  font-weight: 500;
  color: #007bff;

  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

const CardDescription = styled.p`
  font-size: 1em;
  color: #666;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const ForWhomSection = () => {
  return (
    <SectionContainer>
      <Title
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Курс спеціально створено для:
      </Title>
      <CardContainer>
        <Card
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <CardTitle>Фрілансерів</CardTitle>
          <CardDescription>Які хочуть підвищити вартість своїх послуг та кількість замовлень</CardDescription>
        </Card>
        <Card
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <CardTitle>Підприємців</CardTitle>
          <CardDescription>Які хочуть "приручити" АІ співробітників, які працюють ефективно та безкоштовно</CardDescription>
        </Card>
        <Card
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <CardTitle>Всіх зацікавлених</CardTitle>
          <CardDescription>Хто розуміє, що ті, хто опанує АІ зараз - буде мати роботу чи бізнес завтра</CardDescription>
        </Card>
      </CardContainer>
    </SectionContainer>
  );
};

export default ForWhomSection;
