import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserGraduate, FaBrain, FaCertificate, FaChalkboardTeacher, FaBook, FaCalendarAlt, FaLaptop, FaQuestionCircle, FaTools, FaRocket } from 'react-icons/fa';

const SectionContainer = styled.section`

  background: inherit;
  background-size: inherit;
  animation: inherit;
  color: inherit;

  @media (max-width: 768px) {
    padding: 40px 15px;
  }
`;

const Title = styled(motion.h2)`
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5em;
  color: var(--primary-color);

  @media (max-width: 768px) {
    font-size: 2em;
    margin-bottom: 30px;
  }
`;

const FAQContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const FAQItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 4px 15px rgba(138, 43, 226, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(138, 43, 226, 0.3);
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconWrapper = styled.div`
  font-size: 2em;
  margin-right: 20px;
  color: var(--primary-color);
  transition: color 0.3s;

  @media (max-width: 768px) {
    font-size: 1.5em;
    margin-right: 15px;
  }
`;

const Question = styled.h3`
  margin: 0;
  font-size: 1.3em;
  color: var(--secondary-color);
  transition: color 0.3s;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 1.1em;
  }
`;

const Answer = styled(motion.div)`
  margin-top: 15px;
  font-size: 1.1em;
  color: var(--text-color);
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1em;
  }
`;



const faqData = [
  {
    question: "Для кого підходить цей курс?",
    answer: "Курс спеціально створений для:\n- Фрілансерів: Хто хоче підвищити вартість своїх послуг та кількість замовлень, вивільняючи час на себе.\n- Підприємців: Хто хоче \"приручити\" АІ співробітників, які працюють ефективно та безкоштовно, 24/7.\n- Усіх, хто розуміє, що ті, хто опанує АІ зараз, будуть мати роботу чи бізнес завтра.",
    icon: FaUserGraduate
  },
  {
    question: "Які знання потрібні для початку навчання?",
    answer: "Для проходження курсу не потрібні спеціальні знання чи досвід. Ми почнемо з основ і поступово перейдемо до складніших тем. Головне – бажання навчатися і відкрити для себе нові можливості з АІ.",
    icon: FaBrain
  },
  {
    question: "Чи є можливість отримати сертифікат після закінчення курсу?",
    answer: "Так, після успішного завершення курсу ти отримаєш сертифікат, який підтверджує твої знання та навички в області штучного інтелекту.",
    icon: FaCertificate
  },
  {
    question: "Чи будуть надані навчальні матеріали?",
    answer: "Так, усі учасники курсу отримають доступ до навчальних матеріалів, включаючи презентації, відео уроки та інструкції.",
    icon: FaBook
  },
  {
    question: "Який формат навчання пропонується?",
    answer: "Курс проводиться в онлайн форматі, що дозволяє тобі навчатися у зручний час та з будь-якого місця. Усі заняття в записі, тож ти зможеш переглянути їх у будь-який момент.",
    icon: FaChalkboardTeacher
  },
  {
    question: "Чи є обмеження за віком для участі в курсі?",
    answer: "Ні, обмежень за віком немає. Курс підходить для всіх, хто цікавиться штучним інтелектом та хоче використовувати його у своїй професійній діяльності.",
    icon: FaCalendarAlt
  },
  {
    question: "Чи потрібно встановлювати спеціальне програмне забезпечення для навчання?",
    answer: "Більшість інструментів, які використовуються на курсі, доступні онлайн. Деякі з них можуть вимагати реєстрації або підписки, про що ти дізнаєшся на початку навчання.",
    icon: FaLaptop
  },
  {
    question: "Чи можна отримати доступ до матеріалів курсу після його закінчення?",
    answer: "Так, ти збережеш доступ до всіх матеріалів курсу протягом року після його закінчення. Це дозволить тобі повторити матеріал або використати його у своїй роботі.",
    icon: FaBook
  },
  {
    question: "Що робити, якщо виникли технічні проблеми під час курсу?",
    answer: "У разі виникнення технічних проблем, ти можеш звернутися до нашої служби підтримки, яка оперативно вирішить твої питання. Інформація про контактні дані служби підтримки буде надана на початку курсу.",
    icon: FaQuestionCircle
  },
  {
    question: "Чи є на курсі готові рішення використання інструментів ШІ?",
    answer: "Так, ми даємо практичні інструменти та приклади готових рішень для автоматизації процесів у бізнесі та повсякденному житті. Ти дізнаєшся, як вибирати інструменти ШІ відповідно до своїх потреб і максимально використовувати їх потенціал.",
    icon: FaTools
  },
  {
    question: "Чи потрібно навчатись ШІ якщо я не IT спеціаліст?",
    answer: "Так, адже ШІ вже є частиною багатьох сфер нашого життя і праці. Знання та навички роботи з ШІ можуть значно покращити твою продуктивність, креативність та навіть відкрити нові можливості для заробітку, незалежно від твоєї професії.",
    icon: FaRocket
  }
];

const FAQSection = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <SectionContainer>
      <Title
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Часті запитання
      </Title>
      <FAQContainer>
        {faqData.map((item, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <FAQItem
              key={index}
              onClick={() => setExpandedIndex(isExpanded ? null : index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <QuestionHeader>
                <IconWrapper>
                  <item.icon />
                </IconWrapper>
                <Question>{item.question}</Question>
              </QuestionHeader>
              <AnimatePresence>
                {isExpanded && (
                  <Answer
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.answer}
                  </Answer>
                )}
              </AnimatePresence>
            </FAQItem>
          );
        })}
      </FAQContainer>
    </SectionContainer>
  );
};

export default FAQSection;