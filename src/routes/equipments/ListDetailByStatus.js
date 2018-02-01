import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ReactTooltip from 'react-tooltip';
import FlatButton from 'material-ui/FlatButton';
import isEmpty from 'lodash/isEmpty';
import Barcode from 'react-barcode';
import ReactToPrint from 'react-to-print';

import Modal from '../../components/Modal';
import Table from '../../components/Table';
import styles from './styles';

class ListDetailByStatus extends Component {
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
      status,
      data: {
        error,
        loading,
        getNameFromID,
        getEquipByStatusAndType,
      },
    } = this.props;

    if (loading) {
      return <div>Đang tải dữ liệu ... </div>;
    }

    if (error) {
      return <div>Một lỗi ngoài dự kiến đã xảy ra. Liên hệ với người quản trị để được giúp đỡ!</div>;
    }

    const tableData = getEquipByStatusAndType;
    const equipmentName = getNameFromID.name;

    const fields = [
      // Config columns
      { key: 'init', value: 'Tên thiết bị', init: equipmentName, style: styles.columns.name, public: true, action: 'normal' },
      { key: 'barcode', value: 'Mã barcode', style: styles.columns.type, public: true, action: 'normal' },
      { key: 'status', value: 'Trạng thái', style: styles.columns.type, public: true, action: 'normal' },
      { key: 'btnPrint', value: 'In barcode', style: styles.columns.edit, public: true, action: 'print', event: this.showPrintModal },
    ];

    const { selectItem } = this.state;

    return (
      <Paper>
        <Toolbar style={styles.subheader}>
          <ToolbarGroup>
            <ToolbarTitle
              text={`Danh sách thiết bị ${status === 'null' ? 'vừa thêm mới' : status}`}
              style={styles.textWhiteColor}
            />
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

ListDetailByStatus.propTypes = {
  status: PropTypes.string,
  data: PropTypes.object,
};

const query = gql`
  query RootQuery($equipmentTypeId: String!, $status: String!){
    getEquipByStatusAndType(equipmentTypeId: $equipmentTypeId, status: $status){
      _id
      barcode
      status
    }
    getNameFromID(_id:$equipmentTypeId){
      name
    }
  }
`;


const ListDetailByStatusWithData = graphql(query, {
  options: ownProps => ({
    variables: {
      equipmentTypeId: ownProps.equipmentID,
      status: ownProps.status,
    },
    fetchPolicy: 'network-only',
  }),
})(ListDetailByStatus);

export default ListDetailByStatusWithData;
