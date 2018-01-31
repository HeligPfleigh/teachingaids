import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import {
  Button,
  Collapse,
  Col,
  Label,
  Form,
  Row,
  ListGroupItem,
  ListGroup,
  Input,
} from 'reactstrap';
import TextFeild from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

import s from './Home.scss';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleProfile: true,
      togglePassword: false,
      toggleEmail: false,
    };
  }
  toggleProfile = () => {
    this.setState({
      toggleProfile: !this.state.toggleProfile,
    });
  }
  togglePassword = () => {
    this.setState({
      togglePassword: !this.state.togglePassword,
    });
  }
  toggleEmail = () => {
    this.setState({
      toggleEmail: !this.state.toggleEmail,
    });
  }
  render() {
    return (
      <ListGroup>
        <ListGroupItem color="info" className="profile" >
          <h6 onClick={this.toggleProfile} caret >Profile</h6>
        </ListGroupItem>
        <Collapse isOpen={this.state.toggleProfile} >
          <Form>
            <Row>
              <Label sm={{ offset: 1 }} for="firstname" xs="2">First Name</Label>
              <Col xs="6"><TextFeild name="firstname" placeholder="First name" /></Col>
            </Row>
            <Row>
              <Label sm={{ offset: 1 }} for="lastname" xs="2">Last Name</Label>
              <Col xs="6"><TextFeild name="lastname" placeholder="Last name" /></Col>
            </Row>
            <Row>
              <Label sm={{ offset: 1 }} for="firstname" xs="2">Gender</Label>
              <Col>
                <Label xs="6" check>
                  <Input type="radio" name="gender" />{'Nam '}&nbsp; &nbsp; &nbsp;
                  <Input type="radio" name="gender" />{'Nu'}
                </Label>
              </Col>
            </Row>
            <Row>
              <Label sm={{ offset: 1 }} for="phone" xs="2">Phone number</Label>
              <Col xs="6"><TextFeild name="phone" placeholder="Phone number" /></Col>
            </Row>
            <Row>
              <Label sm={{ offset: 1 }} for="birthday" xs="2">Birthday</Label>
              <Col xs="6"><DatePicker placeholder="Birthday" /></Col>
            </Row>
            <Row>
              <Label sm={{ offset: 1 }} for="address" xs="2">Address</Label>
              <Col xs="6"><TextFeild name="Address" placeholder="Address" /></Col>
            </Row>
            <Row>
              <Label sm={{ offset: 1 }} xs="2"></Label>
              <Col xs="6">
                <Button type="submit" color="success">Đồng ý</Button>{' '}
                <Button type="reset" color="danger">Hủy</Button>
              </Col>
            </Row>
          </Form>
        </Collapse>
        <ListGroupItem color="info" className="password">
          <h6 onClick={this.togglePassword} >Change Password</h6>
        </ListGroupItem>
        <Collapse isOpen={this.state.togglePassword}>
          <Form>
            <Row>
              <Label sm={{ offset: 1 }} xs="2">Current password</Label>
              <Col xs="6"><TextFeild type="password" placeholder="Current password" /></Col>
            </Row>
            <Row>
              <Label sm={{ offset: 1 }} xs="2">New password</Label>
              <Col xs="6"><TextFeild type="password" placeholder="New password" /></Col>
            </Row>
            <Row>
              <Label sm={{ offset: 1 }} xs="2">Confirm password</Label>
              <Col xs="6"><TextFeild type="password" placeholder="Confirm" /></Col>
            </Row>
            <Row>
              <Label sm={{ offset: 1 }} xs="2"></Label>
              <Col xs="6">
                <Button type="submit" color="success">Đồng ý</Button>{' '}
                <Button type="reset" color="danger">Hủy</Button>
              </Col>
            </Row>
          </Form>
        </Collapse>
        <ListGroupItem color="info" className="changeEmail">
          <h6 onClick={this.toggleEmail}>Change Email</h6>
        </ListGroupItem>
        <Collapse isOpen={this.state.toggleEmail}>
          <Form>
            <Row>
              <Label sm={{ offset: 1 }} xs="2">New Email</Label>
              <Col xs="6"><TextFeild placeholder="Email" /></Col>
            </Row>
            <Row>
              <Label sm={{ offset: 1 }} xs="2"></Label>
              <Col xs="6">
                <Button type="submit" color="success">Đồng ý</Button>{' '}
                <Button type="reset" color="danger">Hủy</Button>
              </Col>
            </Row>
          </Form>
        </Collapse>
      </ListGroup>
    );
  }
}

export default withStyles(s)(Account);
