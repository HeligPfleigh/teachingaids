/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Login from './Login';

const title = 'Đăng nhập hệ thống';
export default {
  path: '/login',

  children: [
    {
      path: '/',
      action({ store }) {
        const state = store.getState();
        if (state.user) {
          return { redirect: '/' };
        }
        return {
          title,
          component: <Login title={title} />,
        };
      },
    },
  ],
};
