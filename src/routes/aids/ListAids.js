import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import history from '../../core/history';
import Table from '../../components/Table';
import styles from './styles';

class ListAids extends Component {

  eventHandler = () => {
    // console.log('Hello world');
  };

  redirectPage = (item) => {
    // history.push(`/districts/${item._id}`);
    history.replace(`/equipments/detail/${item._id}`);
  };

  render() {
    const { data: { error, loading, getAllEquipment } } = this.props;

    const fields = [
      // Config columns
      { key: 'name', value: 'Tên thiết bị', style: styles.columns.name, public: true, action: 'normal' },
      { key: 'equipmentInfo.grade', value: 'Khối', style: styles.columns.type, public: true, action: 'normal' },
      { key: 'equipmentInfo.khCode', value: 'Mã KH', style: styles.columns.type, public: true, action: 'normal' },
      { key: 'subject', value: 'Môn học', style: styles.columns.type, public: true, action: 'normal' },
      { key: 'totalNumber', value: 'Số lượng', style: styles.columns.counter, public: true, action: 'normal' },
      { key: 'btnRedirect', value: 'Chi tiết', style: styles.columns.btnRedirect, public: true, action: 'redirect', event: this.redirectPage },
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
              text="Danh sách thiết bị"
              style={styles.textWhiteColor}
            />
          </ToolbarGroup>
        </Toolbar>
        {
          !loading && getAllEquipment &&
          <Table items={getAllEquipment || []} fields={fields} />
        }
      </Paper>
    );
  }
}

ListAids.propTypes = {
  data: PropTypes.object,
};

const query = gql`
  query {
    getAllEquipment{
      _id
      name
      totalNumber
      unit
      order
      equipmentInfo{
        madeFrom
        grade
        khCode
      }
      subject
    }
  }
`;

const ListAidsWithData = graphql(query, {
  options: {
    fetchPolicy: 'network-only',
  },
})(ListAids);

export default ListAidsWithData;
