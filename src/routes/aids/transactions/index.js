import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';
import RaisedButton from 'material-ui/RaisedButton';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import { graphql, compose } from 'react-apollo';

import UserInfoStep from './UserInfo/UserInfoStep';
import DevicesStep from './Equipment/DevicesStep';
import FinishStep from './FinishStep';
import { transactionMutation } from './graphql';
import Modal from '../../../components/Modal';
import { handleNext, handlePrev, resetTransaction } from '../../../actions/transactions';

@compose(
  graphql(transactionMutation, { name: 'transactionFunc' }),
  connect(({ transactions }) => ({
    stepIndex: transactions.stepIndex,
    finished: transactions.finished,
    isNextStep: transactions.isNextStep,
    userInfo: transactions.user,
    selectItems: transactions.selectItems,
  }), dispatch => ({
    handleNext: stepIndex => dispatch(handleNext(stepIndex)),
    handlePrev: stepIndex => dispatch(handlePrev(stepIndex)),
    resetTransaction: () => dispatch(resetTransaction()),
  })),
)
class Transactions extends React.Component {

  state = {
    showModal: false,
    isSubmit: false,
  };

  getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <UserInfoStep />;
      case 1:
        return <DevicesStep />;
      case 2:
        return <FinishStep />;
      default:
        return '';
    }
  }

  resetTransaction = () => {
    this.props.resetTransaction();
  }

  handleNext = async () => {
    const { stepIndex } = this.props;
    if (stepIndex === 2) {
      this.confirmMoal();
      return;
    }
    this.props.handleNext(stepIndex);
  }

  handlePrev = () => {
    const { stepIndex } = this.props;
    this.props.handlePrev(stepIndex);
  };

  confirmMoal = () => {
    this.setState({
      showModal: true,
      modelContent: 'Bạn có muốn tiếp tục thao tác?',
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
      isSubmit: false,
      modelContent: '',
    });
  };

  submit = () => {
    const { stepIndex, transactionFunc } = this.props;
    if (stepIndex === 2) {
      const { userInfo: { _id }, selectItems } = this.props;
      const ids = map(selectItems, '_id');
      this.setState({
        isSubmit: true,
        modelContent: 'Giao dịch được được xử lý. Vui lòng đợi trong giây lát..!',
      });

      transactionFunc({
        variables: {
          input: { userId: _id, items: ids },
        },
      }).then(({ data }) => {
        console.log(data);
        const { transaction: { status, type } } = data;
        this.setState({
          modelContent: status,
        });
        if (type !== 'error') {
          this.resetTransaction();
        }
      }).catch(() => {
        this.setState({
          modelContent: 'Giao dịch thất bại, vui lòng liên hệ quản trị viên để được hỗ trợ..!',
        });
      });
    }
  }

  render() {
    const actions = [
      <RaisedButton
        secondary
        label="Hủy"
        keyboardFocused
        onTouchTap={this.handleClose}
      />,
    ];

    if (!this.state.isSubmit) {
      actions.push(<RaisedButton
        primary
        label="Xách nhận"
        onTouchTap={this.submit}
        style={{ marginLeft: '10px' }}
      />);
    }

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
                  disabled={!isNextStep && stepIndex !== 2}
                  onClick={this.handleNext}
                  label={stepIndex === 2 ? 'Hoàn thành' : 'Tiếp tục'}
                />
              </div>
            </div>
          )}
        </div>
        {
          this.state.showModal &&
          <Modal
            isOpen={this.state.showModal}
            title="Xác nhận thêm mới!"
            actions={actions}
          >
            { this.state.modelContent }
          </Modal>
        }
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
  userInfo: PropTypes.any,
  selectItems: PropTypes.any,
  transactionFunc: PropTypes.func,
};

export default Transactions;
