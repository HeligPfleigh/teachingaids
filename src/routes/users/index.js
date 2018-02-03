import React from 'react';
import Users from './Users';
import CreateUser from './CreateUser';
import Layout from '../../components/Layout';
import ChangePassword from './ChangePassword';
import { checkAuth } from '../../utils/auth.valid.util';
import { ROLES } from '../../constants';

const pageRoles = [ROLES.ADMINISTRATOR, ROLES.SUPERVISOR];

export default {
  path: '/users',
  async action({ store }) {
    const redirect = await checkAuth(store, pageRoles);
    if (redirect) return redirect;
  },
  children: [
    {
      path: '/',
      action() {
        return {
          title: 'Quản lý người dùng',
          component: <Layout><Users /></Layout>,
        };
      },
    },
    {
      path: '/create',
      action() {
        return {
          title: 'Thêm người dùng mới',
          component: <Layout><CreateUser /></Layout>,
        };
      },
    },
    {
      path: '/changepassword',
      action() {
        return {
          title: 'Thêm người dùng mới',
          component: <ChangePassword />,
        };
      },
    },
  ],
};
