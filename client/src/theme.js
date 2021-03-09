import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

/**
 * @name theme
 * @description The theme for our application
 */
const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#161b22',
      },
      secondary: {
        main: '#ffff00',
      },
      background: {
        default: '#0d1117',
        paper: '#0d1117',
      },
    },
    props: {
      MuiTextField: {
        color: 'secondary',
      },
    },
  })
);
export default theme;