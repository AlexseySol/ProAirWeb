import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import CourseEnrollModal from './CourseEnrollModal/CourseEnrollModal';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const CornerWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 180px;
  height: 180px;
  z-index: 5; // Очень низкий z-index
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    bottom: 10px;
    right: 10px;
  }
`;

const DiscountCard = styled.div`
  background: linear-gradient(45deg, #4a90e2, #8e44ad);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  padding: 10px;
  clip-path: inherit;
  border-radius: 10px 0 10px 0;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: ${shimmer} 3s infinite linear;
    clip-path: inherit;
  }
`;

const TextWrapper = styled.div`
  transform: rotate(-45deg);
  text-align: center;
  padding: 10px;

  @media (max-width: 768px) {
    transform: rotate(-45deg) scale(0.7);
  }
`;

const DiscountAmount = styled.div`
  color: #ffe66d;
  font-size: 40px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  margin-bottom: 5px;
  animation: ${pulse} 2s infinite ease-in-out;
`;

const DiscountText = styled.div`
  color: white;
  font-size: 22px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  margin-bottom: 5px;
  animation: ${pulse} 2s infinite ease-in-out;
`;

const ActionText = styled.div`
  color: #ffe66d;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  animation: ${pulse} 2s infinite ease-in-out 0.5s;
`;

const LOCAL_STORAGE_KEY = 'courseEnrollModal';

const DiscountCorner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDiscountAvailable, setIsDiscountAvailable] = useState(true);

  useEffect(() => {
    const checkDiscountAvailability = () => {
      const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (savedData) {
        const isExpired = savedData.endTime < Date.now() || savedData.isTimerExpired;
        setIsDiscountAvailable(!isExpired);
      }
    };

    checkDiscountAvailability();
    const discountInterval = setInterval(checkDiscountAvailability, 1000);

    return () => {
      clearInterval(discountInterval);
    };
  }, []);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  if (!isDiscountAvailable) return null;

  return (
    <>
      <CornerWrapper>
        <DiscountCard onClick={handleClick}>
          <TextWrapper>
            <DiscountAmount>73%</DiscountAmount>
            <DiscountText>Знижка</DiscountText>
            <ActionText>Встигни сьогодні!</ActionText>
          </TextWrapper>
        </DiscountCard>
      </CornerWrapper>
      <CourseEnrollModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default DiscountCorner;