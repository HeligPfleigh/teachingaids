import { blue600, grey900 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {},
  appBar: {
    height: 57,
    color: blue600,
  },
  drawer: {
    width: 230,
    color: grey900,
  },
  raisedButton: {
    primaryColor: blue600,
  },
});

export default muiTheme;
