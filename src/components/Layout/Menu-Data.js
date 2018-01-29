import React from 'react';
import HomeIcon from 'material-ui/svg-icons/action/home';
import Assessment from 'material-ui/svg-icons/action/assessment';
import GridOn from 'material-ui/svg-icons/image/grid-on';
import PermIdentity from 'material-ui/svg-icons/action/perm-identity';
import Web from 'material-ui/svg-icons/av/web';
import MapsAddLocation from 'material-ui/svg-icons/maps/add-location';
import MapsLayers from 'material-ui/svg-icons/maps/layers';
import ContentAddBox from 'material-ui/svg-icons/content/add-box';
import ActionBook from 'material-ui/svg-icons/action/book';
// import MapsMap from 'material-ui/svg-icons/maps/map';

const data = {
  menus: [
    {
      text: 'Quản trị hệ thống',
      icon: <HomeIcon />,
      link: '#',
      children: [
        { text: 'Cấu hình', icon: <ActionBook />, link: '/' },
        { text: 'Danh mục chung', icon: <GridOn />, link: '/managements/subjects' },
      ],
    },
    {
      text: 'Trang thiết bị',
      icon: <Assessment />,
      link: '#',
      children: [
        { text: 'Thêm mới thiết bị', icon: <MapsAddLocation />, link: '/locations/create' },
        { text: 'Danh sách thiết bị', icon: <MapsLayers />, link: '/locations' },
        { text: 'Thống kê thiết bị', icon: <MapsLayers />, link: '/locations' },
      ],
    },
    {
      text: 'Mượn - Trả',
      icon: <Web />,
      link: '#',
      children: [
        { text: 'Danh sách mượn - trả', icon: <GridOn />, link: '/buildings' },
        { text: 'Danh sách nhắc nhở', icon: <ContentAddBox />, link: '/buildings/create' },
      ],
    },
    {
      text: 'Người dùng',
      icon: <Assessment />,
      link: '#',
      children: [
        { text: 'Thêm mới', icon: <MapsAddLocation />, link: '/users/create' },
        { text: 'Danh sách người dùng', icon: <MapsLayers />, link: '/users' },
      ],
    },
    { text: 'Thông tin tài khoản', icon: <GridOn />, link: '/account', children: [] },
    { text: 'Đăng xuất', icon: <PermIdentity />, link: '/logout', children: [], isRedirect: true },
  ],
};

export default data;
