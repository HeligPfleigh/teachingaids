
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
// import RaisedButton from 'material-ui/RaisedButton';
// import AutoComplete from 'material-ui/AutoComplete';
// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import ActionAutorenew from 'material-ui/svg-icons/action/autorenew';
import IconButton from 'material-ui/IconButton';
import Refresh from 'material-ui/svg-icons/navigation/refresh';
import moment from 'moment';
import Table from '../../../components/Table';
import styles from './styles';

class AidHistoryView extends Component {
  render() {
    const { error, loading, aidHistoryData, filterByBorrower, filterByEquipment, refreshView /* , getAllEquipment */ } = this.props;

    const fields = [
      {
        key: 'lender.name',
        value: 'Người cho mượn',
        style: styles.columns.lenderName,
        public: true,
        action: 'normal',
      },
      {
        key: 'borrower.name',
        value: 'Người mượn',
        style: styles.columns.borrowerName,
        public: true,
        action: 'normal',
        event: item => filterByBorrower(item.borrower.userId),
      },
      {
        key: 'borrower.teacherCode',
        value: 'Mã giáo viên',
        style: styles.columns.borrowerTeacherCode,
        public: true,
        action: 'normal',
      },
      {
        key: 'borrowTime',
        value: 'Thời gian mượn',
        style: styles.columns.borrowTime,
        public: true,
        action: 'normal',
        formatData: item => moment(item).format('D-MM-Y HH:mm'),
      },
      {
        key: 'returnTime',
        value: 'Thời gian trả',
        style: styles.columns.returnTime,
        public: true,
        action: 'normal',
        formatData: item => moment(item).format('D-MM-Y H:mm'),
      },
      {
        key: 'equipment.name',
        value: 'Tên thiết bị',
        style: styles.columns.equipmentName,
        public: true,
        action: 'normal',
        event: item => filterByEquipment(item.equipment.equipmentTypeId),
      },
      {
        key: 'equipment.barCode',
        value: 'Barcode',
        style: styles.columns.equipmentBarCode,
        public: true,
        action: 'normal',
      },
      {
        key: 'status',
        value: 'Trạng thái',
        style: styles.columns.status,
        public: true,
        action: 'normal',
      },
    ];

    if (loading) {
      return <div>Đang tải dữ liệu ... </div>;
    }
    if (error) {
      return <div>Một lỗi ngoài dự kiến đã xảy ra. Liên hệ với người quản trị để được giúp đỡ!</div>;
    }
    // const allEquipments = getAllEquipment.map(value => value.name);
    return (
      <Paper>
        <Toolbar style={styles.subheader}>
          <ToolbarGroup>
            <ToolbarTitle
              text="Lịch sử mượn trả"
              style={styles.textWhiteColor}
            />
            <IconButton
              iconStyle={styles.textWhiteColor}
              data-tip="Làm mới dữ liệu"
              onClick={refreshView}
            >
              <Refresh />
            </IconButton>
          </ToolbarGroup>
          {/* <ToolbarGroup>
            <AutoComplete
              name="aidType"
              ref="aidType"
              onChange={this.handleChange}
              onUpdateInput={this.handleUpdateInput}
              hintText="Gõ và nhập theo gợi ý"
              floatingLabelFixed
              fullWidth
              filter={AutoComplete.caseInsensitiveFilter}
              dataSource={allEquipments}
            />
            <RaisedButton label="Tìm" primary />
          </ToolbarGroup> */}
        </Toolbar>
        {
          !loading && aidHistoryData &&
          <Table items={aidHistoryData || []} fields={fields} />
        }
      </Paper>
    );
  }
}

AidHistoryView.propTypes = {
  error: PropTypes.any,
  aidHistoryData: PropTypes.any,
  loading: PropTypes.bool,
  filterByBorrower: PropTypes.func,
  filterByEquipment: PropTypes.func,
  refreshView: PropTypes.func,
};

export default AidHistoryView;
