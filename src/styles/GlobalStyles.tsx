import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.typography.fontFamily.primary};
    background: transparent;
    color: ${theme.colors.text.primary};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    position: relative;
  }

  #root {
    min-height: 100vh;
    width: 100%;
  }

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.surfaceLight};
    border-radius: ${theme.borderRadius.sm};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.text.tertiary};
  }

  /* Selection styles */
  ::selection {
    background-color: ${theme.colors.accent};
    color: ${theme.colors.text.primary};
  }

  /* Focus styles */
  *:focus {
    outline: 2px solid ${theme.colors.accent};
    outline-offset: 2px;
  }

  /* Button reset */
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
    color: inherit;
  }

  /* Link reset */
  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    color: ${theme.colors.accent};
  }

  /* List reset */
  ul, ol {
    list-style: none;
  }

  /* Image styles */
  img {
    max-width: 100%;
    height: auto;
  }

  /* Hidden class */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;