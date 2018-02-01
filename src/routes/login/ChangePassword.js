import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { white } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import history from '../../core/history';
import themeDefault from '../../components/Layout/Material-Theme';

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
  render() {
    return (
      <MuiThemeProvider muiTheme={themeDefault}>
        <div style={styles.loginContainer}>
          <Paper style={styles.paper}>
            <div style={styles.titleForm}>Đổi mật khẩu lần đầu đăng nhập</div>
            <form autoComplete="off" onSubmit={this.onSubmit}>
              <TextField
                name="oldPass"
                autoFocus
                floatingLabelText={<span style={{ fontSize: 25 }}>Nhập mật khẩu cũ</span>}
                fullWidth
                type="password"
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              <TextField
                name="newPass"
                floatingLabelText={<span style={{ fontSize: 25 }}>Nhập mật khẩu mới</span>}
                fullWidth
                type="password"
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              <TextField
                name="confirmPass"
                floatingLabelText={<span style={{ fontSize: 25 }}>Xác nhận mật khẩu mới đã nhập</span>}
                fullWidth
                type="password"
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
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
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default ChangePassword;
