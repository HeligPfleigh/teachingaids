import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';

import SearchBar from '../SearchBar';
import UserDetail from './UserDetail';
import { getUsers } from '../graphql';
import { addUserForm } from '../../../../actions/transactions';


@compose(
  graphql(getUsers, { name: 'userDataSource' }),
  connect(({ transactions }) => ({
    userInfo: transactions.user,
  }), dispatch => ({
    addUserForm: user => dispatch(addUserForm(user)),
  })),
)
class UserInfoStep extends Component {
  static propTypes = {
    userInfo: PropTypes.object,
    userDataSource: PropTypes.object,
    addUserForm: PropTypes.func,
  }

  handleRequest = (data, index) => {
    if (data && index > -1) {
      this.props.addUserForm(data);
    }
  }

  render() {
    const {
      userInfo,
      userDataSource: { loading, error, getUsers: dataSource },
    } = this.props;

    if (loading) {
      return (<div>Đang tải dữ liệu</div>);
    }

    if (error) {
      return (
        <div style={{ color: 'red' }}>
          Lỗi tải dữ liệu, vui lòng quay lại sau...
        </div>
      );
    }

    return (
      <div>
        <div style={{ marginBottom: '40px' }}>
          <SearchBar
            dataSource={dataSource}
            handleRequest={this.handleRequest}
            value="_id"
            text="fullName"
            hintText="Tìm kiếm thông tin người mượn"
          />
        </div>
        { userInfo && <UserDetail data={userInfo} />}
      </div>
    );
  }
}

export default UserInfoStep;
