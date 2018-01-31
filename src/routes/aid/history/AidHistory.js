
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import Table from '../../../components/Table';
import styles from './styles';

class AidHistory extends Component {
  render() {
    const { data: { error, loading, getAidHistories } } = this.props;

    const fields = [
      // Config columns
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
      },
      {
        key: 'equipment.barCode',
        value: 'Barcode',
        style: styles.columns.equipmentBarCode,
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

    return (
      <Paper>
        <Toolbar style={styles.subheader}>
          <ToolbarGroup>
            <ToolbarTitle
              text="Lịch sử mượn trả"
              style={styles.textWhiteColor}
            />
          </ToolbarGroup>
        </Toolbar>
        {
          !loading && getAidHistories &&
          <Table items={getAidHistories || []} fields={fields} />
        }
      </Paper>
    );
  }
}

AidHistory.propTypes = {
  data: PropTypes.shape({
    error: PropTypes.any,
    getAidHistories: PropTypes.any,
    loading: PropTypes.bool,
  }),
};

const query = gql`
  query {
    getAidHistories{
      _id
      lender {
        userId
        name
      }
      borrower {
        userId
        name
        teacherCode
      }
      borrowTime
      returnTime
      equipment {
        equipmentTypeId
        equipmentId
        name
        barCode
      }
    }
  }
`;

const AidHistoryWithData = graphql(query)(AidHistory);

export default AidHistoryWithData;
