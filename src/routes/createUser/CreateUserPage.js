import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import classNames from 'classnames';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import s from './CreateUserPage.scss';

const FONT_SIZE = 16;

const styles = {
  container: {
    marginLeft: 100,
    marginRight: 100,
    backgroundColor: '#fff',
    marginTop: 100,
  },
  wrapper: {
    marginLeft: 50,
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
      radioButtonValue: 'male',
      selectFieldvalue: 0,
      surnameErrorText: '',
      firstnameErrorText: '',
      emailErrorText: '',
      phoneErrorText: '',
    };
  }

  onChangeTextfieldSurname = (event) => {
    if (event.target.value === '') {
      this.setState({ surnameErrorText: 'Mục này không được phép để trống' });
    } else {
      this.setState({ surnameErrorText: '' });
    }
  }

  onChangeTextfieldFirstname = (event) => {
    if (event.target.value === '') {
      this.setState({ firstnameErrorText: 'Mục này không được phép để trống' });
    } else {
      this.setState({ firstnameErrorText: '' });
    }
  }
  onChangeTextfieldEmail= (event) => {
    if (this.isEmailInputValid(event.target.value)) {
      this.setState({ emailErrorText: '' });
    } else {
      this.setState({ emailErrorText: 'Email không hợp lệ' });
    }
  }
  onChangeTextfieldPhone= (event) => {
    if (this.isPhonenumberInputValid(event.target.value)) {
      this.setState({ phoneErrorText: '' });
    } else {
      this.setState({ phoneErrorText: 'Số điện thoại không hợp lệ' });
    }
  }
  handleSelectFieldChange = (event, selectFieldvalue) => {
    this.setState({ selectFieldvalue });
  };
  handleRadioButtonChange = (event) => {
    this.setState({ radioButtonValue: event.target.value });
  };

  isEmailInputValid=(EmailField) => {
    const emailReg = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
    if (emailReg.test(EmailField)) {
      return true;
    }
    return false;
  }

  isPhonenumberInputValid=(phonenumber) => {
    const phonenumberReg = /^[0-9-+]+$/;
    if (phonenumberReg.test(phonenumber)) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div style={styles.container}>
        <AppBar
          title="Thêm người dùng"
          iconElementLeft={<IconButton style={{ height: 0, width: 0 }}></IconButton>}
          style={{ zIndex: 1 }}
        />
        <div style={styles.wrapper}>
          <div className={classNames('grid')}>
            <div className={classNames('row')}>
              <div className={classNames('col-xs-6 col-sm-4 col-md-4')}>
                <TextField
                  id="surname"
                  floatingLabelText="Họ*"
                  floatingLabelStyle={{ fontSize: FONT_SIZE }}
                  errorText={this.state.surnameErrorText}
                  onChange={this.onChangeTextfieldSurname}
                />
              </div>
              <div className={classNames('col-xs-6 col-sm-4 col-md-4 col-md-offset-0.5')}>
                <TextField
                  id="firstname"
                  floatingLabelText="Tên*"
                  floatingLabelStyle={{ fontSize: FONT_SIZE }}
                  errorText={this.state.firstnameErrorText}
                  onChange={this.onChangeTextfieldFirstname}
                />
              </div>
            </div>
            {/* ------------------------------------- */}
            <div className={classNames('row')} style={{ marginTop: 20 }}>
              <div className={classNames('col-xs-3 col-sm-2 col-md-2')} >
                <p style={{ fontSize: FONT_SIZE }}>Giới tính*</p>
              </div>

              <div className={classNames('col-xs-6 col-sm-4 col-md-4 col-md-offset-0.1')} style={{ marginTop: 10 }}>
                <RadioButtonGroup name="shipSpeed" defaultSelected="male" valueSelected={this.state.radioButtonValue}>

                  <RadioButton
                    value="male"
                    label="Nam"
                    style={{ display: 'inline-block', width: '50px' }}
                    onClick={this.handleRadioButtonChange}
                  />
                  <RadioButton
                    value="female"
                    label="Nữ"
                    style={{ display: 'inline-block', width: '50px', marginLeft: '50px' }}
                    onClick={this.handleRadioButtonChange}
                  />
                </RadioButtonGroup>
              </div>
            </div>
            {/* ------------------------------------- */}
            <div className={classNames('row')} style={{ marginTop: 10 }}>
              <div className={classNames('col-xs-3 col-sm-2 col-md-2 bottom-xs')} style={{ marginTop: 5 }}>
                <p style={{ fontSize: FONT_SIZE }}>Ngày sinh*</p>
              </div>
              <div className={classNames('col-xs-6 col-sm-4 col-md-4 col-md-offset-0.1')} >
                <DatePicker hintText="Chọn ngày sinh" okLabel="Chọn" cancelLabel="Huỷ" />
              </div>
            </div>

            {/* ------------------------------------- */}
            <div className={classNames('row')}>
              <div className={classNames('col-xs-3 col-sm-2 col-md-2')}>
                <TextField
                  id="email"
                  floatingLabelText="Email*"
                  floatingLabelStyle={{ fontSize: FONT_SIZE }}
                  errorText={this.state.emailErrorText}
                  onChange={this.onChangeTextfieldEmail}
                />
              </div>
            </div>

            {/* ------------------------------------- */}
            <div className={classNames('row')}>
              <div className={classNames('col-xs-3 col-sm-2 col-md-2')}>
                <TextField
                  id="phonenumber"
                  floatingLabelText="Số điện thoại"
                  floatingLabelStyle={{ fontSize: FONT_SIZE }}
                  errorText={this.state.phoneErrorText}
                  onChange={this.onChangeTextfieldPhone}
                />
              </div>
            </div>
            {/* ------------------------------------- */}
            <div className={classNames('row')}>
              <div className={classNames('col-xs-3 col-sm-2 col-md-2')}>
                <TextField
                  id="address"
                  floatingLabelText="Địa chỉ"
                  floatingLabelStyle={{ fontSize: FONT_SIZE }}
                />
              </div>
            </div>
            <div className={classNames('row')}>
              <div className={classNames('col-xs-3 col-sm-2 col-md-2')}>
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
              </div>
            </div>
            <div className={classNames('row center-xs')} style={{ margin: 20 }}>
              <div className={classNames('col-xs-6 col-sm-4 col-md-4')}>
                <RaisedButton label="Thêm" primary style={{ marginRight: 20 }} />
                <RaisedButton label="Huỷ" />
              </div>
            </div>
            <p style={{ fontSize: 12 }}>* Thông tin bắt buộc</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(CreateUser);
