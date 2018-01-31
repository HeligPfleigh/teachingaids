/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import BorrowReturn from './borrowReturn.js';
import Borrow from './borrow.js';
import Returning from './return.js';

import Layout from '../../components/Layout';
import { checkAuth } from '../../utils/auth.valid.util';

export default {
  path: '/buildings',
  children: [
    {
      path:'/',
      action({ store }) {
        const redirect = checkAuth(store);
        if (redirect) return redirect;
        return {
          title: 'danh sach muon - tra',
          component: <Layout><BorrowReturn/></Layout>,
        };
      }
    },
    {
      path: '/borrow',
      action({ store }) {
        const redirect = checkAuth(store);
        if (redirect) return redirect;
        return {
          title: 'danh sach muon - tra',
          component: <Layout><Borrow/></Layout>,
        };
      }
    },
    {
      path: '/return',
      action({ store }) {
        const redirect = checkAuth(store);
        if (redirect) return redirect;
        return {
          title: 'danh sach muon - tra',
          component: <Layout><Returning/></Layout>,
        };
      }
    }
    
  ]
  

};
