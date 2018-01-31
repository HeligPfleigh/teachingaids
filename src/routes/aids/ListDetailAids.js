import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ActionBack from 'material-ui/svg-icons/navigation/arrow-back';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ReactTooltip from 'react-tooltip';
import FlatButton from 'material-ui/FlatButton';
import isEmpty from 'lodash/isEmpty';
import Barcode from 'react-barcode';
import ReactToPrint from 'react-to-print';

import history from '../../core/history';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import styles from './styles';

class ListDetailAids extends Component {

  state = {
    selectItem: null,
  }

  eventHandler = () => {
    // console.log('Hello world');
  };

  redirectPage = (item) => {
    console.log(item);
    // history.push(`/districts/${item._id}`);
    // history.replace(`/equipments/detail/${item._id}`);
  };

  showPrintModal = item => this.setState({ selectItem: item });

  printModal = () => {
    const actions = [
      <FlatButton
        secondary
        label="Đóng cửa sổ"
        keyboardFocused
        onTouchTap={
          () => this.setState({ selectItem: null })
        }
      />,
      <ReactToPrint
        copyStyles={false}
        content={() => this.componentRef}
        trigger={() => <FlatButton primary label="In mã vạch" />}
      />,
    ];

    const { selectItem } = this.state;
    const {
      data: {
        getNameFromID,
      },
    } = this.props;
    const equipmentName = getNameFromID.name;

    const modalContentStyle = {
      container: {
        padding: 20,
        textAlign: 'center',
      },
      title: {
        color: '#000',
        font: 'bold 28px monospace, Arial',
        marginBottom: '-2px',
      },
    };

    return (<Modal
      isOpen={!isEmpty(selectItem)}
      title="Hộp thoại in mã vạch"
      actions={actions}
    >
      <div ref={el => (this.componentRef = el)} style={modalContentStyle.container}>
        <div style={modalContentStyle.title}>{equipmentName}</div>
        <Barcode
          width={3}
          height={175}
          fontSize={28}
          format="CODE128"
          value={selectItem.barcode}
        />
      </div>
    </Modal>);
  }

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
      { key: 'init', value: 'Tên thiết bị', init: equipmentName, style: styles.columns.name, public: true, action: 'normal' },
      { key: 'barcode', value: 'Mã barcode', style: styles.columns.type, public: true, action: 'normal' },
      // Config button group
      { key: 'buttonGroup',
        value: 'Hành động',
        style: styles.columns.buttonGroup,
        public: true,
        action: 'group',
        children: [
          { key: 'btnPrint', value: 'In barcode', style: styles.columns.edit, public: true, action: 'print', event: this.showPrintModal },
          { key: 'btnDelete', value: 'Xóa', style: styles.columns.edit, public: true, action: 'delete', event: this.redirectPage },
        ],
      },
    ];

    const { selectItem } = this.state;

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
        { !isEmpty(selectItem) && this.printModal() }
        <ReactTooltip />
      </Paper>
    );
  }
}

ListDetailAids.propTypes = {
  data: PropTypes.object,
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
