import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ffff00',
    },
    background: {
      default: '#111111',
      paper: '#111111',
    },
  },
  props: {
    MuiTextField: {
      color: 'secondary',
    },
  },
});
export default theme;