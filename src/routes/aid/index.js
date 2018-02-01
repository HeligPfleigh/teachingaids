/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import AidHistory from './history/AidHistory';
import AidBorrow from './borrow/AidBorrow';
import Layout from '../../components/Layout';
import { checkAuth } from '../../utils/auth.valid.util';

export default {
  path: '/aids',
  async action({ store }) {
    const redirect = await checkAuth(store);
    if (redirect) return redirect;
  },
  children: [
    {
      path: '/',
      action() {
        return {
          title: 'Trang quản lý mượn trả thiết bị',
          component: <Layout>Trang quản lý mượn trả thiết bị</Layout>,
        };
      },
    },
    {
      path: '/borrow',
      action() {
        return {
          title: 'Trang quản lý muợn',
          component: <Layout><AidBorrow /></Layout>,
        };
      },
    },
    {
      path: '/histories',
      children: [
        {
          path: '/',
          action() {
            return {
              title: 'Trang lịch sử mượn trả',
              component: <Layout><AidHistory /></Layout>,
            };
          },
        },
      ],
    },
  ],

};
