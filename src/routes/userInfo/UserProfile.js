import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

import {
  required,
  longLength,
  password as passValid,
} from '../../utils/form.validator.util';
import {
  InputField,
  RadioGroupField,
  DatePickerField,
} from '../../components/ReduxForm/index';
import Fragment from '../../data/fragment.utils';
import createApolloClient from '../../core/createApolloClient/createApolloClient.client';

const apolloClient = createApolloClient();

const checkExistUserQuery = gql`
  query checkExistUser($query: String!) {
    checkExistUser(query: $query)
  }
`;

const checkExistUserFunc = async (query) => {
  if (!isEmpty(query)) {
    try {
      const {
        data: { checkExistUser: result },
      } = await apolloClient.query({
        query: checkExistUserQuery,
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
  const { phone, oldPhone } = fields;
  const fooBar = async () => {
    try {
      let result = {};
      if (phone !== oldPhone && await checkExistUserFunc(phone)) {
        result = { ...result, ...{ phone: 'Số điện thoại đã tồn tại...' } };
      }

      return result;
    } catch (error) {
      return new Error(error);
    }
  };
  return fooBar().catch(() => ({ _error: 'Lỗi kết nối...' }));
};

class UserProfile extends React.Component {

  state = {
    isEdit: false,
  }

  cancel = () => {
    this.props.reset();
    this.setState({ isEdit: false });
  }

  submit = (values) => {
    const { password, firstName, lastName, gender, phone, birthDay, address } = values;
    this.props.changeUserProfile({
      variables: {
        password,
        profile: {
          firstName,
          lastName,
          gender,
          birthDay,
          phone,
          address,
        },
      },
    }).then(({ data }) => {
      const { changeUserProfile: { status, type } } = data;
      alert(status);
      if (type !== 'error') {
        this.props.refetch();
        this.cancel();
      }
    }).catch(() => {
      alert('Thao tác đổi email thất bại...');
    });
  }

  render() {
    const { isEdit } = this.state;
    const { pristine, submitting, handleSubmit, valid, initialValues } = this.props;
    const cssDivBottom = {
      marginBottom: '30px',
    };

    return (
      <div className="grid">
        { !isEdit && <span style={{ padding: '20px' }}>
          <div className="row" style={cssDivBottom}>
            <div className="col-xs-offset-1 col-xs-1">Họ và tên:</div>
            <div className="col-xs-5">
              <strong>{`${initialValues.firstName} ${initialValues.lastName}`}</strong>
            </div>
          </div>

          <div className="row" style={cssDivBottom}>
            <div className="col-xs-offset-1 col-xs-1">Giới tính:</div>
            <div className="col-xs-5">
              <strong>{`${initialValues.gender ? 'Nam' : 'Nữ'}`}</strong>
            </div>
          </div>

          <div className="row" style={cssDivBottom}>
            <div className="col-xs-offset-1 col-xs-1">Ngày sinh:</div>
            <div className="col-xs-5">
              <strong>{`${moment(initialValues.birthDay).format('DD / MM / YYYY')}`}</strong>
            </div>
          </div>

          <div className="row" style={cssDivBottom}>
            <div className="col-xs-offset-1 col-xs-1">Số ĐT:</div>
            <div className="col-xs-5">
              <strong>{`${initialValues.phone || 'chưa có thông tin'}`}</strong>
            </div>
          </div>

          <div className="row" style={cssDivBottom}>
            <div className="col-xs-offset-1 col-xs-1">Địa chỉ:</div>
            <div className="col-xs-5">
              <strong>{`${initialValues.address || 'chưa có thông tin'}`}</strong>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-offset-1 col-xs-1">&nbsp;</div>
            <div className="col-xs-5">
              <RaisedButton
                primary
                label="Thay đổi"
                style={{ marginRight: '10px' }}
                onTouchTap={() => this.setState({ isEdit: true })}
              />
            </div>
          </div>
        </span> }

        { isEdit && <span>
          <div className="row">
            <div className="col-xs-offset-1 col-xs-5">
              <Field
                fullWidth
                name="firstName"
                component={InputField}
                label="Họ của nhân viên"
                validate={[required]}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-offset-1 col-xs-5">
              <Field
                fullWidth
                name="lastName"
                component={InputField}
                label="Tên của nhân viên"
                validate={[required]}
              />
            </div>
          </div>

          <div className="row" style={{ marginTop: '15px' }}>
            <div className="col-xs-offset-1 col-xs-5">
              <div style={{ marginBottom: '10px' }}>Giới tính</div>
              <div style={{ marginLeft: '25px' }}>
                <Field
                  fullWidth
                  name="gender"
                  component={RadioGroupField}
                  label="Giới tính"
                  options={[
                    { value: true, label: 'Nam' },
                    { value: false, label: 'Nữ' },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-offset-1 col-xs-5">
              <Field
                name="birthDay"
                component={DatePickerField}
                label="Ngày sinh"
                validate={[required]}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-offset-1 col-xs-5">
              <Field
                fullWidth
                name="phone"
                component={InputField}
                label="Số điện thoại"
                validate={[required, longLength]}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-offset-1 col-xs-5">
              <Field
                fullWidth
                name="address"
                component={InputField}
                label="Địa chỉ"
                validate={[required, longLength]}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-offset-1 col-xs-5">
              <Field
                fullWidth
                name="password"
                type="password"
                component={InputField}
                label="Mật khẩu hiện tại"
                validate={[required, longLength, passValid]}
              />
            </div>
          </div>

          <div className="row end-xs">
            <div className="col-xs-offset-1 col-xs-5">
              <RaisedButton
                label="Hủy"
                secondary
                disabled={submitting}
                onTouchTap={this.cancel}
                style={{ marginRight: '10px' }}
              />
              <RaisedButton
                primary
                label="Cập nhật"
                onTouchTap={handleSubmit(this.submit)}
                disabled={!valid || pristine || submitting}
              />
            </div>
            <div className="col-xs-offset-6" />
          </div>
        </span> }
      </div>
    );
  }
}

UserProfile.propTypes = {
  valid: PropTypes.bool,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  reset: PropTypes.func,
  refetch: PropTypes.func,
  initialValues: PropTypes.any,
  changeUserProfile: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
};

const UserProfileForm = reduxForm({
  form: 'UserProfileForm',
  asyncValidate,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  asyncBlurFields: ['phone'],
})(UserProfile);

const changeUserProfileQuery = gql`
  mutation changeUserProfile ($password: String!, $profile: ProfileInput!) {
    changeUserProfile (password: $password, profile: $profile) {
      status
      type
      user {
       ...UserView
      }
    }
  }
  ${Fragment.UserView}
`;

export default compose(
  graphql(changeUserProfileQuery, { name: 'changeUserProfile' }),
)(UserProfileForm);
