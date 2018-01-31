import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { cyan900, fullWhite } from 'material-ui/styles/colors';

import Fragment from '../../data/fragment.utils';
import UserProfile from './UserProfile';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';
import styles from './styles';

const getUserInfo = gql`
  query getUserInfo {
    me {
      ...UserView
    }
  }
  ${Fragment.UserView}
`;

@graphql(getUserInfo, {
  options: {
    fetchPolicy: 'network-only',
  },
})
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panel: 1,
    };
  }

  onExpandChange = (panel) => {
    this.setState({ panel });
  }

  cardHeaderGenerate = title => (
    <CardHeader
      title={<strong>{title}</strong>}
      actAsExpander
      showExpandableButton
      style={{ backgroundColor: cyan900 }}
      titleStyle={{ color: fullWhite }}
      iconStyle={{ color: fullWhite }}
    />
  )

  render() {
    const { panel } = this.state;
    const { data: { loading, error, me, refetch } } = this.props;

    if (loading) {
      return <div>Đang tải dữ liệu ... </div>;
    }

    if (error) {
      return <h1>Một lỗi ngoài dự kiến đã xảy ra. Liên hệ với người quản trị để được giúp đỡ!</h1>;
    }

    return (
      <div>
        <h3 style={styles.navigation}>Trang chủ / Trang thông tin cá nhân</h3>
        <Card
          expanded={panel === 1}
          onExpandChange={() => this.onExpandChange(1)}
        >
          {this.cardHeaderGenerate('Thông tin cá nhân')}
          <CardText expandable>
            <UserProfile initialValues={{ ...me }} refetch={refetch} />
          </CardText>
        </Card>

        <Card
          expanded={panel === 2}
          onExpandChange={() => this.onExpandChange(2)}
        >
          {this.cardHeaderGenerate('Cập nhật email')}
          <CardText expandable>
            <ChangeEmail
              refetch={refetch}
              initialValues={{
                oldEmail: me.email.address,
                newEmail: me.email.address,
              }}
            />
          </CardText>
        </Card>

        <Card
          expanded={panel === 3}
          onExpandChange={() => this.onExpandChange(3)}
        >
          {this.cardHeaderGenerate('Đổi mật khẩu')}
          <CardText expandable>
            <ChangePassword />
          </CardText>
        </Card>
      </div>
    );
  }
}

Account.propTypes = {
  data: PropTypes.any,
};

export default Account;
