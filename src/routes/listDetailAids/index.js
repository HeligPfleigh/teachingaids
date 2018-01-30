import React from 'react';
import ListDetailAids from './ListDetailAids'
import Layout from '../../components/Layout';
import { checkAuth } from '../../utils/auth.valid.util';

export default {
  path: '/equipments/detail/:equipmentID',
  action({ store, ...args }) {
    const redirect = checkAuth(store);
    if (redirect) return redirect;

    return {
      title: 'Thêm thiết bị',
      component: <Layout><ListDetailAids equipmentID={args.params.equipmentID}/></Layout>,
    };
  },

};