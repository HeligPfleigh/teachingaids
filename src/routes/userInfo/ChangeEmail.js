import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { graphql, compose } from 'react-apollo';
import isEmpty from 'lodash/isEmpty';
import gql from 'graphql-tag';

import {
  required,
  longLength,
  email as emailValid,
  password as passValid,
} from '../../utils/form.validator.util';
import Fragment from '../../data/fragment.utils';
import { InputField } from '../../components/ReduxForm';
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
  const { newEmail, oldEmail } = fields;
  const fooBar = async () => {
    try {
      let result = {};
      if (newEmail !== oldEmail && await checkExistUserFunc(newEmail)) {
        result = { ...result, ...{ newEmail: 'Địa chỉ email đã tồn tại...' } };
      }

      return result;
    } catch (error) {
      return new Error(error);
    }
  };
  return fooBar().catch(() => ({ _error: 'Lỗi kết nối...' }));
};

class ChangeEmail extends React.Component {

  state = {
    isEdit: false,
  }

  compareValue = (value) => {
    const { oldEmail } = this.props;
    return value !== oldEmail ? undefined : 'hãy nhập một địa chỉ email mới của bạn';
  };

  cancel = () => {
    this.props.reset();
    this.setState({ isEdit: false });
  }

  submit = (values) => {
    this.props.changeUserEmail({
      variables: {
        password: values.password,
        email: values.newEmail,
      },
    }).then(({ data }) => {
      const { changeUserEmail: { status, type } } = data;
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
    const { pristine, submitting, handleSubmit, valid } = this.props;

    return (
      <div className="grid">
        <div className="row">
          <div className="col-xs-offset-1 col-xs-5">
            <Field
              fullWidth
              name="newEmail"
              component={InputField}
              label="Địa chỉ mail"
              disabled={!isEdit}
              validate={[required, longLength, emailValid, this.compareValue]}
            />
          </div>
        </div>
        { isEdit && <div className="row">
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
        </div> }
        <div className="row end-xs">
          <div className="col-xs-offset-1 col-xs-5">
            { !isEdit && <RaisedButton
              primary
              label="Thay đổi thông tin"
              style={{ marginRight: '10px' }}
              onTouchTap={() => this.setState({ isEdit: true })}
            />}

            { isEdit && <RaisedButton
              label="Hủy"
              secondary
              disabled={submitting}
              onTouchTap={this.cancel}
              style={{ marginRight: '10px' }}
            />}

            { isEdit && <RaisedButton
              primary
              label="Cập nhật"
              onTouchTap={handleSubmit(this.submit)}
              disabled={!valid || pristine || submitting}
            />}
          </div>
          <div className="col-xs-offset-6" />
        </div>
      </div>
    );
  }
}

ChangeEmail.propTypes = {
  valid: PropTypes.bool,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  oldEmail: PropTypes.string,
  refetch: PropTypes.func,
  reset: PropTypes.func.isRequired,
  changeUserEmail: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
};

const selector = formValueSelector('ChangeEmailForm');
const ChangeEmailForm = reduxForm({
  form: 'ChangeEmailForm',
  asyncValidate,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  asyncBlurFields: ['newEmail'],
})(ChangeEmail);

const changeUserEmailQuery = gql`
  mutation changeUserEmail($password: String!, $email: String!) {
    changeUserEmail(password: $password, email: $email) {
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
    oldEmail: selector(state, 'oldEmail'),
  })),
  graphql(changeUserEmailQuery, { name: 'changeUserEmail' }),
)(ChangeEmailForm);
