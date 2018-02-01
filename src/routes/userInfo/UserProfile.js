import React from 'react';

import { Button, Col, Label, Form, Row, Input } from 'reactstrap';
import TextFeild from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

const styles = {
  label: {
    marginTop: '5px',
    fontWeight: 'bold',
  },
};

class UserProfile extends React.Component {

  render() {
    return (
      <Form autoComplete="off">
        <Row>
          <Label sm={{ offset: 1 }} style={styles.label} for="firstname" xs="2">Họ</Label>
          <Col xs="6"><TextFeild fullWidth name="firstname" placeholder="Họ của nhân viên" /></Col>
        </Row>
        <Row>
          <Label sm={{ offset: 1 }} style={styles.label} for="lastname" xs="2">Tên</Label>
          <Col xs="6"><TextFeild fullWidth name="lastname" placeholder="Tên của nhân viên" /></Col>
        </Row>
        <Row>
          <Label sm={{ offset: 1 }} style={styles.label} for="firstname" xs="2">Gender</Label>
          <Col>
            <Label xs="6" check>
              <Input type="radio" name="gender" />{'Nam '}&nbsp; &nbsp; &nbsp;
              <Input type="radio" name="gender" />{'Nu'}
            </Label>
          </Col>
        </Row>
        <Row>
          <Label sm={{ offset: 1 }} style={styles.label} for="phone" xs="2">Phone number</Label>
          <Col xs="6"><TextFeild fullWidth name="phone" placeholder="Phone number" /></Col>
        </Row>
        <Row>
          <Label sm={{ offset: 1 }} style={styles.label} for="birthday" xs="2">Birthday</Label>
          <Col xs="6"><DatePicker fullWidth placeholder="Birthday" /></Col>
        </Row>
        <Row>
          <Label sm={{ offset: 1 }} style={styles.label} for="address" xs="2">Address</Label>
          <Col xs="6"><TextFeild fullWidth name="address" placeholder="Address" /></Col>
        </Row>
        <Row>
          <Label sm={{ offset: 1 }} style={styles.label} xs="2">Mật khẩu hiện tại</Label>
          <Col xs="6"><TextFeild type="password" name="password" placeholder="Mật khẩu hiện tại" /></Col>
        </Row>
        <Row>
          <Label sm={{ offset: 1 }} style={styles.label} xs="2"></Label>
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
