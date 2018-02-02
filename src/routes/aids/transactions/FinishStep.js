import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import differenceWith from 'lodash/differenceWith';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

import Table from '../../../components/Table';
import styles from './style';
import UserDetail from './UserInfo/UserDetail';

@connect(({ transactions }) => ({
  userInfo: transactions.user,
  selectItems: transactions.selectItems,
}))
class FinishStep extends Component {
  static propTypes = {
    userInfo: PropTypes.object,
    selectItems: PropTypes.array,
  }

  render() {
    const { userInfo, selectItems } = this.props;

    const fieldEquipBorrows = [
      { key: 'equipmentType.name', value: 'Tên thiết bị', action: 'normal', public: true, style: styles.columns.name },
      { key: 'barcode', value: 'Mã barcode', action: 'normal', public: true, style: styles.columns.barcode },
      { key: 'equipmentType.unit', value: 'Đơn vị', action: 'normal', public: true, style: styles.columns.unit },
    ];

    const statusName = 'Đã mượn';
    const oldSelectItems = selectItems.filter(e => e.status === statusName);
    const newSelectItems = differenceWith(selectItems, oldSelectItems, isEqual);

    return (
      <div>
        { userInfo && <UserDetail data={userInfo} />}
        {
          newSelectItems.length > 0 &&
          <Paper>
            <Toolbar style={styles.subheader}>
              <ToolbarGroup>
                <ToolbarTitle
                  text="Danh sách thiết bị sẽ được mượn"
                  style={styles.textWhiteColor}
                />
              </ToolbarGroup>
            </Toolbar>
            <Table items={newSelectItems || []} fields={fieldEquipBorrows} />
          </Paper>
        }
        {
          oldSelectItems.length > 0 &&
          <Paper>
            <Toolbar style={styles.subheader}>
              <ToolbarGroup>
                <ToolbarTitle
                  text="Danh sách thiết bị sẽ được trả"
                  style={styles.textWhiteColor}
                />
              </ToolbarGroup>
            </Toolbar>
            <Table items={oldSelectItems || []} fields={fieldEquipBorrows} />
          </Paper>
        }
      </div>
    );
  }
}

export default FinishStep;
