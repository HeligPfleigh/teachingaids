import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Dialog from 'material-ui/Dialog';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { cyan600, fullWhite } from 'material-ui/styles/colors';
import ActionExtension from 'material-ui/svg-icons/action/extension';

import Table from '../../../../components/Table';
import SearchBar from '../SearchBar';
import styles from '../style';
import createApolloClient from '../../../../core/createApolloClient/createApolloClient.client';
import { getAllPerTypeEquipment } from '../graphql';


const apolloClient = createApolloClient();

const getPerEquiment = async (equipmentTypeId) => {
  if (equipmentTypeId) {
    console.log(equipmentTypeId);
    try {
      const { data: { getAllPerTypeEquipment: result } } = await apolloClient.query({
        query: getAllPerTypeEquipment,
        variables: { equipmentTypeId },
      });
      return result;
    } catch (error) {
      return;
    }
  }
  return false;
};


class DevicePage extends Component {

  static propTypes = {
    equipment: PropTypes.shape({
      getAllEquipment: PropTypes.array.isRequired,
      error: PropTypes.object,
      loading: PropTypes.bool,
    }),
    handleSaveEquipment: PropTypes.func,
    equipmentSave: PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = { open: false, item: {} };
    this.handleRequest = this.handleRequest.bind(this);
    this.handlRemove = this.handlRemove.bind(this);
  }


  handleRequest(chooseItem) {
    getPerEquiment(chooseItem._id)
    .then(data =>
      this.setState({ ...this.state, items: data }));
    this.handleOpen();
  }

  handlRemove(p) {
    let { equipmentSave, handleSaveEquipment } = this.props;
    equipmentSave = equipmentSave.filter(e => e !== p);
    handleSaveEquipment(equipmentSave);
  }

  // handle modal
  handleOpen = item => this.setState({ open: true, item });

  handleClose = () => this.setState(s => ({ ...s, open: false }));

  handleonChange= e => this.setState({ ...this.state, item: { ...this.state.item, [e.target.name]: e.target.value } })

  handleSubmit = () => {
    let { equipmentSave, handleSaveEquipment } = this.props;
    let { item } = this.state;
    let found = equipmentSave.findIndex(e => e._id === item._id);
    equipmentSave[found] = item;
    handleSaveEquipment(equipmentSave);
    this.handleClose();
  }


  titleGenerate = () => (
    <h1 style={{ color: fullWhite, backgroundColor: cyan600, marginBottom: 0 }}>
      <ActionExtension style={{ color: fullWhite }} /> Cập nhập thông tin
    </h1>
  );
  render() {
    const fields = [
      { key: 'barcore', value: 'barCode', action: 'normal', public: true, style: styles.columns.barcode },
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
    const { getAllEquipment, error, loading } = this.props.equipment;
    const { equipmentSave } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        name="quantity"
        id="quantity"
        onTouchTap={this.handleSubmit}
      />,
    ];
    if (loading) {
      return (
        <p>Loading...</p>
      );
    }
    if (error) {
      return (
        <p>Có lỗi</p>
      );
    }
    return (
      <div>
        <div>
          <SearchBar
            dataSource={getAllEquipment}
            handleRequest={this.handleRequest}
            text="name"
            value="_id"
            hintText="Tìm kiếm thiết bị"
          />
        </div>

        {
          equipmentSave.length > 0
          &&
          <Paper >
            <Toolbar style={styles.subheader}>
              <ToolbarGroup>
                <ToolbarTitle
                  text="Thông tin thiết bị"
                  style={styles.textWhiteColor}
                />
              </ToolbarGroup>
            </Toolbar>
            <Table items={equipmentSave || []} fields={fields} />
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
            >
              <div>
                <TextField
                  fullWidth
                  autoFocus
                  name="quantity"
                  id="quantity"
                  type="number"
                  label="Số lượng"
                  onChange={this.handleonChange}
                  value={this.state.quantity}
                  hintText="Số  lượng"
                  floatingLabelText={<span style={{ fontSize: 18 }}>Số lương</span>}
                />
              </div>
            </Dialog>
          </div>
        }
      </div>
    );
  }
}


export default DevicePage;
