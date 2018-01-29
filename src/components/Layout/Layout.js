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
import isEmpty from 'lodash/isEmpty';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactTooltip from 'react-tooltip';

import themeDefault from './Material-Theme';
import Data from './Menu-Data';
import Header from '../Header';
import LeftDrawer from '../LeftDrawer';
import s from './Layout.scss';

const getCookie = (cname) => {
  let name = `${cname}=`;
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: true,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.myHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.myHandler);
  }

  myHandler = () => {
    const tokenClient = getCookie('id_token');
    if (isEmpty(tokenClient)) {
      location.href = '/logout';
    }
  }

  handleChangeRequestNavDrawer = () => {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
    });
  }

  render() {
    const { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 236;

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0,
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0,
      },
    };

    return (
      <MuiThemeProvider muiTheme={themeDefault}>
        <div>
          <Header
            styles={styles.header}
            handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer}
          />
          <LeftDrawer
            navDrawerOpen={navDrawerOpen}
            menus={Data.menus}
            username="User Admin"
          />
          <div style={styles.container}>
            {this.props.children}
          </div>
          <ReactTooltip />
        </div>
      </MuiThemeProvider>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(s)(Layout);
