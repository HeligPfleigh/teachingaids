import { typography } from 'material-ui/styles';
import { grey500, cyan600, fullWhite } from 'material-ui/styles/colors';

export default {
  editButton: {
    fill: grey500,
  },
  columns: {
    uniqueName: {
      width: '15%',
    },
    name: {
      width: '20%',
    },
    buttonGroup: {
      width: '10%',
    },
    edit: {
      width: '5%',
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
