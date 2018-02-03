import React from 'react';
import HomeIcon from 'material-ui/svg-icons/action/home';
import GridOn from 'material-ui/svg-icons/image/grid-on';
import PermIdentity from 'material-ui/svg-icons/action/perm-identity';
import Web from 'material-ui/svg-icons/av/web';
import ActionBook from 'material-ui/svg-icons/action/book';
import ActionHistory from 'material-ui/svg-icons/action/history';
import SupervisorAccount from 'material-ui/svg-icons/action/supervisor-account';
import CardTravel from 'material-ui/svg-icons/action/card-travel';
import PowerSettings from 'material-ui/svg-icons/action/power-settings-new';
import Devices from 'material-ui/svg-icons/device/devices';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
import AccountBalance from 'material-ui/svg-icons/action/account-balance';
import { ROLES } from '../../constants';

const data = {
  menus: [
    {
      text: 'Màn hình chủ', icon: <HomeIcon />, link: '/',
    },
    {
      text: 'Quản trị hệ thống',
      icon: <CardTravel />,
      link: '#',
      children: [
        { text: 'Gới thiệu chung', icon: <ActionBook />, link: '/managements' },
        { text: 'Danh mục chung', icon: <GridOn />, link: '/managements/subjects' },
      ],
      roles: [ROLES.ADMINISTRATOR, ROLES.SUPERVISOR],
    },
    {
      text: 'Mượn - Trả',
      icon: <Web />,
      link: '#',
      children: [
        { text: 'Quản lý mượn - trả', icon: <AccountBalance />, link: '/aids' },
        // { text: 'Danh sách nhắc nhở', icon: <ContentAddBox />, link: '/aids/create' },
        { text: 'Lịch sử mượn trả', icon: <ActionHistory />, link: '/aids/histories' },
      ],
      roles: [ROLES.ADMINISTRATOR, ROLES.SUPERVISOR, ROLES.LIBRARY_MANAGER, ROLES.LIBRARY_EMPLOYEE],
    },
    {
      text: 'Trang thiết bị',
      icon: <Devices />,
      link: '#',
      children: [
        { text: 'Thêm mới thiết bị', icon: <NoteAdd />, link: '/equipments/create' },
        { text: 'Danh sách thiết bị', icon: <GridOn />, link: '/equipments' },
        // { text: 'Thống kê thiết bị', icon: <Assessment />, link: '/equipments/statistic' },
      ],
      roles: [ROLES.ADMINISTRATOR, ROLES.SUPERVISOR, ROLES.LIBRARY_MANAGER, ROLES.LIBRARY_EMPLOYEE],
    },
    {
      text: 'Người dùng',
      icon: <SupervisorAccount />,
      link: '#',
      children: [
        { text: 'Thêm mới', icon: <NoteAdd />, link: '/users/create' },
        { text: 'Danh sách người dùng', icon: <GridOn />, link: '/users' },
      ],
      roles: [ROLES.ADMINISTRATOR, ROLES.SUPERVISOR],
    },
    // {
    //   text: 'Lịch sử mượn trả', icon: <ActionHistory />, link: '/histories',
    // },
    {
      text: 'Thông tin tài khoản', icon: <PermIdentity />, link: '/account',
    },
    {
      text: 'Đăng xuất', icon: <PowerSettings />, link: '/logout', isRedirect: true,
    },
  ],
};

export default data;
