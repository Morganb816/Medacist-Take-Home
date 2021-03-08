import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#212121',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffff00',
    },
  }
});
export default theme;