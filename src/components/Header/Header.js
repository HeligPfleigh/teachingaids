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
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import { white } from 'material-ui/styles/colors';
import SearchBox from '../SearchBox';

import s from './Header.scss';

class Header extends React.Component {

  _logout = () => {
    location.href = '/logout';
  }

  render() {
    const { styles, handleChangeRequestNavDrawer } = this.props;

    const style = {
      appBar: {
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        maxHeight: 57,
      },
      titleStyle: {
        lineHeight: 2,
      },
      menuButton: {
        marginLeft: 10,
      },
    };

    return (
      <div>
        <AppBar
          titleStyle={style.titleStyle}
          style={{ ...styles, ...style.appBar }}
          iconElementLeft={
            <IconButton style={style.menuButton} onTouchTap={handleChangeRequestNavDrawer}>
              <Menu color={white} />
            </IconButton>
          }
          title={
            <SearchBox />
          }
        />
      </div>
    );
  }
}

Header.propTypes = {
  styles: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func,
};

export default withStyles(s)(Header);
