import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';

const hintUnitSource = [
  'Tờ',
  'Hộp',
  'Cái',
  'Khối',
  'Bộ',
  'Chiếc',
  'Quả',
  'l',
  'g',
];

class AddingAidType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      equipmentName: '',
      madeFrom: '',
      grade: '',
      khCode: '',
      unit: '',
      error: null,
    };
  }
  onSubmit = (e) => {
    e.preventDefault();
    const { equipmentName, madeFrom, grade, khCode, unit } = this.state;
    if (equipmentName === '' ||
        madeFrom === '' ||
        grade === '' ||
        khCode === '' ||
        unit === '') {
      this.setState({ error: 'Hãy thêm đủ thông tin các trường' });
      return null;
    }

    // handle submit data
    const { mutationCreateAidType } = this.props;
    const name = equipmentName;

    mutationCreateAidType({ variables: { name, madeFrom, grade, khCode, unit } })
    .then(() => this.setState({ error: 'Thêm mới thành công' }))
    .catch(err => this.setState({ error: err.message }));

    // reset data
    this.refs.unit.setState({ searchText: '' });
    this.setState({
      equipmentName: '',
      madeFrom: '',
      grade: '',
      khCode: '',
      unit: '',
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
      unit: searchText,
    });
  }

  render() {
    return (
      <div>
        <div>Thêm loại thiết bị</div>
        <form autoComplete="off" onSubmit={this.onSubmit}>

          <TextField
            name="equipmentName"
            floatingLabelText="Loại thiết bị"
            fullWidth
            floatingLabelFixed
            onChange={this.handleChange}
            value={this.state.equipmentName}
          />
          <TextField
            name="madeFrom"
            floatingLabelText="Xuất xứ"
            fullWidth
            floatingLabelFixed
            onChange={this.handleChange}
            value={this.state.madeFrom}
          />
          <AutoComplete
            name="unit"
            ref="unit"
            onChange={this.handleChange}
            onUpdateInput={this.handleUpdateInput}
            floatingLabelText="Đơn vị tính"
            hintText="cái, hộp, l,..."
            floatingLabelFixed
            fullWidth
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={hintUnitSource}
          />
          <TextField
            name="grade"
            floatingLabelText="Khối"
            fullWidth
            floatingLabelFixed
            onChange={this.handleChange}
            value={this.state.grade}
          />
          <TextField
            name="khCode"
            floatingLabelText="Mã KH"
            fullWidth
            floatingLabelFixed
            onChange={this.handleChange}
            value={this.state.khCode}
          />
          {/* <TextField
            name="unit"
            floatingLabelText="Đơn vị tính(cái, chiếc, ...)"
            fullWidth
            floatingLabelFixed
            onChange={this.handleChange}
            value={this.state.unit}
          /> */}
          <RaisedButton
            type="submit"
            label="Thêm"
            primary
            fullWidth
          />
        </form>
        {this.state.error === '' ? null : <div>{this.state.error}</div>}
      </div>
    );
  }
}

AddingAidType.propTypes = {
  mutationCreateAidType: PropTypes.func,
};

const mutationCreateAidType = gql`
  mutation createEquipmentInfo($name: String!, $madeFrom: String!, $grade: String!, $khCode: String!, $unit: String!){
    createEquipmentInfo(name: $name, madeFrom: $madeFrom, grade: $grade, khCode: $khCode, unit: $unit){
      name
      _id
      totalNumber
    }
  }
`;

const AddingAidTypeWithMutation = compose(
  graphql(mutationCreateAidType, { name: 'mutationCreateAidType' }),
)(AddingAidType);

export default AddingAidTypeWithMutation;
