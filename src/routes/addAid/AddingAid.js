import React, { PropTypes, Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import AddingAidType from './AddingAidType';

const styles = {
  container: {
    minWidth: 320,
    height: 'auto',
    paddingLeft: 100,
    paddingRight: 100,
    paddingTop: 30
  },
  paper: {
    padding: 20,
    overflow: 'auto',
  },
}

class AddingAid extends Component{
  constructor(props){
    super(props);
    this.state = {
      barcode: '',
      aidType: '',
      error: '',
      openAdvanced: false,
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { barcode, aidType } = this.state;
    if(barcode === '' || aidType === ''){
      this.setState({error: 'Hãy nhập đủ thông tin!'});
      return null;
    }

    // handle get data here
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value,
    });
  }

  handleOpenAdvanced = () => {
    this.setState({
      openAdvanced: !this.state.openAdvanced
    })
  }

  render(){
    const { openAdvanced } = this.state;
    return(
      <div style={styles.container} onSubmit={this.onSubmit}>
        <Paper style={styles.paper}>
          <form autoComplete="off">
            <TextField
              name="barcode"
              hintText="Quét mã vạch"
              floatingLabelText="Barcode"
              fullWidth={true}
              floatingLabelFixed={true}
              onChange={this.handleChange}
            />
            <TextField
              name="aidType"
              hintText="Nhập loại thiết bị"
              floatingLabelText="Loại thiết bị"
              fullWidth={true}
              floatingLabelFixed={true}
              onChange={this.handleChange}
            />
            <RaisedButton
              type="submit"
              label="Lưu"
              primary
              fullWidth={true}
            />
          </form>
          {this.state.error === '' ? null : <div>{this.state.error}</div>}
        </Paper>
        <br /><br />
        <FlatButton label="Advanced" fullWidth={true} onClick={this.handleOpenAdvanced}/>
        <br /><br />
        {openAdvanced ? 
          <Paper style={styles.paper}>
            <AddingAidType />
          </Paper> : null
        }
      </div>
    )
  }
}

export default AddingAid;
