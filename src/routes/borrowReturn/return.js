import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { pink500, grey200, grey500 } from 'material-ui/styles/colors';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import createBrowserHistory from 'history/createBrowserHistory';
import history from '../../core/history.js';
import s from './borrowReturn.scss';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';

class Returning extends React.Component {
  state = {
    dataSource: [1],
  }
  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ]
    })
  }
  confirm(){
    history.push('/')
  }
  render() {
    return (
      <div className="wrapper">
      <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text="Danh sách trả" />
          </ToolbarGroup>
        </Toolbar> 
        <Paper zDepth={1}>
        <div className="inner">
      <h2> Thông tin tài khoản trả </h2>
          <TextField
          hintText="STT"
          />  
           <TextField
          hintText="To bo mon"
          /> 
           <TextField
          hintText="Ho ten"
          /> 
           <TextField
          hintText="Ma GV"
          /> 
           <TextField
          hintText="Gioi tinh"
          /> 
           <TextField
          hintText="SDT"
          /> 
           <TextField
          hintText="Phan cong chuyen mon"
          />    
           <TextField
          hintText="Ngày trả"
          /> 
           <RaisedButton label="Xác nhận" className="nut"  onClick={this.confirm.bind(this)}></RaisedButton>
      <h2> Thông tin thiết bị </h2>
      <AutoComplete
          hintText="Mã barcode"
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
        /> 
                <TextField
              hintText="loại thiết bị"
              />
              <TextField
              hintText="ngày giờ mượn"
              />  
           </div>   
          
          </Paper>    
      </div>
    );
  }
}

export default withStyles(s)(Returning);
