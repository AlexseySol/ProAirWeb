import styled, { createGlobalStyle, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const glowPulse = keyframes`
  0% { text-shadow: 0 0 5px rgba(233, 69, 96, 0.5), 0 0 10px rgba(233, 69, 96, 0.3); }
  50% { text-shadow: 0 0 20px rgba(233, 69, 96, 0.8), 0 0 30px rgba(233, 69, 96, 0.5); }
  100% { text-shadow: 0 0 5px rgba(233, 69, 96, 0.5), 0 0 10px rgba(233, 69, 96, 0.3); }
`;

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
  padding: 20px;
  overflow-y: auto;  // Enable scrolling if content is taller than viewport
`;

export const ModalContent = styled.div`
  background-color: rgba(26, 26, 46, 0.95);
  border-radius: 20px;
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: ${slideUp} 0.5s ease-out;
  position: relative;
  max-height: 90vh;  // Ensure modal content doesn't overflow the screen height
  overflow-y: auto;  // Scroll within the modal if content is too long

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 10px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 20px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    color: #e94560;
    transform: rotate(90deg);
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 30px;
  overflow-y: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin: 0 0 20px;
  color: #b84dff;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  width: 100%;

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

export const TimerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
`;

export const TimerBlock = styled.div`
  background: #1e2a4a;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  flex: 1;
`;

export const TimerValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #b84dff;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const TimerLabel = styled.div`
  font-size: 0.8rem;
  text-transform: uppercase;
  color: #a0a0a0;

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

export const PriceContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export const CurrentPrice = styled.span`
  font-size: 3.5rem;
  font-weight: bold;
  color: #b84dff;
  animation: ${glowPulse} 2s infinite;
  display: inline-block;

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

export const OriginalPrice = styled.span`
  font-size: 1.2rem;
  color: #888;
  text-decoration: line-through;
  margin-left: 10px;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const Discount = styled.span`
  font-size: 1rem;
  color: #4caf50;
  margin-left: 10px;
  font-weight: bold;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const BenefitList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const BenefitItem = styled.li`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #ffffff;

  &:before {
    content: '✓';
    color: #b84dff;
    margin-right: 10px;
    font-weight: bold;
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 8px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 350px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const Input = styled.input`
  padding: 12px;
  border: 2px solid rgba(184, 77, 255, 0.3);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #b84dff;
    box-shadow: 0 0 10px rgba(184, 77, 255, 0.3);
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 10px;
  }
`;

export const SubmitButton = styled.button`
  padding: 12px;
  background-color: #b84dff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 5px 15px rgba(184, 77, 255, 0.4);
  width: 100%;

  &:hover {
    background-color: #a030ff;
    transform: translateY(-2px);
    box-shadow: 0 7px 20px rgba(184, 77, 255, 0.6);
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 10px;
  }
`;

export const ErrorMessage = styled.div`
  color: #ff4d4d;
  font-size: 0.8rem;
  margin-top: -10px;

  @media (max-width: 480px) {
    font-size: 0.7rem;
    margin-top: -8px;
  }
`;
