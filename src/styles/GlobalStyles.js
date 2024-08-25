import { createGlobalStyle, keyframes } from 'styled-components';

// Subtle text fade animation
const subtleFade = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
`;

// Global styles
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');
  
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

  html {
    font-size: 16px; // Base font size
  }

  body {
    font-family: 'Noto Sans', sans-serif;
    line-height: 1.6;
    background: var(--background-color);
    color: var(--text-color);
    overflow-x: hidden;
  }

  // Apply Noto Sans to all text elements
  body, input, textarea, button, select {
    font-family: 'Noto Sans', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--text-color);
    margin-bottom: 1rem;
    font-weight: 700;
    line-height: 1.2;
    animation: ${subtleFade} 3s ease-in-out infinite;
  }

  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.75rem; }
  h4 { font-size: 1.5rem; }
  h5 { font-size: 1.25rem; }
  h6 { font-size: 1rem; }

  p, ul, ol, dl, table, blockquote {
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
    font-weight: 700;
    letter-spacing: 1px;
    color: var(--text-color);
    animation: ${subtleFade} 3s ease-in-out infinite;
  }

  // Additional text styles
  strong, b { font-weight: 700; }
  em, i { font-style: italic; }

  // List styles
  ul, ol {
    padding-left: 1.5rem;
  }

  // Table styles
  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 0.5rem;
    border: 1px solid var(--text-color-secondary);
  }

  // Responsive typography
  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
  }
`;

export default GlobalStyle;