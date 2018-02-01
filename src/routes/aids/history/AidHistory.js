
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';
import _ from 'lodash';
import AidHistoryView from './AidHistoryView';
import { ROLES } from '../../../constants';
import { getAidHistoriesOfTeacherFunc, getAidHistoriesFunc } from './graphql';

class AidHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
    };
  }

  async componentDidMount() {
    await this.refreshView();
  }

  refreshView = async () => {
    let data = this.state;
    const { user } = this.props;

    if ((_.intersection(user.roles, [ROLES.ADMINISTRATOR, ROLES.SUPERVISOR, ROLES.LIBRARY_MANAGER, ROLES.LIBRARY_EMPLOYEE])).length > 0) {
      data = await getAidHistoriesFunc();
    } else if ((_.intersection(user.roles, [ROLES.TEACHER])).length > 0) {
      data = await getAidHistoriesOfTeacherFunc(user.id);
    }
    this.setState({
      loading: data.loading,
      data: data.result || [],
    });
  }

  filterByBorrower = (borrowerId) => {
    this.setState({
      data: this.state.data.filter(item => item.borrower.userId === borrowerId),
    });
  }

  filterByEquipment = (equipmentTypeId) => {
    this.setState({
      data: this.state.data.filter(item => item.equipment.equipmentTypeId === equipmentTypeId),
    });
  }

  render() {
    const { loading, data } = this.state;
    return (
      <AidHistoryView
        loading={loading}
        aidHistoryData={data}
        filterByBorrower={this.filterByBorrower}
        filterByEquipment={this.filterByEquipment}
        refreshView={this.refreshView}
      />
    );
  }
}

AidHistory.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.user,
});

const AidHistoryWithData = compose(
  connect(mapStateToProps),
)(AidHistory);

export default AidHistoryWithData;
