/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';
import { checkAuth } from '../../utils/auth.valid.util';
import { ROLES } from '../../constants';

const pageRoles = [ROLES.ADMINISTRATOR, ROLES.SUPERVISOR];

export default {
  path: '/managements',
  async action({ store }) {
    const redirect = await checkAuth(store, pageRoles);
    if (redirect) return redirect;
  },
  children: [
    {
      path: '/subjects',
      action() {
        return {
          title: 'Trang quản lý danh mục chung',
          component: <Layout><Home /></Layout>,
        };
      },
    },
  ],

};
