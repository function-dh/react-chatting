import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  // tag margin, padding, reset
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  // html5 tag block
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section{
    display: block;
  }

  // tag style reset
  ul, ol{
    list-style: none;
  }
  img, fieldset{
    border: none;
  }
  address{
    font-style: normal;
  }
  input{
    appearance: none;
    font-size: inherit;
  }
  input, img, i{
    vertical-align: middle;
  }
  button{
    appearance: none;
    padding: 0;
    border:0;
    text-transform: none;
    text-shadow: none;
    background-color: transparent;
    cursor:pointer;
  }

  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a:link, a:visited, a:hover, a:active, a:focus{
    text-decoration: none;
    color: inherit;
  }

  // font 설정
  @font-face {
    font-family: 'Apple SD Gothic Neo';
    font-weight: 700;
    src: local('Apple SD Gothic Neo Bold'),
    url('../assets/fonts/AppleSDGothicNeoEB.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Apple SD Gothic Neo';
    font-weight: 600;
    src: local('Apple SD Gothic Neo Bold'),
    url('../assets/fonts/AppleSDGothicNeoB.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Apple SD Gothic Neo';
    font-weight: 500;
    src: local('Apple SD Gothic Neo Middle'),
    url('../assets/fonts/AppleSDGothicNeoM.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Apple SD Gothic Neo';
    font-weight: 300;
    src: local('Apple SD Gothic Neo Light'),
    url('../assets/fonts/AppleSDGothicNeoL.ttf') format('truetype');
  }

  body, textarea, pre {
    font-family: 'Apple SD Gothic Neo','San Francisco', 'Noto Sans KR', '-apple-system', Sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.1px;
    color: ${({ theme }) => theme.color.black};
  }

  // layout 설정
  #header{
    position:relative;
    z-index:21; // 21~30
  }

  #container{
    position:relative;
  }
`

export default GlobalStyle