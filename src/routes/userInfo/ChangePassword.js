import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import {
  required,
  longLength,
  comparePassword,
  password as passValid,
} from '../../utils/form.validator.util';
import Fragment from '../../data/fragment.utils';
import { InputField } from '../../components/ReduxForm';

class ChangePassword extends React.Component {

  compareValue = (value) => {
    const { tempPassword } = this.props;
    return comparePassword(tempPassword, value);
  };

  cancel = () => {
    this.props.reset();
  }

  submit = (values) => {
    const { oldPassword, newPassword } = values;
    this.props.changePassword({
      variables: { oldPassword, newPassword },
    }).then(({ data }) => {
      const { changeUserPassword: { status, type } } = data;
      alert(status);
      if (type !== 'error') {
        this.cancel();
      }
    }).catch(() => {
      alert('Thao tác đổi mật khẩu thất bại...');
    });
  }

  render() {
    const { pristine, submitting, handleSubmit, valid } = this.props;

    return (
      <div className="grid">
        <div className="row">
          <div className="col-xs-offset-1 col-xs-5">
            <Field
              fullWidth
              type="password"
              name="oldPassword"
              component={InputField}
              label="Mật khẩu hiện tại"
              validate={[required, longLength]}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-offset-1 col-xs-5">
            <Field
              fullWidth
              type="password"
              name="tempPassword"
              component={InputField}
              label="Mật khẩu mới"
              validate={[required, longLength, passValid]}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-offset-1 col-xs-5">
            <Field
              fullWidth
              type="password"
              name="newPassword"
              component={InputField}
              label="Nhập lại mật khẩu mới"
              validate={[required, longLength, passValid, this.compareValue]}
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

ChangePassword.propTypes = {
  valid: PropTypes.bool,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  tempPassword: PropTypes.string,
  reset: PropTypes.func.isRequired,
  changePassword: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
};

const selector = formValueSelector('ChangePasswordForm');
const ChangePasswordForm = reduxForm({
  form: 'ChangePasswordForm',
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
})(ChangePassword);

const changePasswordQuery = gql`
  mutation changeUserPassword($oldPassword: String!, $newPassword: String!) {
    changeUserPassword(oldPassword: $oldPassword, newPassword: $newPassword) {
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
  connect(state => ({
    tempPassword: selector(state, 'tempPassword'),
  })),
  graphql(changePasswordQuery, { name: 'changePassword' }),
)(ChangePasswordForm);

