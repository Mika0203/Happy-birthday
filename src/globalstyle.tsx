import { createGlobalStyle } from 'styled-components';
import font from './asset/font.ttf';

export const GlobalStyle = createGlobalStyle`
  @font-face{
    src : url(${font});
    font-family: 'Maple';
  }

  body{
    font-family: 'Maple';
    margin: 0px;
  }

  button{
    border-radius: 5px;
    border: 0px;
    margin : 5px;
    font-family: 'Maple';
    cursor: pointer;
    padding: 3px 10px;
    &:hover{
      filter: brightness(0.9)
    }
  }

  .mainCal {
    max-width: 700px;
    width: 100% !important;
  }

  .maintile {
    text-align: left !important;
    border: 1px solid #00000031 !important;
    border-radius: 0px;
    height: 7em;
    margin-top: 5px;
    display: grid;
  }
`;

