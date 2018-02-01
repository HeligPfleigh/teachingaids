import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import InfoPage from './Info/InfoPage';
import DevicePage from './Equipment/DevicePage';
import { getUser, getAllEquipment } from './graphql';

class AidBorrow extends React.Component {

  static propTypes={
    users: PropTypes.object.isRequired,
    equipment: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.handleSaveInfo = this.handleSaveInfo.bind(this);
    this.handleSaveEquipment = this.handleSaveEquipment.bind(this);
  }
  state = {
    finished: false,
    stepIndex: 0,
    infoSave: null,
    equipmentSave: [],
    next: false,
    next1: false,
  };

  getStepContent(stepIndex) {
    const { users, equipment } = this.props;
    const { infoSave, equipmentSave } = this.state;
    // console.log(users);
    switch (stepIndex) {
      case 0:
        return (<InfoPage
          users={users}
          infoSave={infoSave}
          handleSaveInfo={this.handleSaveInfo}
        />);
      case 1:
        return (<DevicePage
          equipment={equipment}
          equipmentSave={equipmentSave}
          handleSaveEquipment={this.handleSaveEquipment}
        />);
      default:
        console.log(this.state.equipmentSave);
        return <div>You're a long way from home sonny jim!</div>;
    }
  }

  handleSaveInfo = infoSave => this.setState({ ...this.state, infoSave, next: true });

  handleSaveEquipment = equipmentSave => this.setState({
    ...this.state,
    equipmentSave,
    next1: equipmentSave.length > 0 });

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  render() {
    const { finished, stepIndex, next, next1 } = this.state;
    const contentStyle = { margin: '0 16px' };
    return (
      <div style={{ width: '95%', margin: 'auto' }}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Thông tin người mượn</StepLabel>
          </Step>
          <Step>
            <StepLabel>Các thiết bị</StepLabel>
          </Step>
          <Step>
            <StepLabel>Hoàn tất</StepLabel>
          </Step>
        </Stepper>

        <div style={contentStyle}>

          {finished ? (
            <div>this is finished</div>
          ) : (
            <div>
              <div>{this.getStepContent(stepIndex)}</div>

              <div style={{ marginTop: 12 }}>
                {
                  stepIndex !== 0
                  &&
                  <FlatButton
                    label="Back"
                    onClick={this.handlePrev}
                    style={{ marginRight: 12 }}
                  />
                }
                {
                 ((stepIndex === 0 && next) || (next1))
                 &&
                 <RaisedButton
                   label={stepIndex === 2 ? 'Finish' : 'Next'}
                   primary
                   onClick={this.handleNext}
                 />
                }
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
});

export default compose(
    graphql(getUser, { name: 'users' }),
    graphql(getAllEquipment, { name: 'equipment' }),
    connect(mapStateToProps))(AidBorrow);
