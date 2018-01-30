import React from 'react';
import ListAids from './ListAids'
import Layout from '../../components/Layout';
import { checkAuth } from '../../utils/auth.valid.util';

export default {
  path: '/equipments',
  action({ store, ...args }) {

    const redirect = checkAuth(store);
    if (redirect) return redirect;

    return {
      title: 'Thêm thiết bị',
      component: <Layout><ListAids /></Layout>,
    };
  },

};