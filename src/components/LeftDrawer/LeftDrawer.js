import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import { spacing, typography } from 'material-ui/styles';
import { white, blue900 } from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
// import Avatar from 'material-ui/Avatar';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import { generate as generateKey } from 'shortid';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import intersection from 'lodash/intersection';

import Link from '../Link';
import Literal from '../Literal';

const styles = {
  logo: {
    cursor: 'pointer',
    fontSize: 22,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: blue900,
    textAlign: 'center',
    height: 56,
  },
  menuItem: {
    color: white,
    fontSize: 14,
  },
  avatar: {
    height: 57,
    div: {
      padding: '15px 0 20px 15px',
      height: 45,
    },
    icon: {
      float: 'left',
      display: 'block',
      marginRight: 15,
      boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)',
    },
    span: {
      paddingTop: 12,
      display: 'block',
      color: 'white',
      fontWeight: 300,
      textShadow: '1px 1px #444',
    },
  },
};

@connect(({ user }) => ({
  roles: (user && user.roles) || [],
}))
// Only support menu two level
class LeftDrawer extends Component {
  render() {
    const { navDrawerOpen, menus, roles } = this.props;

    return (
      <Drawer
        docked
        open={navDrawerOpen}
      >
        <div style={styles.logo}>
          THCS SƠN TÂY
        </div>
        { /* <div style={styles.avatar.div}>
        <Avatar
          src="http://www.material-ui.com/images/uxceo-128.jpg"
          size={50}
          style={styles.avatar.icon}
        />
        <span style={styles.avatar.span}>{props.username}</span>
      </div> */ }
        <div>
          {(menus || []).map((menu) => {
            if (isEmpty(menu.roles) || (intersection(roles, menu.roles).length > 0)) {
              if (menu.children && menu.children.length > 0) {
                return (<MenuItem
                  key={generateKey()}
                  style={styles.menuItem}
                  primaryText={menu.text}
                  leftIcon={menu.icon}
                  rightIcon={<ArrowDropRight />}
                  menuItems={menu.children.map(child =>
                    <MenuItem
                      key={generateKey()}
                      primaryText={child.text}
                      leftIcon={child.icon}
                      containerElement={
                        <Link to={child.link} isRedirect={child.isRedirect || false} />
                    }
                    />,
                )}
                  containerElement={<Literal />}
                />);
              }
              return (<MenuItem
                key={generateKey()}
                style={styles.menuItem}
                primaryText={menu.text}
                leftIcon={menu.icon}
                containerElement={<Link to={menu.link} isRedirect={menu.isRedirect || false} />}
              />);
            }
            return null;
          })}
        </div>
      </Drawer>
    );
  }
}

LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  menus: PropTypes.array,
  roles: PropTypes.array,
  // username: PropTypes.string,
};

export default LeftDrawer;
