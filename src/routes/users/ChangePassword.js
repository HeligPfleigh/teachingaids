import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { white } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import isEmpty from 'lodash/isEmpty';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { formValid, comparePassword } from '../../utils/form.validator.util';
import history from '../../core/history';
import themeDefault from '../../components/Layout/Material-Theme';
import Fragment from '../../data/fragment.utils';
import s from './ChangePassword.scss';

const styles = {
  loginContainer: {
    minWidth: 400,
    maxWidth: 600,
    height: 'auto',
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    margin: 'auto',
  },
  paper: {
    padding: 20,
    overflow: 'auto',
  },
  titleForm: {
    paddingBottom: 15,
    fontSize: '25px',
    color: '#00BCD4',
    textAlign: 'center',
  },
  errorForm: {
    paddingBottom: 10,
    fontSize: '14px',
    color: 'red',
    textAlign: 'center',
  },
  btnGroup: {
    paddingTop: 15,
  },
  loginBtn: {
    float: 'right',
  },
  btn: {
    background: '#4f81e9',
    color: white,
    padding: 7,
    borderRadius: 2,
    margin: 2,
    fontSize: 13,
  },
};

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPass: '',
      newpwdErrorText: '',
      confirmpwdErrorText: '',
      oldpwdErrorText: '',
      error: '',
      open: false,
    };
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const { oldPassword, newPassword, confirmPass } = this.state;
    if (oldPassword === '' || newPassword === '' || confirmPass === '') {
      if (oldPassword === '') {
        this.setState({
          oldpwdErrorText: 'Không được để trống',
        });
      }

      if (newPassword === '') {
        this.setState({
          newpwdErrorText: 'Không được để trống',
        });
      }

      if (confirmPass === '') {
        this.setState({
          confirmpwdErrorText: 'Không được để trống',
        });
      }
      return false;
    }

    this.setState({
      confirmpwdErrorText: comparePassword(newPassword, confirmPass),
    });

    this.props.changePassword({
      variables: { oldPassword, newPassword },
    }).then(({ data }) => {
      if (data && data.changeUserPassword && data.changeUserPassword.type === 'error') {
        this.setState({ error: data.changeUserPassword.status });
      } else {
        this.setState({ open: true });
      }
    });
  }

  handleChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    const collectionValidator = {
      oldPassword: strValue => this.setState({
        oldpwdErrorText: formValid.password(strValue),
        isDisabled: !isEmpty(formValid.password(strValue)),
      }),
      newPassword: strValue => this.setState({
        newpwdErrorText: formValid.password(strValue),
        isDisabled: !isEmpty(formValid.password(strValue)),
      }),
      confirmPass: strValue => this.setState({
        confirmpwdErrorText: formValid.password(strValue),
        isDisabled: !isEmpty(formValid.password(strValue)),
      }),
    };

    if (collectionValidator[event.target.name]) {
      collectionValidator[event.target.name](value);
    }

    this.setState({
      [event.target.name]: value,
    });
  }

  handleClose = () => {
    history.replace('/');
  };

  render() {
    const { newpwdErrorText, confirmpwdErrorText, oldpwdErrorText } = this.state;

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleClose}
      />,
    ];
    return (
      <MuiThemeProvider muiTheme={themeDefault}>
        <div style={styles.loginContainer}>
          <Paper style={styles.paper}>
            <div style={styles.titleForm}>Đổi mật khẩu</div>
            <form autoComplete="off" onSubmit={this.onSubmit}>
              <TextField
                name="oldPassword"
                autoFocus
                floatingLabelText={<span style={{ fontSize: 25 }}>Mật khẩu hiện tại</span>}
                fullWidth
                type="password"
                onChange={this.handleChange}
                onBlur={this.handleChange}
                errorText={oldpwdErrorText}
              />
              <TextField
                name="newPassword"
                floatingLabelText={<span style={{ fontSize: 25 }}>Mật khẩu mới</span>}
                fullWidth
                type="password"
                onChange={this.handleChange}
                onBlur={this.handleChange}
                errorText={newpwdErrorText}
              />
              <TextField
                name="confirmPass"
                floatingLabelText={<span style={{ fontSize: 25 }}>Xác nhận mật khẩu mới</span>}
                fullWidth
                type="password"
                onChange={this.handleChange}
                onBlur={this.handleChange}
                errorText={confirmpwdErrorText}
              />
              {this.state.error !== '' &&
                <div style={styles.errorForm}>{this.state.error}</div>
              }
              <div style={styles.btnGroup}>
                <RaisedButton
                  type="submit"
                  label="Xác nhận"
                  primary
                  style={styles.loginBtn}
                />
                <RaisedButton
                  onClick={() => history.replace('/')}
                  label="Nhắc tôi sau"
                  style={styles.loginBtn}
                />
              </div>
            </form>
            <Dialog
              title="Đổi mật khẩu thành công"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
          Nhấn Cancel để chuyển về trang chính.
        </Dialog>
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

ChangePassword.propTypes = {
  changePassword: PropTypes.func,
};

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

const ChangePasswordWithMutation = graphql(changePasswordQuery, { name: 'changePassword' })(ChangePassword);

export default withStyles(s)(ChangePasswordWithMutation);
