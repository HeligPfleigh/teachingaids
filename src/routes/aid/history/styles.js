import { typography } from 'material-ui/styles';
import { cyan600, fullWhite } from 'material-ui/styles/colors';

export default {
  columns: {
    name: {
      width: '20%',
    },
    type: {
      width: '10%',
    },
    counter: {
      width: '10%',
    },
    btnRedirect: {
      width: '10%',
      paddingLeft: 0,
      textAlign: 'center',
    },
    buttonGroup: {
      width: '10%',
    },
    edit: {
      width: '5%',
    },
  },
  subheader: {
    color: fullWhite,
    backgroundColor: cyan600,
    boxShadow: `
      rgba(0, 0, 0, 0.12) 0px 1px 6px,
      rgba(0, 0, 0, 0.12) 0px 1px 4px
    `,
  },
  textWhiteColor: {
    fontSize: 24,
    color: fullWhite,
    fontWeight: typography.fontWeightLight,
    padding: 0,
  },
};
