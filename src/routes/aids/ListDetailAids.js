import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ActionBack from 'material-ui/svg-icons/navigation/arrow-back';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ReactTooltip from 'react-tooltip';

import history from '../../core/history';
import Table from '../../components/Table';
import styles from './styles';

class ListDetailAids extends Component {

  eventHandler = () => {
    // console.log('Hello world');
  };

  redirectPage = (item) => {
    console.log(item);
    // history.push(`/districts/${item._id}`);
    // history.replace(`/equipments/detail/${item._id}`);
  };

  render() {
    const {
      data: {
        error,
        loading,
        getNameFromID,
        getAllPerTypeEquipment,
      },
    } = this.props;

    if (loading) {
      return <div>Đang tải dữ liệu ... </div>;
    }

    if (error) {
      return <div>Một lỗi ngoài dự kiến đã xảy ra. Liên hệ với người quản trị để được giúp đỡ!</div>;
    }

    const tableData = getAllPerTypeEquipment;
    const equipmentName = getNameFromID.name;

    const fields = [
      // Config columns
      { key: 'init', value: 'Tên thiết bị', init: equipmentName, style: styles.columns.name, public: true, action: 'normal', event: this.eventHandler },
      { key: 'barcode', value: 'Mã barcode', style: styles.columns.type, public: true, action: 'normal', event: this.eventHandler },
      // Config button group
      { key: 'buttonGroup',
        value: 'Hành động',
        style: styles.columns.buttonGroup,
        public: true,
        action: 'group',
        event: this.eventHandler,
        children: [
        { key: 'btnEdit', value: 'Sửa', style: styles.columns.edit, public: true, action: 'edit', event: this.eventHandler },
        { key: 'btnDelete', value: 'Xóa', style: styles.columns.edit, public: true, action: 'delete', event: this.eventHandler },
        ],
      },
    ];

    return (
      <Paper>
        <Toolbar style={styles.subheader}>
          <ToolbarGroup>
            <ToolbarTitle
              text="Danh sách thiết bị"
              style={styles.textWhiteColor}
            />
          </ToolbarGroup>
          <ToolbarGroup>
            <IconButton
              iconStyle={styles.textWhiteColor}
              data-tip="Quay lại trang trước"
              onClick={() => history.replace('/equipments')}
            >
              <ActionBack />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        {
          !loading && tableData &&
          <Table items={tableData || []} fields={fields} />
        }
        <ReactTooltip />
      </Paper>
    );
  }
}

ListDetailAids.propTypes = {
  data: PropTypes.objectOf({
    error: PropTypes.any,
    getAllPerTypeEquipment: PropTypes.any,
    getNameFromID: PropTypes.any,
    loading: PropTypes.bool,
  }),
};

const query = gql`
  query RootQuery($equipmentTypeId: String!){
    getAllPerTypeEquipment(equipmentTypeId: $equipmentTypeId){
      _id
      barcode
    }
    getNameFromID(_id:$equipmentTypeId){
      name
    }
  }
`;

const ListDetailAidsWithData = graphql(query, {
  options: ownProps => ({
    variables: {
      equipmentTypeId: ownProps.equipmentID,
    },
  }),
})(ListDetailAids);

export default ListDetailAidsWithData;
