import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import EnrollmentForm from './EnrollmentForm';
import { 
  ModalOverlay, 
  ModalContent, 
  CloseButton, 
  Title, 
  TimerContainer, 
  TimerBlock,
  TimerValue,
  TimerLabel,
  PriceContainer,
  CurrentPrice, 
  OriginalPrice,
  Discount,
  ContentWrapper,
  LeftColumn,
  RightColumn,
  BenefitList, 
  BenefitItem
} from './styles';

const CourseEnrollModal = ({ isOpen, onClose }) => {
  const [price, setPrice] = useState(29);
  const [endTime] = useState(Date.now() + 24 * 60 * 60 * 1000);
  const [isTimerExpired, setIsTimerExpired] = useState(false);

  useEffect(() => {
    if (isTimerExpired) {
      setPrice(109);
    }
  }, [isTimerExpired]);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return null;
    }
    return (
      <TimerContainer>
        <TimerBlock>
          <TimerValue>{days}</TimerValue>
          <TimerLabel>днів</TimerLabel>
        </TimerBlock>
        <TimerBlock>
          <TimerValue>{hours}</TimerValue>
          <TimerLabel>годин</TimerLabel>
        </TimerBlock>
        <TimerBlock>
          <TimerValue>{minutes}</TimerValue>
          <TimerLabel>хвилин</TimerLabel>
        </TimerBlock>
        <TimerBlock>
          <TimerValue>{seconds}</TimerValue>
          <TimerLabel>секунд</TimerLabel>
        </TimerBlock>
      </TimerContainer>
    );
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ContentWrapper>
          <LeftColumn>
            <Title>Спеціальна пропозиція!</Title>
            <Countdown 
              date={endTime} 
              onComplete={() => setIsTimerExpired(true)}
              renderer={renderer}
            />
            <PriceContainer>
              <CurrentPrice>${price}</CurrentPrice>
              {!isTimerExpired && (
                <>
                  <OriginalPrice>$109</OriginalPrice>
                  <Discount>Економія 73%</Discount>
                </>
              )}
            </PriceContainer>
            <BenefitList>
              <BenefitItem>Доступ до всіх матеріалів курсу</BenefitItem>
              <BenefitItem>Персональний менторинг</BenefitItem>
              <BenefitItem>Сертифікат про проходження</BenefitItem>
              <BenefitItem>Бонус: 20 AI-інструментів для заробітку</BenefitItem>
            </BenefitList>
          </LeftColumn>
          <RightColumn>
            <EnrollmentForm price={price} onClose={onClose} />
          </RightColumn>
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CourseEnrollModal;
