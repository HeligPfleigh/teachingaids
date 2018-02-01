/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import CreateUser from './CreateUser';
import Layout from '../../components/Layout';
import { checkAuth } from '../../utils/auth.valid.util';

export default {
  path: '/users/create',
  action({ store }) {
    const redirect = checkAuth(store);
    if (redirect) return redirect;

    return {
      title: 'Thêm người dùng',
      component: <Layout><CreateUser /></Layout>,
    };
  },

};
