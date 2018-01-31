import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { pink500, grey200, grey500 } from 'material-ui/styles/colors';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import {Link, Router, Route} from 'react-router-dom';
import Borrow from './borrow.js';
import Returning from './return.js';
import s from './borrowReturn.scss';
import { TextField } from 'material-ui/TextField';
import createBrowserHistory from 'history/createBrowserHistory';
import history from '../../core/history.js';
import Paper from 'material-ui/Paper';

const styles = {
  floatingActionButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  editButton: {
    fill: grey500,
  },
  columns: {
    id: {
      width: '10%',
    },
    name: {
      width: '40%',
    },
    price: {
      width: '20%',
    },
    category: {
      width: '20%',
    },
    edit: {
      width: '10%',
    },
  },
};


class BorrowReturn extends React.Component {
  clickToBorrow(){
    history.push('/buildings/borrow')
  }
  clickToReturn(){
    history.push('/buildings/return')
}
  render() {    
    return (
      <div className="wrapper">
        <Paper zDepth={1}>
          <RaisedButton onClick={this.clickToBorrow.bind(this)} label="Mượn" primary={true} className="nut"></RaisedButton>
          <RaisedButton onClick={this.clickToReturn.bind(this)} label="Trả" primary={true} className="nut"></RaisedButton>
        </Paper>
      </div>
    )
  }
}

export default withStyles(s)(BorrowReturn);
