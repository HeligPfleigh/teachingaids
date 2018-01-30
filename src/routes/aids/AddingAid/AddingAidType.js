import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class AddingAidType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      equipmentName: '',
      madeFrom: '',
      grade: '',
      kh_code: '',
      error: null,
    };
  }
  onSubmit = (e) => {
    e.preventDefault();
    const { equipmentName, madeFrom, grade, khCode } = this.state;
    if (equipmentName === '' ||
        madeFrom === '' ||
        grade === '' ||
        khCode === '') {
      this.setState({ error: 'Hãy thêm đủ thông tin các trường' });
      return null;
    }
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value,
    });
  }

  render() {
    return (
      <div>
        <div>Thêm loại thiết bị</div>
        <form autoComplete="off" onSubmit={this.onSubmit}>

          <TextField
            name="equipment_name"
            floatingLabelText="Loại thiết bị"
            fullWidth
            floatingLabelFixed
            onChange={this.handleChange}
          />
          <TextField
            name="made_from"
            floatingLabelText="Xuất xứ"
            fullWidth
            floatingLabelFixed
            onChange={this.handleChange}
          />
          <TextField
            name="grade"
            floatingLabelText="Khối"
            fullWidth
            floatingLabelFixed
            onChange={this.handleChange}
          />
          <TextField
            name="kh_code"
            floatingLabelText="Mã KH"
            fullWidth
            floatingLabelFixed
            onChange={this.handleChange}
          />
          <TextField
            name="unit"
            floatingLabelText="Đơn vị tính(cái, chiếc, ...)"
            fullWidth
            floatingLabelFixed
            onChange={this.handleChange}
          />
          <RaisedButton
            type="submit"
            label="Thêm"
            primary
            fullWidth
          />
        </form>
      </div>
    );
  }
}
