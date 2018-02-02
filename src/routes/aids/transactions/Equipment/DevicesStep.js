import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { cyan600, fullWhite } from 'material-ui/styles/colors';
import ActionExtension from 'material-ui/svg-icons/action/extension';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import isEqual from 'lodash/isEqual';
import differenceWith from 'lodash/differenceWith';


import Table from '../../../../components/Table';
import SearchBar from '../SearchBar';
import styles from '../style';
import createApolloClient from '../../../../core/createApolloClient/createApolloClient.client';
import { selectEquipment, removeEquipment } from '../../../../actions/transactions';
import { searchEquipmentQuery, getAllEquipmentQuery } from '../graphql';


const apolloClient = createApolloClient();

const getPerEquiment = async (query) => {
  if (query) {
    try {
      const { data: { searchEquipment: result } } = await apolloClient.query({
        query: searchEquipmentQuery,
        variables: { query },
        options: {
          fetchPolicy: 'network-only',
        },
      });
      return result;
    } catch (error) {
      return false;
    }
  }
  return false;
};

@compose(
  graphql(getAllEquipmentQuery, { name: 'dataSource' }),
  connect(({ transactions }) => ({
    selectItems: transactions.selectItems,
  }), dispatch => ({
    dispatch,
    selectEquipment: item => dispatch(selectEquipment(item)),
    removeEquipment: item => dispatch(removeEquipment(item)),
  })),
)
class DevicePage extends Component {

  static propTypes = {
    dataSource: PropTypes.object,
    selectItems: PropTypes.any,
    selectEquipment: PropTypes.func,
    removeEquipment: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = { open: false, items: [], titleEquipment: '' };
  }

  handleSelection = (result, titleEquipment) => {
    if (result.items.length > 1) {
      const items = differenceWith(result.items, this.props.selectItems, isEqual);

      this.setState({ ...this.state, items, titleEquipment });
      this.handleOpen();
    } else {
      this.props.selectEquipment(result.items[0]);
    }
  }

  handleRequest = (chooseItem) => {
    if (!isEmpty(chooseItem)) {
      if (isString(chooseItem)) {
        getPerEquiment(chooseItem).then(result =>
          this.handleSelection(result, chooseItem.name),
        );
      } else {
        getPerEquiment(chooseItem._id.toString()).then(
          result => this.handleSelection(result, chooseItem.name),
        );
      }
    }
  }

  handleAdd = (p) => {
    const newItems = (this.state.items || []).filter(e => e !== p);
    this.setState(preState => ({
      ...preState,
      items: newItems,
    }), () => this.props.selectEquipment(p));
  }

  handlRemove = p => this.props.removeEquipment(p);

  // handle modal
  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState(s => ({ ...s, open: false }));

  // set title modal
  titleGenerate = () => (
    <h1 style={{ color: fullWhite, backgroundColor: cyan600, marginBottom: 0 }}>
      <ActionExtension style={{ color: fullWhite }} /> Lựa chọn thiết bị
    </h1>
  );

  render() {
    const { items, titleEquipment } = this.state;
    const { dataSource: { getAllEquipment, error, loading }, selectItems } = this.props;

    const fieldEquipBorrows = [
      { key: 'equipmentInfo.khCode', value: 'Mã KH', action: 'normal', public: true, style: styles.columns.barcode },
      { key: 'name', value: 'Tên thiết bị', action: 'normal', public: true, style: styles.columns.name },
      { key: 'quantity', value: 'Số lượng', action: 'normal', public: true, style: styles.columns.quanity },
      { key: 'unit', value: 'Đơn vị', action: 'normal', public: true, style: styles.columns.unit },
      {
        key: 'buttonGroup',
        value: 'Hành động',
        style: styles.columns.buttonGroup,
        public: true,
        action: 'group',
        children: [
          { key: 'btnDelete',
            value: 'Xóa',
            style: styles.columns.remove,
            public: true,
            action: 'delete',
            event: this.handlRemove,
          },
        ],
      },
    ];

    const fieldsEquip = [
      { key: 'barcode', value: 'barcode', action: 'normal', public: true, style: styles.columns.barcode },
      {
        key: 'buttonGroup',
        value: 'Hành động',
        style: styles.columns.buttonGroup,
        public: true,
        action: 'group',
        children: [
          { key: 'btnAdd',
            value: 'Thêm',
            style: styles.columns.remove,
            public: true,
            action: 'add',
            event: this.handleAdd,
          },
        ],
      },
    ];

    const actions = [
      <FlatButton
        label="Ok"
        primary
        keyboardFocused
        name="quantity"
        id="quantity"
        onTouchTap={this.handleClose}
      />,
    ];

    if (loading) {
      return <div>Đang tải dữ liệu...</div>;
    }

    if (error) {
      return <div>Có lỗi</div>;
    }

    return (
      <div>
        <div style={{ paddingBottom: '25px' }}>
          <SearchBar
            dataSource={getAllEquipment}
            handleRequest={this.handleRequest}
            text="name"
            value="_id"
            hintText="Tìm kiếm thiết bị"
          />
        </div>
        {
          selectItems.length > 0
          &&
          <Paper>
            <Toolbar style={styles.subheader}>
              <ToolbarGroup>
                <ToolbarTitle
                  text="Thông tin thiết bị"
                  style={styles.textWhiteColor}
                />
              </ToolbarGroup>
            </Toolbar>
            <Table items={selectItems || []} fields={fieldEquipBorrows} />
          </Paper>
        }
        {
          <div>
            <Dialog
              title={this.titleGenerate()}
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              autoScrollBodyContent
            >
              <h5>{titleEquipment}</h5>
              { items && <div>
                <Table items={items || []} fields={fieldsEquip} />

              </div>}
            </Dialog>
          </div>
        }
      </div>
    );
  }
}

export default DevicePage;
