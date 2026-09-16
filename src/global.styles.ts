import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 20px 40px;
    font-family: 'Open Sans', sans-serif;
  }

  a {
    text-decoration: none;
    color: #000;
  }
`;

export default GlobalStyle;
