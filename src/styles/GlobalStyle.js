import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset};
  
  * {
    padding:0;
    margin: 0;
    box-sizing: border-box;
  }
  textarea {
    resize: none;
    outline: none;
  }
  input,
  select,
  button {
    border: none;
    outline: none;
    box-sizing: border-box;
  }
  button {
    background: none;
    cursor: pointer;
  }
`;

export default GlobalStyle;
