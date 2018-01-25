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
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class Modal extends React.Component {
  static propTypes = {
    title: PropTypes.any,
    children: PropTypes.node,
    isOpen: PropTypes.bool,
    modalClose: PropTypes.func,
    actions: PropTypes.arrayOf(
      PropTypes.node,
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      open: this.props.isOpen,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.state.open) {
      this.setState({ open: nextProps.isOpen });
    }
  }

  handleClose = () => {
    this.setState({ open: false });
    const { modalClose } = this.props;
    if (modalClose) {
      modalClose();
    }
  };

  render() {
    const { title, children, actions } = this.props;
    const acts = actions || [
      <FlatButton
        label="Đóng cửa sổ"
        secondary
        keyboardFocused
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title={title}
          actions={acts}
          modal
          open={this.state.open || false}
        >
          { children }
        </Dialog>
      </div>
    );
  }
}

export default Modal;
