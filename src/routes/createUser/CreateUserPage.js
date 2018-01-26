import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import s from './CreateUserPage.scss';

const FONT_SIZE = 18;
const SPACE_BETWEEN = 50;

const styles = {
  container: {
    marginLeft: 200,
  },
  block: {
    maxWidth: 250,

  },
  radioButton: {
    marginBottom: 16,
  },
  sexOption: { marginRLeft: 500 },
};


class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radioButtonValue: 1,
      selectFieldvalue: 1,
    };
  }
  handleRadioButtonChange = (event, radioButtonValue) => {
    this.setState({ radioButtonValue });
  };
  handleSelectFieldChange = (event, selectFieldvalue) => {
    this.setState({ selectFieldvalue });
  };

  render() {
    return (
      <div style={styles.container}>
        <TextField
          floatingLabelText="Họ"
          floatingLabelStyle={{ fontSize: FONT_SIZE }}
          style={{ marginRight: SPACE_BETWEEN }}
        />

        <TextField
          floatingLabelText="Tên"
          floatingLabelStyle={{ fontSize: FONT_SIZE }}
          style={{ marginLeft: SPACE_BETWEEN }}
        /><br /><br />
        <div style={styles.sexOption}>
          <RadioButtonGroup
            name="notRight"
            style={styles.block}
            defaultSelected={1}
            value={this.state.radioButtonValue}
            onChange={this.handleRadioButtonChange}
          >
            <RadioButton
              value={1}
              label="Nam"
              style={styles.radioButton}
            />
            <RadioButton
              value={2}
              label="Nữ"
              style={styles.radioButton}
            />
          </RadioButtonGroup>
          <br />
          <DatePicker hintText="Ngày sinh" /><br />
          <TextField
            floatingLabelText="Email"
            floatingLabelStyle={{ fontSize: FONT_SIZE }}

          />
          <br />
          <TextField
            floatingLabelText="Số điện thoại"
            floatingLabelStyle={{ fontSize: FONT_SIZE }}
          />
          <br />
          <TextField
            floatingLabelText="Địa chỉ"
            floatingLabelStyle={{ fontSize: FONT_SIZE }}
          />
        </div>
        <SelectField
          floatingLabelText="Vai Trò"
          value={this.state.selectFieldvalue}
          onChange={this.handleSelectFieldChange}
        >
          <MenuItem value={0} primaryText="Admin" />
          <MenuItem value={1} primaryText="Quản lý" />
          <MenuItem value={2} primaryText="Nhân viên" />
          <MenuItem value={3} primaryText="Khách" />
          <MenuItem value={4} primaryText="Supervisor" />
        </SelectField>
        <br />
        <br />
        <div style={{ marginLeft: 400 }}>
          <RaisedButton label="Thêm" primary style={{ marginRight: SPACE_BETWEEN, color: 'blue' }} />
          <RaisedButton label="Huỷ" />
        </div>
      </div>

    );
  }
}

export default withStyles(s)(CreateUser);
