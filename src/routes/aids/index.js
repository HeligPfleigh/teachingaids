import React from 'react';
import ListAids from './ListAids';
import AddingAid from './AddingAid';
import ListDetailAids from './ListDetailAids';
import Layout from '../../components/Layout';
import { checkAuth } from '../../utils/auth.valid.util';

export default {
  path: '/equipments',
  async action({ store }) {
    const redirect = await checkAuth(store);
    if (redirect) return redirect;
  },
  children: [
    {
      path: '/',
      action() {
        return {
          title: 'Danh sách thiết bị',
          component: <Layout><ListAids /></Layout>,
        };
      },
    },
    {
      path: '/detail/:equipmentID',
      action({ params }) {
        return {
          title: 'Danh sách thiết bị',
          component: <Layout><ListDetailAids equipmentID={params.equipmentID} /></Layout>,
        };
      },
    },
    {
      path: '/create',
      action() {
        return {
          title: 'Thêm thiết bị',
          component: <Layout><AddingAid /></Layout>,
        };
      },
    },
  ],
};
