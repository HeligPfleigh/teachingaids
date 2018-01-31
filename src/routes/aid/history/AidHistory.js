
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';
import _ from 'lodash';
import AidHistoryView from './AidHistoryView';
import { ROLES } from '../../../constants';
import { getAidHistoriesOfTeacherFunc, getAidHistoriesOfEquipmentTypeFunc, getAidHistoriesFunc } from './graphql';

class AidHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
    };
  }

  async componentDidMount() {
    let data = this.state;
    const { user } = this.props;

    if ((_.intersection(user.roles, [ROLES.ADMINISTRATOR, ROLES.SUPERVISOR, ROLES.LIBRARY_MANAGER, ROLES.LIBRARY_EMPLOYEE])).length > 0) {
      data = await getAidHistoriesFunc();
    }
    if ((_.intersection(user.roles, [ROLES.TEACHER])).length > 0) {
      data = await getAidHistoriesOfTeacherFunc(user.id);
    }
    this.updateView(data);
  }

  updateView = (data) => {
    this.setState({
      loading: data.loading,
      data: data.result,
    });
  }

  render() {
    const { loading, data } = this.state;
    return (
      <AidHistoryView loading={loading} getAidHistories={data} />
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
