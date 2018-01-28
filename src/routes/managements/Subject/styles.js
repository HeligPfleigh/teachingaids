import { typography } from 'material-ui/styles';
import { grey500, cyan600, fullWhite } from 'material-ui/styles/colors';

export default {
  editButton: {
    fill: grey500,
  },
  columns: {
    uniqueName: {
      width: '20%',
    },
    name: {
      width: '12%',
      paddingLeft: 0,
      textAlign: 'center',
    },
    btnRedirect: {
      width: '12%',
      paddingLeft: 0,
      textAlign: 'center',
    },
    buttonGroup: {
      width: '13%',
    },
  },
  btnIcon: {
    width: 30,
    height: 30,
    color: fullWhite,
  },
  btnWrapper: {
    width: 50,
    height: 50,
  },
  subheader: {
    color: fullWhite,
    backgroundColor: cyan600,
  },
  textWhiteColor: {
    fontSize: 24,
    color: fullWhite,
    fontWeight: typography.fontWeightLight,
  },
};
