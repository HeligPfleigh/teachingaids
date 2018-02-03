import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import InfiniteScroll from 'react-infinite-scroller';
import Paper from 'material-ui/Paper';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import throttle from 'lodash/throttle';
import update from 'immutability-helper';
import history from '../../core/history';
import Table from '../../components/Table';
import styles from './styles';

class ListAids extends Component {

  eventHandler = () => {
    // console.log('Hello world');
  };

  redirectPage = (item) => {
    // history.push(`/districts/${item._id}`);
    history.replace(`/equipments/detail/${item._id}`);
  };

  render() {
    const { data: { error, loading, equipments }, loadMoreRows } = this.props;

    const fields = [
      // Config columns
      { key: 'name', value: 'Tên thiết bị', style: styles.columns.name, public: true, action: 'normal' },
      { key: 'equipmentInfo.grade', value: 'Khối', style: styles.columns.type, public: true, action: 'normal' },
      { key: 'equipmentInfo.khCode', value: 'Mã KH', style: styles.columns.type, public: true, action: 'normal' },
      { key: 'subject', value: 'Môn học', style: styles.columns.type, public: true, action: 'normal' },
      { key: 'totalNumber', value: 'Số lượng', style: styles.columns.counter, public: true, action: 'normal' },
      { key: 'btnRedirect', value: 'Chi tiết', style: styles.columns.btnRedirect, public: true, action: 'redirect', event: this.redirectPage },
    ];

    if (loading) {
      return <div>Đang tải dữ liệu ... </div>;
    }

    if (error) {
      return <div>Một lỗi ngoài dự kiến đã xảy ra. Liên hệ với người quản trị để được giúp đỡ!</div>;
    }

    let hasNextPage = false;
    if (equipments && equipments.pageInfo) {
      hasNextPage = equipments.pageInfo.hasNextPage;
    }

    return (
      <Paper>
        <Toolbar style={styles.subheader}>
          <ToolbarGroup>
            <ToolbarTitle
              text="Danh sách thiết bị"
              style={styles.textWhiteColor}
            />
          </ToolbarGroup>
        </Toolbar>
        {
          !loading && equipments &&
          <InfiniteScroll
            loadMore={loadMoreRows}
            hasMore={hasNextPage}
            loader={<div className="loader">Loading ...</div>}
          >
            <Table items={equipments.edges || []} fields={fields} />
          </InfiniteScroll>
        }
      </Paper>
    );
  }
}

ListAids.propTypes = {
  data: PropTypes.object,
  loadMoreRows: PropTypes.func.isRequired,
};

const query = gql`
  query equipments($limit: Int, $page: Int) {
    equipments(limit: $limit, page: $page) {
      edges {
        _id
        name
        totalNumber
        unit
        order
        subject
      }
      pageInfo {
        page
        hasNextPage
        total
        limit
      }
    }
  }
`;

const ListAidsWithData = graphql(query, {
  options: {
    fetchPolicy: 'network-only',
  },
})(ListAids);


export default compose(
  graphql(query, {
    variables: {
      limit: 20,
      page: 1,
    },
    options: () => ({
      fetchPolicy: 'network-only',
    }),
    props: ({ data }) => {
      const { fetchMore } = data;
      const loadMoreRows = fetchMore({
        variables: {
          limit: (data.equipments && data.equipments.pageInfo && data.equipments.pageInfo.limit) || 20,
          page: (data.equipments && data.equipments.pageInfo && data.equipments.pageInfo.page) || 1,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newEdges = fetchMoreResult.equipments.edges;
          const pageInfo = fetchMoreResult.equipments.pageInfo;
          return update(previousResult, {
            equipments: {
              edges: {
                $push: newEdges,
              },
              pageInfo: {
                $set: pageInfo,
              },
            },
          });
        },
      });

      return {
        data,
        loadMoreRows,
      };
    },
  }),
)(ListAidsWithData);

