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
import { checkEquipmentStatusExist, updateEquipmentStatus } from './graphql';

const apolloClient = createApolloClient();

const checkEquipmentStatusExistFunc = async (name) => {
  if (!isEmpty(name)) {
    try {
      const {
        data: { checkEquipmentStatusExist: result },
      } = await apolloClient.query({
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
  const { name, oldName } = fields;
  const fooBar = async () => {
    try {
      let result = {};
      if (name !== oldName && await checkEquipmentStatusExistFunc(name)) {
        result = { ...result, ...{ name: 'Tên trạng thái đã tồn tại...' } };
      }

      return result;
    } catch (error) {
      return new Error(error);
    }
  };
  return fooBar().catch(() => ({ _error: 'Lỗi kết nối...' }));
};

class EditStatusModal extends Component {

  handleClose = () => {
    this.props.reset();
    this.props.closeModal({
      editModal: false,
    });
  }

  buttonsGenerate = ({ pristine, submitting, handleSubmit, valid }) => [
    <RaisedButton
      label="Hủy cập nhật"
      secondary
      disabled={submitting}
      onTouchTap={this.handleClose}
      style={{ marginRight: '10px' }}
    />,
    <RaisedButton
      primary
      label="Cập nhật"
      onTouchTap={handleSubmit(this.handleSubmit)}
      disabled={!valid || pristine || submitting}
    />,
  ];

  titleGenerate = () => (
    <h1 style={{ color: fullWhite, backgroundColor: cyan600, marginBottom: 0 }}>
      <ActionExtension style={{ color: fullWhite }} /> Cập nhật thông tin trạng thái
    </h1>
  );

  handleSubmit = (values) => {
    const { _id, name } = values;
    this.props.updateEquipmentStatus({
      variables: { _id, name },
    }).then(({ data }) => {
      const { updateEquipmentStatus: { name: newName } } = data;
      alert(`Cập nhật thành công ${newName}!`);
      this.props.refetch();
      this.handleClose();
    }).catch(() => {
      alert('Thao tác cập nhật thất bại..!');
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

EditStatusModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  error: PropTypes.string,
  reset: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  updateEquipmentStatus: PropTypes.any,
  refetch: PropTypes.func,
};

const EditStatusModalForm = reduxForm({
  form: 'EditStatusModalForm',
  asyncValidate,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  asyncBlurFields: ['name'],
})(compose(
  graphql(updateEquipmentStatus, { name: 'updateEquipmentStatus' }),
)(EditStatusModal));

export default EditStatusModalForm;
