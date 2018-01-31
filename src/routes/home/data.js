import React from 'react';
import { cyan600, pink600, purple600 } from 'material-ui/styles/colors';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

const data = {
  newOrders: [
    { pv: 2400, v: 3400 },
    { pv: 1398, v: 2400 },
    { pv: 9800, v: 5800 },
    { pv: 3908, v: 7800 },
    { pv: 4800, v: 5500 },
    { pv: 3490, v: 3300 },
    { pv: 4300, v: 7700 },
  ],
  browserUsage: [
    { name: 'Khoa học tự nhiên', value: 800, color: cyan600, icon: <ExpandMore /> },
    { name: 'Khoa học xã hội', value: 300, color: pink600, icon: <ChevronRight /> },
    { name: 'Thiết bị khác', value: 300, color: purple600, icon: <ExpandLess /> },
  ],
};

export default data;
