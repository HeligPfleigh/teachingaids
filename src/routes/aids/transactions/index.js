import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';

import UserInfoStep from './UserInfo/UserInfoStep';
import DevicesStep from './Equipment/DevicesStep';
import { handleNext, handlePrev, resetTransaction } from '../../../actions/transactions';

@connect(({ transactions }) => ({
  stepIndex: transactions.stepIndex,
  finished: transactions.finished,
  isNextStep: transactions.isNextStep,
}), dispatch => ({
  handleNext: stepIndex => dispatch(handleNext(stepIndex)),
  handlePrev: stepIndex => dispatch(handlePrev(stepIndex)),
  resetTransaction: () => dispatch(resetTransaction()),
}))
class Transactions extends React.Component {

  // getStepContent = (stepIndex) => {
  //   switch (stepIndex) {
  //     case 0:
  //       return <InfoPage />;
  //     case 1:
  //       return <DevicesStep />;
  //     default:
  //       return <div>{"You're a long way from home sonny jim!"}</div>;
  //   }
  // }

  getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <UserInfoStep />;
      case 1:
        return <DevicesStep />;
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  resetTransaction = () => {
    this.props.resetTransaction();
  }

  handleNext = () => {
    const { stepIndex } = this.props;
    this.props.handleNext(stepIndex);
  }

  handlePrev = () => {
    const { stepIndex } = this.props;
    this.props.handlePrev(stepIndex);
  };

  render() {
    const { finished, stepIndex, isNextStep } = this.props;
    return (
      <div style={{ width: '95%', margin: 'auto' }}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Thông tin người dùng</StepLabel>
          </Step>
          <Step>
            <StepLabel>Các thiết bị</StepLabel>
          </Step>
          <Step>
            <StepLabel>Hoàn tất</StepLabel>
          </Step>
        </Stepper>

        <div style={{ margin: '0 16px' }}>

          {finished ? (
            <div>this is finished</div>
          ) : (
            <div>
              <div>{this.getStepContent(stepIndex)}</div>

              <div style={{ marginTop: '25px' }}>
                <RaisedButton
                  label="Hủy thao tác"
                  secondary
                  disabled={stepIndex < 1}
                  onClick={this.resetTransaction}
                  style={{ marginRight: 12 }}
                />
                <RaisedButton
                  label="Quay lại"
                  disabled={stepIndex === 0}
                  onClick={this.handlePrev}
                  style={{ marginRight: 12 }}
                />
                <RaisedButton
                  primary
                  disabled={!isNextStep}
                  onClick={this.handleNext}
                  label={stepIndex === 2 ? 'Hoàn thành' : 'Tiếp tục'}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Transactions.propTypes = {
  isNextStep: PropTypes.bool,
  stepIndex: PropTypes.number,
  finished: PropTypes.bool,
  handleNext: PropTypes.func,
  handlePrev: PropTypes.func,
  resetTransaction: PropTypes.func,
};

export default Transactions;
