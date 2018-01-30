import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import ActionRemove from 'material-ui/svg-icons/action/delete';
import ActionEdit from 'material-ui/svg-icons/content/create';
import ActionBack from 'material-ui/svg-icons/content/backspace';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import history from '../../core/history';

class ListDetailAids extends Component {
  state = {
    enableSelectAll: false,
    showCheckboxes: false,
  };

  render() {
    if (this.props.data.loading) {
      return <div>Đang tải dữ liệu ... </div>;
    }

    if (this.props.data.error) {
      console.log(this.props.data.error);
      return <div>Một lỗi ngoài dự kiến đã xảy ra. Liên hệ với người quản trị để được giúp đỡ!</div>;
    }

    const tableData = this.props.data.getAllPerTypeEquipment;
    const equipmentName = this.props.data.getNameFromID.name;

    return (
      <div>
        {/* <div>Hello {this.props.equipmentID}</div> */}
        <Paper>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle
                text="Danh sách"
              />
            </ToolbarGroup>
            <ToolbarGroup>
              <IconButton
                data-tip="Thêm mới môn học"
                onClick={() => history.replace('/equipments')}
              >
                <ActionBack />
              </IconButton>
            </ToolbarGroup>
          </Toolbar>
          <Table
            height="300px"
            fixedHeader
            selectable
          >
            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={this.state.showCheckboxes}
              enableSelectAll={this.state.enableSelectAll}
            >
              <TableRow>
                <TableHeaderColumn tooltip="Tên thiết bị">Tên thiết bị</TableHeaderColumn>
                <TableHeaderColumn tooltip="Mã barcode">Mã barcode</TableHeaderColumn>
                <TableHeaderColumn tooltip="Chọn để sửa hoặc xoá thiết bị">Thao tác khác</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              deselectOnClickaway
              showRowHover={false}
              stripedRows={false}
            >
              {tableData.map(row => (
                <TableRow key={Math.random()}>
                  <TableRowColumn>{equipmentName}</TableRowColumn>
                  <TableRowColumn>{row.barcode}</TableRowColumn>
                  <TableRowColumn>
                    <IconButton>
                      <ActionEdit />
                    </IconButton>
                    <IconButton>
                      <ActionRemove />
                    </IconButton>
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

ListDetailAids.propTypes = {
  data: PropTypes.objectOf({
    error: PropTypes.any,
    getAllPerTypeEquipment: PropTypes.any,
    getNameFromID: PropTypes.any,
    loading: PropTypes.bool,
  }),
};

const query = gql`
  query RootQuery($equipmentTypeId: String!){
    getAllPerTypeEquipment(equipmentTypeId: $equipmentTypeId){
      _id
      barcode
    }
    getNameFromID(_id:$equipmentTypeId){
      name
    }
  }
`;

const ListDetailAidsWithData = graphql(query, {
  options: ownProps => ({
    variables: {
      equipmentTypeId: ownProps.equipmentID,
    },
  }),
})(ListDetailAids);

export default ListDetailAidsWithData;
