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
      path: '/histories',
      action() {
        return {
          title: 'Trang lịch sử mượn trả',
          component: <Layout><AidHistory /></Layout>,
        };
      },
    },
  ],

};