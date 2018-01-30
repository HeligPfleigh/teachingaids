
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import ActionDetail from 'material-ui/svg-icons/image/details';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import history from '../../core/history';

class ListAids extends Component {
  state = {
    enableSelectAll: false,
    showCheckboxes: false,
  };

  render() {
    const { data: { error, loading, getAllEquipment } } = this.props;
    if (loading) {
      return <div>Đang tải dữ liệu ... </div>;
    }

    if (error) {
      console.log(error);
      return <div>Một lỗi ngoài dự kiến đã xảy ra. Liên hệ với người quản trị để được giúp đỡ!</div>;
    }

    const tableData = getAllEquipment;

    return (
      <div>
        <Paper>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle
                text="Bảng danh sách thiết bị"
              />
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
                <TableHeaderColumn tooltip="Khối lớp tương ứng">Khối</TableHeaderColumn>
                <TableHeaderColumn tooltip="Mã KH">Mã KH</TableHeaderColumn>
                <TableHeaderColumn tooltip="Số lượng thiết bị hiện có">Số lượng</TableHeaderColumn>
                <TableHeaderColumn tooltip="Thông tin chi tiết các dụng cụ cùng loại">Chi tiết</TableHeaderColumn>
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
                  <TableRowColumn>{row.name}</TableRowColumn>
                  <TableRowColumn>{row.equipmentInfo.grade}</TableRowColumn>
                  <TableRowColumn>{row.equipmentInfo.khCode}</TableRowColumn>
                  <TableRowColumn>{row.totalNumber}</TableRowColumn>
                  <TableRowColumn>
                    <IconButton
                      onClick={() => history.replace(`/equipments/detail/${row._id}`)}
                    >
                      <ActionDetail />
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

ListAids.propTypes = {
  data: PropTypes.objectOf({
    error: PropTypes.any,
    getAllEquipment: PropTypes.any,
    loading: PropTypes.bool,
  }),
};

const query = gql`
  query {
    getAllEquipment{
      _id
      name
      totalNumber
      unit
      order
      equipmentInfo{
        madeFrom
        grade
        khCode
      }
    }
  }
`;

const ListAidsWithData = graphql(query)(ListAids);

export default ListAidsWithData;
