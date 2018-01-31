import React from 'react';
import Assessment from 'material-ui/svg-icons/action/assessment';
import Face from 'material-ui/svg-icons/action/face';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import { typography } from 'material-ui/styles';
import { grey600, cyan600, pink600, purple600, orange600 } from 'material-ui/styles/colors';

import InfoBox from './dashboard/InfoBox';
import NewOrders from './dashboard/NewOrders';
import BrowserUsage from './dashboard/BrowserUsage';
import Data from './data';

const styles = {
  navigation: {
    fontSize: 15,
    fontWeight: typography.fontWeightLight,
    color: grey600,
    paddingBottom: 15,
    display: 'block',
  },
  title: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    marginBottom: 20,
  },
  paper: {
    padding: 30,
  },
  clear: {
    clear: 'both',
  },
};

const DashboardPage = () => (
  <div>
    <h3 style={styles.navigation}>Trang chủ / Màn hình chính</h3>

    <div className="row">
      <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
        <InfoBox
          Icon={ShoppingCart}
          color={pink600}
          title="Tổng số thiết bị"
          value="1500k"
        />
      </div>


      <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
        <InfoBox
          Icon={ThumbUp}
          color={cyan600}
          title="Số thiết bị được mượn"
          value="4231"
        />
      </div>

      <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
        <InfoBox
          Icon={Assessment}
          color={purple600}
          title="Số lần mượn"
          value="460"
        />
      </div>

      <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
        <InfoBox
          Icon={Face}
          color={orange600}
          title="Số thành viên"
          value="248"
        />
      </div>
    </div>

    <div className="row">&nbsp;</div>

    <div className="row">
      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
        <NewOrders data={Data.newOrders} />
      </div>

      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15">
        <BrowserUsage data={Data.browserUsage} />
      </div>
    </div>
  </div>
);

export default DashboardPage;
