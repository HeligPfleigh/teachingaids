import React from 'react';

import { Button, Col, Label, Form, Row } from 'reactstrap';
import TextFeild from 'material-ui/TextField';

const styles = {
  label: {
    marginTop: '5px',
    fontWeight: 'bold',
  },
};

class UserProfile extends React.Component {

  render() {
    return (
      <Form>
        <Row>
          <Label sm={{ offset: 1 }} style={styles.label} xs="2">Địa chỉ mail</Label>
          <Col xs="6"><TextFeild fullWidth name="newEmail" placeholder="Email" /></Col>
        </Row>
        <Row>
          <Label sm={{ offset: 1 }} style={styles.label} xs="2">Mật khẩu</Label>
          <Col xs="6"><TextFeild fullWidth type="password" name="password2" placeholder="Mật khẩu hiện tại" /></Col>
        </Row>
        <Row>
          <Label sm={{ offset: 1 }} xs="2"></Label>
          <Col xs="6">
            <Button type="submit" color="success">Đồng ý</Button>{' '}
            <Button type="reset" color="danger">Hủy</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default UserProfile;
