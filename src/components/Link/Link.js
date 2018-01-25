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
import history from '../../core/history';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node,
    onClick: PropTypes.func,
    isRedirect: PropTypes.bool,
  };

  static defaultProps = {
    onClick: null,
  };

  handleClick = (event) => {
    const { isRedirect, to, onClick } = this.props;
    if (onClick) {
      onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    if (isRedirect) {
      location.href = to;
    } else {
      history.push(to);
    }
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { to, children, isRedirect, ...props } = this.props;
    return <a href={to} {...props} onClick={this.handleClick}>{children}</a>;
  }
}

export default Link;
