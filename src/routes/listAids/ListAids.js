
import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ActionList from 'material-ui/svg-icons/action/list';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const styles = {
  smallIcon: {
    width: 36,
    height: 36,
  },
  small: {
    width: 72,
    height: 72,
    padding: 16,
  },
}

class ListAids extends Component {
  state = {
    enableSelectAll: false,
    showCheckboxes: false,
  };

  render() {
    if(this.props.data.loading){
      return <div>Đang tải dữ liệu ... </div>
    }

    if(this.props.data.error){
      console.log(this.props.data.error)
      return <div>Một lỗi ngoài dự kiến đã xảy ra. Liên hệ với người quản trị để được giúp đỡ!</div>
    }
    
    const tableData = this.props.data.getAllEquipment;

    return (
      <div>
        <Table
          height='300px'
          fixedHeader={true}
          selectable={true}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="5" tooltip="Super Header" style={{textAlign: 'center'}}>
                Bảng danh sách thiết bị
              </TableHeaderColumn>
            </TableRow>
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
            deselectOnClickaway={true}
            showRowHover={false}
            stripedRows={false}
          >
            {tableData.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.equipmentInfo.grade}</TableRowColumn>
                <TableRowColumn>{row.equipmentInfo.khCode}</TableRowColumn>
                <TableRowColumn>{row.totalNumber}</TableRowColumn>
                <TableRowColumn>
                  <IconButton
                    iconStyle={styles.smallIcon}
                    style={styles.small}
                  >
                    <ActionList />
                  </IconButton>
                </TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

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