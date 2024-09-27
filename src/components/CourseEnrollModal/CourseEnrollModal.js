import React, { useState, useEffect, useMemo } from 'react';
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
import styled, { keyframes } from 'styled-components';

const LOCAL_STORAGE_KEY = 'courseEnrollModal';

const fadeInOut = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

const ExpiredTimerContainer = styled(TimerContainer)`
  opacity: 0.5;
  animation: ${fadeInOut} 2s infinite;
`;

const CourseEnrollModal = ({ isOpen, onClose }) => {
  const initialEndTime = useMemo(() => Date.now() + 5 * 60 * 1000, []);

  // Здесь устанавливается начальная цена
  const [price, setPrice] = useState(29);
  const [endTime, setEndTime] = useState(initialEndTime);
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [showPaymentResult, setShowPaymentResult] = useState(false);

  useEffect(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setEndTime(initialEndTime);
    setIsTimerExpired(false);
    // Здесь сбрасывается цена при открытии модального окна
    setPrice(2);

    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('order_id');
    if (orderId) {
      setShowPaymentResult(true);
    }
  }, [initialEndTime]);

  useEffect(() => {
    if (isTimerExpired) {
      // Здесь меняется цена после истечения таймера
      setPrice(109);
    }

    const dataToSave = {
      price,
      endTime,
      isTimerExpired
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
  }, [price, endTime, isTimerExpired]);

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return (
        <ExpiredTimerContainer>
          <TimerBlock>
            <TimerValue>00</TimerValue>
            <TimerLabel>хвилин</TimerLabel>
          </TimerBlock>
          <TimerBlock>
            <TimerValue>00</TimerValue>
            <TimerLabel>секунд</TimerLabel>
          </TimerBlock>
        </ExpiredTimerContainer>
      );
    }
    return (
      <TimerContainer>
        <TimerBlock>
          <TimerValue>{minutes.toString().padStart(2, '0')}</TimerValue>
          <TimerLabel>хвилин</TimerLabel>
        </TimerBlock>
        <TimerBlock>
          <TimerValue>{seconds.toString().padStart(2, '0')}</TimerValue>
          <TimerLabel>секунд</TimerLabel>
        </TimerBlock>
      </TimerContainer>
    );
  };

  const handleTimerComplete = () => {
    setIsTimerExpired(true);
    // Здесь меняется цена после истечения таймера
    setPrice(109);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {showPaymentResult ? (
          <div>Оплата успішна!</div>
        ) : (
          <ContentWrapper>
            <LeftColumn>
              <Title>
                {isTimerExpired ? 'Стандартна ціна' : 'Спеціальна пропозиція!'}
              </Title>
              <Countdown
                date={endTime}
                onComplete={handleTimerComplete}
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
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default CourseEnrollModal;