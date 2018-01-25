/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import TextField from 'material-ui/TextField';
import { white, blue500 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SearchBox.scss';

const SearchBox = () => {
  const styles = {
    searchBox: {
      position: 'relative',
    },
    iconButton: {
      padding: 0,
      width: 0,
      height: 0,
      top: '17px',
      left: '5px',
      position: 'absolute',
    },
    textField: {
      color: white,
      backgroundColor: blue500,
      borderRadius: 2,
      height: 35,
      paddingLeft: 25,
    },
    inputStyle: {
      color: white,
      paddingLeft: 5,
    },
    hintStyle: {
      height: 16,
      paddingLeft: 5,
      color: white,
    },
  };

  return (
    <div style={styles.searchBox}>
      <IconButton style={styles.iconButton} >
        <Search color={white} />
      </IconButton>
      <TextField
        hintText="Tìm kiếm..."
        underlineShow={false}
        fullWidth
        style={styles.textField}
        inputStyle={styles.inputStyle}
        hintStyle={styles.hintStyle}
      />
    </div>
  );
};

export default withStyles(s)(SearchBox);
