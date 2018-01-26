import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { pink500, grey200, grey500 } from 'material-ui/styles/colors';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';

import s from './Home.scss';

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

const items = [
  { id: 1, name: 'Product 1', price: '$50.00', category: 'Category 1' },
  { id: 2, name: 'Product 2', price: '$150.00', category: 'Category 2' },
  { id: 3, name: 'Product 3', price: '$250.00', category: 'Category 3' },
  { id: 4, name: 'Product 4', price: '$70.00', category: 'Category 4' },
  { id: 5, name: 'Product 5', price: '$450.00', category: 'Category 5' },
  { id: 6, name: 'Product 6', price: '$950.00', category: 'Category 6' },
  { id: 7, name: 'Product 7', price: '$550.00', category: 'Category 7' },
  { id: 8, name: 'Product 8ccc', price: '$750.00', category: 'Category 8' },
];

class Home extends React.Component {

  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text="Options" />
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <RaisedButton label="Create Broadcast" primary />
          </ToolbarGroup>
        </Toolbar>

        <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
          <ContentAdd />
        </FloatingActionButton>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.price}>Price</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.category}>Category</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.edit}>Edit</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(item =>
              <TableRow key={item.id}>
                <TableRowColumn style={styles.columns.id}>{item.id}</TableRowColumn>
                <TableRowColumn style={styles.columns.name}>{item.name}</TableRowColumn>
                <TableRowColumn style={styles.columns.price}>{item.price}</TableRowColumn>
                <TableRowColumn style={styles.columns.category}>{item.category}</TableRowColumn>
                <TableRowColumn style={styles.columns.edit}>
                  <FloatingActionButton
                    zDepth={0}
                    mini
                    backgroundColor={grey200}
                    iconStyle={styles.editButton}
                  >
                    <ContentCreate />
                  </FloatingActionButton>
                </TableRowColumn>
              </TableRow>,
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withStyles(s)(Home);
