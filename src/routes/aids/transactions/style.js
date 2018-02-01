import { typography } from 'material-ui/styles';
import { grey500, cyan600, fullWhite } from 'material-ui/styles/colors';


export default {
  searchBar: {
    marginBottom: '20px',
  },
  editButton: {
    fill: grey500,
  },
  columns: {
    barcode: {
      width: '12.5%',
    },
    name: {
      width: '15%',
    },
    quanity: {
      width: '10%',
    },
    unit: {
      width: '7.5%',
    },
    buttonGroup: {
      width: '7.5%',
    },
    remove: {
      width: '5%',
      backgroundColor: 'red',
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
  form: {
    margin: '15px',
  },
  avatar: {
    margin: '15px',
    width: '120px',
  },
  info: {
    margin: '15px',
  },
  formText: {
    width: '70%',
  },
  formItem: {
    marginLeft: '15px',
    marginRight: '15px',
    padding: '20px',
    fontSize: '16px',
  },
  iconSearch: {
    float: 'left',
  },
  clr: {
    clear: 'both',
  },
};

