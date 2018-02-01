import React, { Component } from 'react';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar';
// import style from '../style';
import InfoForm from './InfoForm';


class InfoPage extends Component {
  static propTypes = {
    users: PropTypes.object.isRequired,
    infoSave: PropTypes.object,
    handleSaveInfo: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      searchKey: '',
    };
    this.handleRequest = this.handleRequest.bind(this);
  }

  handleRequest(data, index) {
    if (data && index > -1) {
      this.setState({ ...this.state, data });
      this.props.handleSaveInfo(data);
    }
  }

  render() {
    const { users, infoSave } = this.props;
    console.log(users);
    return (
      <div>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ width: '92%' }}>
            <SearchBar
              dataSource={users.getUsers}
              handleRequest={this.handleRequest}
              text="username"
              value="_id"
              hintText="Tìm kiếm thông tin người mượn"
            />
          </div>
        </div>
        { infoSave && <InfoForm data={infoSave} />}
      </div>
    );
  }
}

export default InfoPage;
