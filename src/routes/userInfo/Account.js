import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { blue600, fullWhite } from 'material-ui/styles/colors';

import UserProfile from './UserProfile';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';
import s from './Account.scss';

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
      style={{ backgroundColor: blue600 }}
      titleStyle={{ color: fullWhite }}
    />
  )

  render() {
    const { panel } = this.state;

    return (
      <div>
        <Card
          expanded={panel === 1}
          onExpandChange={() => this.onExpandChange(1)}
        >
          {this.cardHeaderGenerate('Thông tin cá nhân')}
          <CardText expandable>
            <UserProfile />
          </CardText>
        </Card>

        <Card
          expanded={panel === 2}
          onExpandChange={() => this.onExpandChange(2)}
        >
          {this.cardHeaderGenerate('Đổi mật khẩu')}
          <CardText expandable>
            <ChangePassword />
          </CardText>
        </Card>

        <Card
          expanded={panel === 3}
          onExpandChange={() => this.onExpandChange(3)}
        >
          {this.cardHeaderGenerate('Cập nhật email')}
          <CardText expandable>
            <ChangeEmail />
          </CardText>
        </Card>
      </div>
    );
  }
}

export default withStyles(s)(Account);
