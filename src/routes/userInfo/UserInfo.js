import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { pink500, grey200, grey500 } from 'material-ui/styles/colors';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import s from './UserInfo.scss';
import Paper from 'material-ui/Paper';


const actions = [
  <FlatButton
    label="Huy"
    primary={true}
    onClick={this.handleClose}
  />,
  <FlatButton
    label="Luu"
    primary={true}
    keyboardFocused={true}
    onClick={this.handleClose}
  />,
];

class UserInfo extends React.Component {
  constructor(props){
    super(props),
    this.state = {
      open: false,
      toggle : false
    }
  }
  edit(){
    this.state.toggle = !this.state.toggle,
    this.setState(this.state)
  }
  save(){
    this.state.toggle = !this.state.toggle,
    this.setState(this.state)
  }
  handleOpen = () => {
    this.setState({open: true});
  };
  handleClose = () => {
    this.setState({open: false});
  };
  render() {
    if(this.state.toggle == true) 
    return (
      <div className="wrapper">
      <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text="Thông tin tài khoản" />
          </ToolbarGroup>
        </Toolbar> 
        <Paper zDepth={1} className="inner">
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
        <br/><br/>
        <RaisedButton primary={true} label="Lưu" onClick={this.save.bind(this)} className="nut"></RaisedButton>
        </Paper>
      </div>
    )
    return (
      <div className="wrapper">
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Thông tin tài khoản" />
        </ToolbarGroup>
      </Toolbar> 
      <Paper zDepth={1} className="inner">
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
        <br/><br/>
        <RaisedButton primary={true} label="Chỉnh sửa" onClick={this.edit.bind(this)} className="nut"></RaisedButton >
        <RaisedButton primary={true} label="Đổi mật khẩu" onClick={this.handleOpen} className="nut"/>
        <Dialog
          title="Thay doi mat khau"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
          placeholder="Mật khẩu cũ"
          />
          <TextField
            placeholder="Mật khẩu mới"
          />
        </Dialog>
      </Paper>
      </div>
    )
  }
}

export default withStyles(s)(UserInfo);
