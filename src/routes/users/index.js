/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Users from './Users';
import Layout from '../../components/Layout';
import { checkAuth } from '../../utils/auth.valid.util';

export default {
  path: '/users',
  action({ store, ...args }) {
    // console.log('user router');
    // console.log({
    //   store,
    //   ...args,
    // });

    const redirect = checkAuth(store);
    if (redirect) return redirect;

    return {
      title: 'Quản lý người dùng',
      component: <Layout><Users /></Layout>,
    };
  },

};
