import { createGlobalStyle, keyframes } from 'styled-components';

// Subtle text fade animation
const subtleFade = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
`;

// Global styles
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  
  :root {
    --primary-color: #B768FF; // Bright purple from the logo
    --secondary-color: #FF68D2; // Pink shade from the logo gradient
    --background-color: #0A0B1E; // Dark navy background
    --text-color: #F0F0F0; // Light grey, almost white
    --text-color-secondary: #D0D0D0; // Slightly darker grey for secondary text
    --button-color: #E0E0E0; // Light grey for buttons
    --button-text-color: #0A0B1E; // Dark color for button text
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Poppins', sans-serif;
    line-height: 1.6;
    font-size: 16px;
    background: var(--background-color);
    color: var(--text-color);
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--text-color);
    font-family: 'Poppins', sans-serif;
    margin-bottom: 1rem;
    font-weight: 700;
    line-height: 1.2;
    animation: ${subtleFade} 3s ease-in-out infinite;
  }

  p {
    color: var(--text-color-secondary);
    margin-bottom: 1rem;
    font-weight: 400;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: opacity 0.3s;
    &:hover {
      opacity: 0.8;
    }
  }

  button {
    cursor: pointer;
    font-family: inherit;
    transition: all 0.3s ease;
    background: var(--button-color);
    color: var(--button-text-color);
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    font-weight: 600;
    &:hover {
      background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
      color: var(--text-color);
    }
  }

  .logo-text {
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    letter-spacing: 1px;
    color: var(--text-color);
    animation: ${subtleFade} 3s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }
`;

export default GlobalStyle;