import React, { PropTypes } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

// import history from '../../core/history';
import Fragment from '../../data/fragment.utils';
import Table from '../../components/Table';

const styles = {
  columns: {
    name: {
      width: '20%',
    },
    type: {
      width: '12%',
      paddingLeft: 0,
      textAlign: 'center',
    },
    category: {
      width: '10%',
      paddingLeft: 0,
      textAlign: 'center',
    },
    edit: {
      width: '10%',
    },
    btnRedirect: {
      width: '12%',
      paddingLeft: 0,
      textAlign: 'center',
    },
    buttonGroup: {
      width: '13%',
    },
  },
};

class Users extends React.Component {

  eventHandler = () => {
    // console.log('Hello world');
  };

  redirectPage = (item) => {
    console.log(item);
    // history.push(`/districts/${item._id}`);
  };

  render() {
    // loadMoreRows
    const { data: { loading, getUsers: data } } = this.props;

    const fields = [
      // Config columns
      { key: 'username', value: 'Tên đăng nhập', style: styles.columns.type, public: true, action: 'normal', event: this.eventHandler },
      { key: 'profile.fullName', value: 'Họ và tên', style: styles.columns.name, public: true, action: 'normal', event: this.eventHandler },
      { key: 'profile.phone', value: 'Số điện thoại', style: styles.columns.type, public: true, action: 'normal', event: this.eventHandler },
      { key: 'isActive', value: 'Trạng thái', style: styles.columns.category, public: true, action: 'normal', event: this.eventHandler },
      { key: 'btnRedirect', value: 'Hành động', style: styles.columns.btnRedirect, public: true, action: 'redirect', event: this.redirectPage },
    ];

    return (
      <div>
        { loading && <span style={{ textAlign: 'center' }}>Loading...</span> }
        { !loading && data && <Table items={data || []} fields={fields} /> }
      </div>
    );
  }
}

Users.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
  }).isRequired,
};

const getUsers = gql`query getUsers {
  getUsers {
    ...UserView
  }
}
${Fragment.UserView}`;


export default compose(
  graphql(getUsers, {
    options: {
      fetchPolicy: 'network-only',
    },
  }),
)(Users);
