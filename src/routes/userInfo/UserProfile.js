import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import {
  required,
  longLength,
  password as passValid,
} from '../../utils/form.validator.util';
import { InputField, RadioGroupField } from '../../components/ReduxForm/index';

class UserProfile extends React.Component {

  cancel = () => {
    this.props.reset();
  }

  submit = (values) => {
    // this.props.changeUserEmail({
    //   variables: {
    //     password: values.password,
    //     email: values.newEmail,
    //   },
    // }).then(({ data }) => {
    //   const { changeUserEmail: { status, type } } = data;
    //   alert(status);
    //   if (type !== 'error') {
    //     this.props.refetch();
    //     this.cancel();
    //   }
    // }).catch(() => {
    //   alert('Thao tác đổi email thất bại...');
    // });
  }

  render() {
    const { pristine, submitting, handleSubmit, valid } = this.props;

    return (
      <div className="grid">
        <div className="row">
          <div className="col-xs-offset-1 col-xs-5">
            <Field
              fullWidth
              name="firstname"
              component={InputField}
              label="Họ của nhân viên"
              validate={[required, longLength]}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-offset-1 col-xs-5">
            <Field
              fullWidth
              name="lastname"
              component={InputField}
              label="Tên của nhân viên"
              validate={[required, longLength]}
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
              name="birthDay"
              component={InputField}
              label="Ngày sinh"
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
      </div>
    );
  }
}

UserProfile.propTypes = {
  valid: PropTypes.bool,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  reset: PropTypes.func,
  // changePassword: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
};

const UserProfileForm = reduxForm({
  form: 'UserProfileForm',
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
})(UserProfile);

// const changePasswordQuery = gql`
//   mutation changePassword($password: String!, $email: String!) {
//     changePassword(password: $password, email: $email) {
//       status
//       type
//       user {
//        ...UserView
//       }
//     }
//   }
//   ${Fragment.UserView}
// `;

export default compose(
  // graphql(changePasswordQuery, { name: 'changePassword' }),
)(UserProfileForm);
