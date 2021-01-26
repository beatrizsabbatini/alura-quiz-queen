// import original module declaration
import 'styled-components';

// and extend it
declare module 'styled-components' {
  export interface DefaultTheme {
      colors: {
        primary: string,
        secondary: string,
        mainBg: string,
        contrastText: string,
        wrong: string,
        success: string
      },
      borderRadius: string
    
  }
}