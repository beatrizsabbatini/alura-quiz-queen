import Head from 'next/head'
import { AppProps } from 'next/app'
import { createGlobalStyle, DefaultTheme, ThemeProvider } from 'styled-components';

import db from '../db.json';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    /* New styles */
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    // Deixa branco no começo
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body {
    min-height: 100vh;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const theme: DefaultTheme = db.theme;

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
        return (
            <>
              <Head>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
                <meta property="og:url" content="https://alura-quiz-queen.beatrizsabbatini.vercel.app/" key="ogurl" />
                <meta property="og:image" content={db.bg} key="ogimage" />
                <meta property="og:title" content="Quiz do Queen" key="ogtitle" />
                <meta property="og:description" content="Um quiz para testar os seus conhecimentos a respeito da melhor banda ever!" key="ogdesc" />
              </Head>
              <ThemeProvider theme={theme}>
                <GlobalStyle />
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Component {...pageProps} />
              </ThemeProvider>
            </>
        )
}

export default App
