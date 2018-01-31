import React from 'react';
import classNames from 'classnames';
import { typography } from 'material-ui/styles';
import { grey600 } from 'material-ui/styles/colors';

import Subject from './Subject';
import EquipmentStatus from './EquipmentStatus';

const styles = {
  navigation: {
    fontSize: 20,
    fontWeight: typography.fontWeightLight,
    color: grey600,
    paddingBottom: 15,
    display: 'block',
  },
};

class Home extends React.Component {

  render() {
    return (
      <div className={classNames('grid')}>
        <h3 style={styles.navigation}>Trang chủ / Trang quản lý danh mục</h3>
        <div className={classNames('row')}>
          <div className={classNames('col-xs-12 col-sm-6 col-md-6')}>
            <Subject />
          </div>

          <div className={classNames('col-xs-12 col-sm-6 col-md-6')}>
            <EquipmentStatus />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
