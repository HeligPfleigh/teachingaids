import React from 'react';
import AddingAid from './AddingAid'
import Layout from '../../components/Layout';
import { checkAuth } from '../../utils/auth.valid.util';

export default {
  path: '/equipments/create',
  action({ store, ...args }) {

    const redirect = checkAuth(store);
    if (redirect) return redirect;

    return {
      title: 'Thêm thiết bị',
      component: <Layout><AddingAid /></Layout>,
    };
  },

};