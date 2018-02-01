/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { white } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import isEmpty from 'lodash/isEmpty';

import themeDefault from '../../components/Layout/Material-Theme';
// import history from '../../core/history';
import { formValid } from '../../utils/form.validator.util';
import s from './Login.scss';

const styles = {
  loginContainer: {
    minWidth: 320,
    maxWidth: 400,
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
    color: 'black',
    textAlign: 'center',
    float: 'left',
  },
  errorForm: {
    paddingBottom: 10,
    fontSize: '14px',
    color: 'red',
    textAlign: 'center',
  },
  btnGroup: {
    paddingTop: 15,
    marginTop: 15,
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

class Login extends Component {
  state = {
    username: '',
    password: '',
    nameErrorText: '',
    pwdErrorText: '',
    error: false,
    isDisabled: true,
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    if (username === '' || password === '') {
      if (username === '') {
        this.setState({
          nameErrorText: 'Không được để trống',
        });
      }

      if (password === '') {
        this.setState({
          pwdErrorText: 'Không được để trống',
        });
      }
      return false;
    }

    fetch('/login', {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      credentials: 'same-origin',
      method: 'post',
      body: JSON.stringify({ username, password }),
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      location.href = '/';
    }).catch(() => {
      this.setState({
        error: true,
      });
    });
    return false;
  };

  handleChange = (event) => {
    const value = event.target.value;
    const collectionValidator = {
      username: strValue => this.setState({
        nameErrorText: formValid.username(strValue),
        isDisabled: !isEmpty(formValid.username(strValue)),
      }),
      password: strValue => this.setState({
        pwdErrorText: formValid.password(strValue),
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

  render() {
    const { nameErrorText, pwdErrorText, isDisabled } = this.state;

    return (
      <MuiThemeProvider muiTheme={themeDefault}>
        <div style={styles.loginContainer}>
          <Paper style={styles.paper}>
            <div className="wrapper">
              <image src="logo_truonghoc.png" />
            </div>
            <div style={styles.titleForm}>Đăng nhập</div>
            {this.state.error === true &&
              <div style={styles.errorForm}>Sai tên đăng nhập hoặc mật khẩu</div>
            }
            <form autoComplete="off" onSubmit={this.onSubmit}>
              <TextField
                className="form"
                name="username"
                autoFocus
                hintText="Tên đăng nhập"
                fullWidth
                errorText={nameErrorText}
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              <TextField
                className="form"
                name="password"
                autoFocus
                hintText="Mật khẩu"
                fullWidth
                type="password"
                errorText={pwdErrorText}
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              <div style={styles.btnGroup}>
                <RaisedButton
                  type="submit"
                  label="Đăng nhập"
                  primary
                  disabled={isDisabled}
                  style={styles.loginBtn}
                />
              </div>
            </form>
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(Login);
