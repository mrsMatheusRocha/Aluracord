function GlobalStyle() {
  return (
      <style global jsx>{`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      list-style: none;
    }
    div.jsx-934395946.sknui-div.sknui-box {
    overflow-x: hidden;
    }
    div.jsx-2179547112.sknui-div.sknui-box {
    overflow-x: hidden;
    }
    body {
      font-family: 'Open Sans', sans-serif;
    }
    div.sknui-div.jsx-718921810.sknui-text,
    div.sknui-div.jsx-132913291.sknui-text {
      font-family: 'Open Sans', sans-serif;
    }
    div.sknui-div.jsx-2391068590.sknui-text {
      font-family: 'Open Sans', sans-serif;
      text-align: center;
    }
    div.sknui-div.jsx-2761059840.sknui-text {
      font-size: 1.5rem;
      font-family: 'Open Sans', sans-serif;
    }
    img.sknui-img.jsx-2377473382.fotoPerfil {
    height: 40px;
    width: 40px;
    cursor: pointer;
    }
    div.sknui-div.jsx-3345976417.sknui-text {
      font-family: 'Open Sans', sans-serif;
      margin-bottom: 0.1875rem;
    }
    /* Scroll Bar */
    ::-webkit-scrollbar {
      width: 12px;
    }
        
    ::-webkit-scrollbar-track {
      border-radius: 8px;
      background-color: #95a5a6;
      border: 1px solid #cacaca;
    }
        
    ::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background-color: #2c3e50;
    }
    /* App fit Height */ 
    html, body, #__next {
      min-height: 100vh;
      display: flex;
      flex: 1;
    }
    #__next {
      flex: 1;
    }
    #__next > * {
      flex: 1;
    }
    /* ./App fit Height */ 
  `}</style>
  );
}

export default function CustomApp({ Component, pageProps }) {
  return (
      <>
          <GlobalStyle />
          <Component {...pageProps} />
      </>
  );
}