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
import ActionHistory from 'material-ui/svg-icons/action/history';
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
        { text: 'Thông tin chung', icon: <ActionBook />, link: '/' },
        { text: 'Danh mục chung', icon: <GridOn />, link: '/managements/subjects' },
      ],
    },
    {
      text: 'Mượn - Trả',
      icon: <Web />,
      link: '#',
      children: [
        { text: 'Danh sách mượn - trả', icon: <GridOn />, link: '/aids' },
        { text: 'Danh sách nhắc nhở', icon: <ContentAddBox />, link: '/aids/create' },
        { text: 'Lịch sử mượn trả', icon: <ActionHistory />, link: '/aids/histories' },
      ],
    },
    {
      text: 'Trang thiết bị',
      icon: <Assessment />,
      link: '#',
      children: [
        { text: 'Danh sách thiết bị', icon: <MapsLayers />, link: '/equipments' },
        { text: 'Thêm mới thiết bị', icon: <MapsAddLocation />, link: '/equipments/create' },
        { text: 'Thống kê thiết bị', icon: <MapsLayers />, link: '/equipments/statistic' },
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
    { text: 'Lịch sử mượn trả', icon: <ActionHistory />, link: '/histories', children: [] },
    { text: 'Thông tin tài khoản', icon: <GridOn />, link: '/account', children: [] },
    { text: 'Đăng xuất', icon: <PermIdentity />, link: '/logout', children: [], isRedirect: true },
  ],
};

export default data;
