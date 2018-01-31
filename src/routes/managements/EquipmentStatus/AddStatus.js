import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { Field, reduxForm } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import NotificationDoNotDisturbAlt from 'material-ui/svg-icons/notification/do-not-disturb-alt';
import ActionExtension from 'material-ui/svg-icons/action/extension';
import isEmpty from 'lodash/isEmpty';
import { cyan600, fullWhite } from 'material-ui/styles/colors';

import createApolloClient from '../../../core/createApolloClient/createApolloClient.client';
import { InputField } from '../../../components/ReduxForm';
import { required, longLength } from '../../../utils/form.validator.util';
import { checkEquipmentStatusExist, addEquipmentStatus } from './graphql';

const apolloClient = createApolloClient();

const checkStatusExistFunc = async (name) => {
  if (!isEmpty(name)) {
    try {
      const { data: { checkEquipmentStatusExist: result } } = await apolloClient.query({
        query: checkEquipmentStatusExist,
        variables: { name },
      });
      return result;
    } catch (error) {
      return false;
    }
  }
  return false;
};

const asyncValidate = (fields) => {
  const { name } = fields;
  const fooBar = async () => {
    try {
      let result = {};
      if (await checkStatusExistFunc(name)) {
        result = { ...result, ...{ name: 'Tên trạng thái đã tồn tại...' } };
      }

      return result;
    } catch (error) {
      return new Error(error);
    }
  };
  return fooBar().catch(() => ({ _error: 'Lỗi kết nối...' }));
};

class AddStatusModal extends Component {

  handleClose = () => {
    this.props.reset();
    this.props.closeModal({
      showModal: false,
    });
  }

  buttonsGenerate = ({ pristine, submitting, handleSubmit, valid }) => [
    <RaisedButton
      label="Hủy thêm mới"
      secondary
      disabled={submitting}
      onTouchTap={this.handleClose}
      style={{ marginRight: '10px' }}
    />,
    <RaisedButton
      primary
      label="Thêm mới"
      onTouchTap={handleSubmit(this.handleSubmit)}
      disabled={!valid || pristine || submitting}
    />,
  ];

  titleGenerate = () => (
    <h1 style={{ color: fullWhite, backgroundColor: cyan600, marginBottom: 0 }}>
      <ActionExtension style={{ color: fullWhite }} /> Thêm mới trạng thái thiết bị
    </h1>
  );

  handleSubmit = (values) => {
    this.props.addEquipmentStatus({
      variables: values,
    }).then(({ data }) => {
      const { createEquipmentStatus: { name } } = data;
      alert(`Thêm mới thành công ${name}`);
      this.props.refetch();
      this.handleClose();
    }).catch(() => {
      alert('Thao tác thêm mới thất bại...');
    });
  }

  render() {
    const { showModal, error } = this.props;

    const alertStyles = {
      fontStyle: 'italic',
      color: 'white',
      fontSize: '1.1em',
      textAlign: 'center',
      marginBottom: '10px',
      padding: '6px',
      backgroundColor: '#E53935',
    };

    return (
      <Dialog
        modal
        open={showModal}
        autoScrollBodyContent
        title={this.titleGenerate()}
        actions={this.buttonsGenerate(this.props)}
        style={{ top: '-100px' }}
      >
        {
          error && <div style={alertStyles}>
            <NotificationDoNotDisturbAlt /> &nbsp;{error}
          </div>
        }
        <div>
          <Field
            fullWidth
            autoFocus
            name="name"
            component={InputField}
            label="Tên trạng thái"
            validate={[required, longLength]}
          />
        </div>
      </Dialog>
    );
  }
}

AddStatusModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  error: PropTypes.string,
  reset: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  addEquipmentStatus: PropTypes.any,
  refetch: PropTypes.func,
};

const AddEStatusForm = reduxForm({
  form: 'AddEStatusForm',
  asyncValidate,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  asyncBlurFields: ['name'],
})(compose(
  graphql(addEquipmentStatus, { name: 'addEquipmentStatus' }),
)(AddStatusModal));

export default AddEStatusForm;
