import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
import isEmpty from 'lodash/isEmpty';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import classNames from 'classnames';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { Field, reduxForm } from 'redux-form';
import { InputField, RadioGroupField, SelectField } from '../../components/ReduxForm';
import { required, longLength, email as emailValid, phoneNumber } from '../../utils/form.validator.util';
import { checkUserExist, addUserMutation } from './graphql';
import createApolloClient from '../../core/createApolloClient/createApolloClient.client';


import s from './CreateUser.scss';

const FONT_SIZE = 16;

let DateTimeFormat;
if (areIntlLocalesSupported(['vi', 'vi-VN'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/vi');
  require('intl/locale-data/jsonp/vi-VN');
}

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

const apolloClient = createApolloClient();

const checkUserExistFunc = async (query) => {
  if (!isEmpty(query)) {
    try {
      const {
        data: { checkUserExist: result },
      } = await apolloClient.query({
        query: checkUserExist,
        variables: { query },
      });
      return result;
    } catch (error) {
      return false;
    }
  }
  return false;
};

const asyncValidate = (fields) => {
  const { phonenumber, email } = fields;
  const fooBar = async () => {
    try {
      let result = {};
      if (await checkUserExistFunc(phonenumber)) {
        result = { ...result, ...{ phonenumber: 'Người dùng đã tồn tại...' } };
      }
      if (await checkUserExistFunc(email)) {
        result = { ...result, ...{ email: 'Người dùng đã tồn tại...' } };
      }
      return result;
    } catch (error) {
      return new Error(error);
    }
  };
  return fooBar().catch(() => ({ _error: 'Lỗi kết nối...' }));
};


class CreateUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      radioButtonValue: 'male',
      selectFieldvalue: 0,
      lastnameErrorText: '',
      firstnameErrorText: '',
      emailErrorText: '',
      phoneErrorText: '',
    };
  }


  handleSelectFieldChange = (event, selectFieldvalue) => {
    this.setState({ selectFieldvalue });
  };
  handleRadioButtonChange = (event) => {
    this.setState({ radioButtonValue: event.target.value });
  };

  usernameGenerate = async (username) => {
    if (await checkUserExistFunc(username)) {
      let rdm = 1 + Math.floor((Math.random() * 9));
      username = `${username}.${rdm}`;
      this.usernameGenerate(username);
    } else { return username; }
    return username;
  }


  buttonsGenerate = ({ pristine, submitting, handleSubmit, valid }) => [
    <RaisedButton
      label="Hủy cập nhật"
      secondary
      disabled={submitting}
      onTouchTap={this.handleClose}
      style={{ marginRight: '10px' }}
    />,
    <RaisedButton
      primary
      label="Cập nhật"
      onTouchTap={handleSubmit(this.handleSubmit)}
      disabled={!valid || pristine || submitting}
    />,
  ];

  handleSubmit = async (values) => {
    const { email, firstName, phone, lastName, gender } = values;
    const profile = { firstName, lastName, gender, phone };
    let username = `${firstName}.${lastName}`;
    const password = '123456789';
    username = await this.usernameGenerate(username);
    const user = { email: { address: email }, username, password, profile };

    this.props.addUser({
      variables: { user },
    }).then(({ data }) => {
      const { CreateUser: { query } } = data;
      alert(`Thêm mới thành công ${query}`);
      this.props.refetch();
      this.handleClose();
    }).catch(() => {
      alert('Thao tác thêm mới thất bại...');
    });
  }
  render() {
    // console.log('adduser', this.props.addUser);
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
                <Field
                  name="lastName"
                  label="Họ*"
                  component={InputField}
                  validate={[required]}
                />
              </div>
              <div className={classNames('col-xs-6 col-sm-4 col-md-4 col-md-offset-0.5')}>
                <Field
                  name="firstName"
                  label="Tên*"
                  component={InputField}
                  validate={[required]}
                />
              </div>
            </div>
            {/* ------------------------------------- */}
            <div className={classNames('row')} style={{ marginTop: 20 }}>
              <div className={classNames('col-xs-3 col-sm-2 col-md-2')} >
                <p style={{ fontSize: FONT_SIZE }}>Giới tính*</p>
              </div>

              <div className={classNames('col-xs-6 col-sm-4 col-md-4 col-md-offset-0.1')} style={{ marginTop: 10 }}>
                {/* <RadioButtonGroup name="shipSpeed" defaultSelected="male" valueSelected={this.state.radioButtonValue}> */}
                <Field
                  fullWidth
                  name="gender"
                  component={RadioGroupField}
                  options={[
                  { value: true, label: 'Nam' },
                  { value: false, label: 'Nữ' },
                  ]}
                />

                {/* </RadioButtonGroup> */}
              </div>
            </div>
            {/* ------------------------------------- */}
            <div className={classNames('row')} style={{ marginTop: 10 }}>
              <div className={classNames('col-xs-3 col-sm-2 col-md-2 bottom-xs')} style={{ marginTop: 5 }}>
                <p style={{ fontSize: FONT_SIZE }}>Ngày sinh*</p>
              </div>
              <div className={classNames('col-xs-6 col-sm-4 col-md-4 col-md-offset-0.1')} >
                <DatePicker
                  DateTimeFormat={DateTimeFormat}
                  locale="vi"
                  hintText="Chọn ngày sinh"
                  okLabel="Chọn"
                  cancelLabel="Huỷ"
                />
                {/* <DatePicker hintText="Chọn ngày sinh" okLabel="Chọn" cancelLabel="Huỷ" /> */}
              </div>
            </div>

            {/* ------------------------------------- */}
            <div className={classNames('row')}>
              <div className={classNames('col-xs-3 col-sm-2 col-md-2')}>
                <Field
                  name="email"
                  label="Email*"
                  component={InputField}
                  validate={[required, emailValid]}
                />
              </div>
            </div>

            {/* ------------------------------------- */}
            <div className={classNames('row')}>
              <div className={classNames('col-xs-4 col-sm-3 col-md-3')}>
                <Field
                  name="phone"
                  label="Số điện thoại*"
                  component={InputField}
                  validate={[required, longLength, phoneNumber]}
                />
              </div>
            </div>
            {/* ------------------------------------- */}
            <div className={classNames('row')}>
              <div className={classNames('col-xs-3 col-sm-2 col-md-2')}>
                <Field
                  multiLine
                  name="address"
                  label="Địa chỉ"
                  component={InputField}
                />
              </div>
            </div>
            <div className={classNames('row')}>
              <div className={classNames('col-xs-3 col-sm-2 col-md-2')}>
                <Field
                  name="roles"
                  value={this.state.selectFieldvalue}
                  component={SelectField}
                  onChange={this.handleSelectFieldChange}
                  options={[
                    { value: 'admin', label: 'Admin' },
                    { value: 'manager', label: 'Quản lý' },
                    { value: 'employee', label: 'Nhân viên' },
                    { value: 'teacher', label: 'Khách' },
                    { value: 'supervisor', label: 'Supervisor' },
                  ]}
                />
              </div>
            </div>
            <div className={classNames('row center-xs')} style={{ margin: 20 }}>
              <div className={classNames('col-xs-6 col-sm-5 col-md-5')}>
                {this.buttonsGenerate((this.props))}
              </div>
            </div>
            <p style={{ fontSize: 12 }}>* Thông tin bắt buộc</p>
          </div>
        </div>
      </div>
    );
  }
}

CreateUser.propTypes = {
  addUser: PropTypes.any,
  refetch: PropTypes.func,
};

const AddUserForm = reduxForm({
  form: 'AddUserForm',
  asyncValidate,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  asyncBlurFields: ['phone', 'email'],
})(compose(
  withStyles(s),
  graphql(addUserMutation, { name: 'addUser' }),
)(CreateUser));

export default AddUserForm;
