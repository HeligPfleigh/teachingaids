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

const Literal = props => (
  <span {...props}>{props.children}</span>
);

Literal.propTypes = {
  children: PropTypes.any,
};

export default Literal;
