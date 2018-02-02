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
import history from '../../../core/history.js';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './Tra.scss';

class Tra extends React.Component {


  state = {
    toggle: false
  }

  confirm(){
    this.setState({
      toggle: !this.state.toggle
    })
  }
  submit(){

  }

  render() {
    if(this.state.toggle)
      return (
        <div className="wrapper">
        <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text="Danh sách trả" />
            </ToolbarGroup>
          </Toolbar> 
          <Paper zDepth={1}>
          <div className="inner">
          <h2> Thông tin thiết bị </h2>
          <TextField
              hintText="Thiết bị"
            />    
            <h2> Thông tin người dùng </h2>
            <TextField
              hintText="Họ và tên"
            />    
            <TextField
              hintText="Mã GV"
            /> 
            <TextField
              hintText="SĐT"
            />
            <TextField
              hintText="Địa chỉ mail"
            />  
          </div>   
              <RaisedButton label="Xác nhận trả" className="nut" primary={true} onClick={this.submit.bind(this)}></RaisedButton>
              <RaisedButton label="Nhập lại" className="nut" primary={true} onClick={this.confirm.bind(this)}></RaisedButton>
            </Paper>    
        </div>
      )
    return (
      <div className="wrapper">
      <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text="Danh sách trả" />
          </ToolbarGroup>
        </Toolbar> 
        <Paper zDepth={1}>
        <div className="inner">
        <h2> Nhập mã barcode </h2>
        <TextField
            hintText="Mã barcode"
            onChange={(event, value) => this.props.search(value).then(({data}) => console.log(data))}
          />       
        </div>   
           <RaisedButton label="Xác nhận" className="nut" primary={true} onClick={this.confirm.bind(this)}></RaisedButton>
          </Paper>    
      </div>
    );
  }
}

const query = gql`
query getEquipmentDetailByBarcode($barcode: String!){
  getEquipmentDetailByBarcode(barcode: $barcode){
    barcode
    _id
    equipmentTypeId
  }
}
`;

const TraWithData = graphql(query, {
  options: ownProps => ({
    variables: {
      barcode: "",
    },
    fetchPolicy: 'network-only',
  }),
  props({ data: { fetchMore } }) {
    return {
      search(barcode) {
        return fetchMore({
          variables: { barcode },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) { return previousResult; }
            return fetchMoreResult;
          },
        });
      },
    };
  },
})(Tra);






export default TraWithData;
