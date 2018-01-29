import React, { PropTypes, Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

export default class AddingAidType extends Component{
  constructor(props){
    super(props);
    this.state = {
      equipment_name: '',
      made_from: '',
      grade: '',
      kh_code: '',
      error: null,
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    const { equipment_name, made_from, grade, kh_code } = this.state;
    if( equipment_name === '' ||
        made_from === ''||
        grade === '' ||
        kh_code === '')
    {
      this.setState({error: "Hãy thêm đủ thông tin các trường"});
      return null;
    }

    
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value,
    });
    
  }

  render(){
    return(
      <div>
        <div>Thêm loại thiết bị</div>
        <form autoComplete="off" onSubmit={this.onSubmit}>

          <TextField
            name="equipment_name"
            floatingLabelText="Loại thiết bị"
            fullWidth={true}
            floatingLabelFixed={true}
            onChange={this.handleChange}
          />
          <TextField
            name="made_from"
            floatingLabelText="Xuất xứ"
            fullWidth={true}
            floatingLabelFixed={true}
            onChange={this.handleChange}
          />
          <TextField
            name="grade"
            floatingLabelText="Khối"
            fullWidth={true}
            floatingLabelFixed={true}
            onChange={this.handleChange}
          />
          <TextField
            name="kh_code"
            floatingLabelText="Mã KH"
            fullWidth={true}
            floatingLabelFixed={true}
            onChange={this.handleChange}
          />
          <RaisedButton
            type="submit"
            label="Thêm"
            primary
            fullWidth={true}
          />
        </form>
      </div>
    )
  }
}