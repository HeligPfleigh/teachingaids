import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import IconButton from 'material-ui/IconButton';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { grey200, grey500, grey900, lightBlue500 } from 'material-ui/styles/colors';
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
      width: 10,
    },
    name: {
      width: 20,
    },
    edit: {
      width: '5%',
    },
  },
  btnIcon: {
    width: 30,
    height: 30,
    color: lightBlue500,
  },
  btnWrapper: {
    width: 50,
    height: 50,
  },
  paper: {
    height: '35%',
    width: '45%',
    margin: 10,
    textAlign: 'center',
    display: 'inline-block',
  },
};

const items = [
  { id: 1, name: 'Product 1' },
  { id: 2, name: 'Product 2' },
  { id: 3, name: 'Product 3' },
  { id: 4, name: 'Product 4' },
  { id: 5, name: 'Product 5' },
  { id: 6, name: 'Product 6' },
  { id: 7, name: 'Product 7' },
  { id: 8, name: 'Product 8ccc' },
];

class Home extends React.Component {

  render() {
    return (
      <div>
        <Paper style={styles.paper} zDepth={1} >
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle
                style={{ color: grey900 }}
                text="Danh sách môn học"
              />
            </ToolbarGroup>
            <ToolbarGroup>
              <IconButton
                iconStyle={styles.btnIcon}
                style={styles.btnWrapper}
              >
                <FileDownload />
              </IconButton>
              <IconButton
                iconStyle={styles.btnIcon}
                style={styles.btnWrapper}
              >
                <ActionNoteAdd />
              </IconButton>
            </ToolbarGroup>
          </Toolbar>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.edit}>Edit</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map(item =>
                <TableRow key={item.id}>
                  <TableRowColumn style={styles.columns.id}>{item.id}</TableRowColumn>
                  <TableRowColumn style={styles.columns.name}>{item.name}</TableRowColumn>
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
        </Paper>
        <Paper style={styles.paper} zDepth={1} >
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle
                style={{ color: grey900 }}
                text="Danh sách môn học"
              />
            </ToolbarGroup>
            <ToolbarGroup>
              <IconButton
                iconStyle={styles.btnIcon}
                style={styles.btnWrapper}
              >
                <FileDownload />
              </IconButton>
              <IconButton
                iconStyle={styles.btnIcon}
                style={styles.btnWrapper}
              >
                <ActionNoteAdd />
              </IconButton>
            </ToolbarGroup>
          </Toolbar>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.edit}>Edit</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map(item =>
                <TableRow key={item.id}>
                  <TableRowColumn style={styles.columns.id}>{item.id}</TableRowColumn>
                  <TableRowColumn style={styles.columns.name}>{item.name}</TableRowColumn>
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
        </Paper>
        <Paper style={styles.paper} zDepth={1} >
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle
                style={{ color: grey900 }}
                text="Danh sách môn học"
              />
            </ToolbarGroup>
            <ToolbarGroup>
              <IconButton
                iconStyle={styles.btnIcon}
                style={styles.btnWrapper}
              >
                <FileDownload />
              </IconButton>
              <IconButton
                iconStyle={styles.btnIcon}
                style={styles.btnWrapper}
              >
                <ActionNoteAdd />
              </IconButton>
            </ToolbarGroup>
          </Toolbar>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.edit}>Edit</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map(item =>
                <TableRow key={item.id}>
                  <TableRowColumn style={styles.columns.id}>{item.id}</TableRowColumn>
                  <TableRowColumn style={styles.columns.name}>{item.name}</TableRowColumn>
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
        </Paper>
      </div>
    );
  }
}

export default Home;
