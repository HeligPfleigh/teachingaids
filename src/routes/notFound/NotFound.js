/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { red500 } from 'material-ui/styles/colors';

import history from '../../core/history';
import s from './NotFound.scss';

const style = {
  width: '100%',
  padding: '15px 20px',
  display: 'inline-block',
  textAlign: 'center',
  color: red500,
};

class NotFound extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <Paper style={style} zDepth={1}>
        <h1>{this.props.title}</h1>
        <h2>Rất tiếc! Bạn không có quyền truy cập địa chỉ này.</h2>
        <h3>Vui lòng liên hệ Ban quản để biết thêm thông tin</h3>
        <h3>Xin chân thành cảm ơn</h3>
        <FlatButton
          secondary
          label="Về trang chủ"
          keyboardFocused
          onTouchTap={() => history.push('/')}
        />
      </Paper>
    );
  }
}

export default withStyles(s)(NotFound);
