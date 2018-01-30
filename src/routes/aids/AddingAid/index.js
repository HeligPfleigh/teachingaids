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
      barcode: '',
      aidType: '',
      error: '',
      openAdvanced: false,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { barcode, aidType } = this.state;
    if (barcode === '' || aidType === '') {
      this.setState({ error: 'Hãy nhập đủ thông tin!' });
      return null;
    }
    // handle get data here
    const { data: { getAllEquipment }, mutationCreate, mutationUpdateQuantity } = this.props;
    const allEquipments = getAllEquipment.map(value => value.name);
    if (allEquipments.indexOf(aidType) === -1) {
      this.setState({ error: 'Loại thiết bị bạn chọn chưa có trong cơ sở dữ liệu. Hãy thêm trong mục Advanced trước!' });
      return null;
    }

    const allEquipmentsID = getAllEquipment.map(value => value._id);
    const equipmentTypeId = allEquipmentsID[allEquipments.indexOf(aidType)];

    const _id = equipmentTypeId;
    const totalNumber = (parseInt(getAllEquipment[allEquipments.indexOf(aidType)].totalNumber, 10) + 1).toString();

    mutationCreate({ variables: { barcode, equipmentTypeId } })
    .then(() => {
      mutationUpdateQuantity({ variables: { _id, totalNumber } });
    })
    .catch(err => this.setState({ error: err.message }));

    // reset data
    this.refs.aidType.setState({ searchText: '' });
    this.setState({
      barcode: '',
      aidType: '',
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
      console.log(error);
      return <div>Một lỗi ngoài dự kiến đã xảy ra. Liên hệ với người quản trị để được giúp đỡ!</div>;
    }

    const allEquipments = getAllEquipment.map(value => value.name);

    const { openAdvanced } = this.state;
    return (
      <div style={styles.container} onSubmit={this.onSubmit}>
        <Paper style={styles.paper}>
          <form autoComplete="off">
            <TextField
              name="barcode"
              hintText="Quét mã vạch"
              floatingLabelText="Barcode"
              fullWidth
              floatingLabelFixed
              onChange={this.handleChange}
              value={this.state.barcode}
            />
            <AutoComplete
              name="aidType"
              ref="aidType"
              onChange={this.handleChange}
              onUpdateInput={this.handleUpdateInput}
              floatingLabelText="Loại thiết bị"
              hintText="Gõ và nhập theo gợi ý"
              floatingLabelFixed
              fullWidth
              filter={AutoComplete.caseInsensitiveFilter}
              dataSource={allEquipments}
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
        <FlatButton label="Advanced" fullWidth onClick={this.handleOpenAdvanced} />
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
  data: PropTypes.objectOf({
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
  mutation createEquipment($barcode: String!, $equipmentTypeId: String!) {
    createEquipment(barcode: $barcode, equipmentTypeId: $equipmentTypeId) {
      _id
      barcode
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
  graphql(query),
  graphql(mutationCreate, { name: 'mutationCreate' }),
  graphql(mutationUpdateQuantity, { name: 'mutationUpdateQuantity' }),
)(AddingAid);

export default AddingAidWithData;
