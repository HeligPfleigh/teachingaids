import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import AddingAidType from './AddingAidType';
import history from '../../../core/history';

const styles = {
  container: {
    minWidth: 320,
    height: 'auto',
    paddingLeft: 100,
    paddingRight: 100,
    paddingTop: 30,
  },
  paper: {
    padding: 20,
    overflow: 'auto',
  },
};

class AddingAid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aidType: '',
      error: '',
      quantity: '',
      openAdvanced: false,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { aidType } = this.state;
    const quantity = parseInt(this.state.quantity, 10);
    if (aidType === '' || isNaN(quantity) || quantity <= 0) {
      this.setState({ error: 'Hãy nhập đủ thông tin!' });
      return null;
    }
    // handle get data here
    const { data: { getAllEquipment }, mutationCreate, mutationUpdateQuantity } = this.props;
    const allEquipments = getAllEquipment.map(value => value.name);
    if (allEquipments.indexOf(aidType) === -1) {
      this.setState({ error: 'Loại thiết bị bạn chọn chưa có trong cơ sở dữ liệu. Hãy thêm trong mục Bổ sung trước!' });
      return null;
    }

    const allEquipmentsID = getAllEquipment.map(value => value._id);
    const equipmentTypeId = allEquipmentsID[allEquipments.indexOf(aidType)];

    const _id = equipmentTypeId;
    const totalNumber = (parseInt(getAllEquipment[allEquipments.indexOf(aidType)].totalNumber, 10) + quantity).toString();

    mutationCreate({ variables: { equipmentTypeId, quantity } })
    .then(() => {
      mutationUpdateQuantity({ variables: { _id, totalNumber } });
      history.push(`/equipments/detail/${equipmentTypeId}/null`);
    })
    .catch(err => this.setState({ error: err.message }));

    // reset data
    this.refs.aidType.setState({ searchText: '' });
    this.setState({
      aidType: '',
      quantity: '',
    });
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value,
    });
  }

  handleUpdateInput = (searchText) => {
    this.setState({
      aidType: searchText,
    });
  }

  handleOpenAdvanced = () => {
    this.setState({
      openAdvanced: !this.state.openAdvanced,
    });
  }

  render() {
    const { data: { error, loading, getAllEquipment } } = this.props;
    if (loading) {
      return <div>Đang tải dữ liệu ... </div>;
    }

    if (error) {
      return <div>Một lỗi ngoài dự kiến đã xảy ra. Liên hệ với người quản trị để được giúp đỡ!</div>;
    }

    const allEquipments = getAllEquipment.map(value => value.name);

    const { openAdvanced } = this.state;
    return (
      <div style={styles.container}>
        <Paper style={styles.paper}>
          <form autoComplete="off" onSubmit={this.onSubmit}>
            <AutoComplete
              name="aidType"
              ref="aidType"
              onChange={this.handleChange}
              onUpdateInput={this.handleUpdateInput}
              floatingLabelText="Thiết bị (*)"
              hintText="Gõ và nhập theo gợi ý"
              floatingLabelFixed
              fullWidth
              filter={AutoComplete.caseInsensitiveFilter}
              dataSource={allEquipments}
            />
            <TextField
              name="quantity"
              hintText="Nhập số lượng cần thêm"
              floatingLabelText="Số lượng (*)"
              fullWidth
              floatingLabelFixed
              onChange={this.handleChange}
              value={this.state.quantity}
            />
            <RaisedButton
              type="submit"
              label="Lưu"
              primary
              fullWidth
            />
          </form>
          {this.state.error === '' ? null : this.state.error}
        </Paper>
        <br /><br />
        <FlatButton label="Bổ sung" fullWidth onClick={this.handleOpenAdvanced} />
        <br /><br />
        {openAdvanced ?
          <Paper style={styles.paper}>
            <AddingAidType />
          </Paper> : null
        }
      </div>
    );
  }
}

AddingAid.propTypes = {
  data: PropTypes.shape({
    error: PropTypes.any,
    getAllEquipment: PropTypes.array,
    loading: PropTypes.bool,
  }),
  mutationCreate: PropTypes.func,
  mutationUpdateQuantity: PropTypes.func,
};

const query = gql`
  query {
    getAllEquipment{
      _id
      name
      totalNumber
    }
  }
`;

const mutationCreate = gql`
  mutation createEquipment($equipmentTypeId: String!, $quantity: Int!) {
    createEquipment(equipmentTypeId: $equipmentTypeId, quantity: $quantity) {
      _id
      equipmentTypeId
    }
  }
`;

const mutationUpdateQuantity = gql`
  mutation updateTotalNumberEquipmentInfo($_id: String!, $totalNumber: String!){
    updateTotalNumberEquipmentInfo(_id:$_id, totalNumber: $totalNumber){
      _id
      name
      totalNumber
    }
  }
`;

const AddingAidWithData = compose(
  graphql(query, {
    options: {
      fetchPolicy: 'network-only',
    },
  }),
  graphql(mutationCreate, { name: 'mutationCreate' }),
  graphql(mutationUpdateQuantity, { name: 'mutationUpdateQuantity' }),
)(AddingAid);

export default AddingAidWithData;
