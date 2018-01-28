import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Field, reduxForm } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import NotificationDoNotDisturbAlt from 'material-ui/svg-icons/notification/do-not-disturb-alt';
import ActionExtension from 'material-ui/svg-icons/action/extension';
import isEmpty from 'lodash/isEmpty';
import { grey500, cyan600, fullWhite } from 'material-ui/styles/colors';

import {
  InputField,
  CheckboxField,
} from '../../../components/ReduxForm';
import {
  number,
  required,
  maxLength25,
  maxLength3,
  longLength,
} from '../../../utils/form.validator.util';
import createApolloClient from '../../../core/createApolloClient/createApolloClient.client';

const apolloClient = createApolloClient();

const checkExistBlock = async (buildingId, subjectName) => {
  if (!isEmpty(subjectName) && !isEmpty(buildingId)) {
    try {
      const { data: { checkExistBlock: result } } = await apolloClient.query({
        query: gql`query checkExistBlockQuery ($buildingId: String, $subjectName: String) {
          checkExistBlock (
            buildingId: $buildingId
            subjectName: $subjectName
          )
        }`,
        variables: {
          buildingId,
          subjectName,
        },
      });
      return result;
    } catch (error) {
      return false;
    }
  }
  return false;
};

const asyncValidate = (fields) => {
  const { buildingId, subjectName } = fields;
  const fooBar = async () => {
    try {
      let result = {};
      if (!isEmpty(subjectName) && await checkExistBlock(buildingId, subjectName)) {
        result = { ...result, ...{ subjectName: 'Tên tòa nhà đã tồn tại...' } };
      }

      return result;
    } catch (error) {
      return new Error(error);
    }
  };
  return fooBar().catch(() => ({ _error: 'Lỗi kết nối...' }));
};

class AddSubjectModal extends Component {

  handleClose = () => {
    this.props.reset();
    this.props.closeModal();
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
      <ActionExtension style={{ color: fullWhite }} /> Thêm mới môn học
    </h1>
  );

  handleSubmit = (values) => {
    console.log(values);

    // this.props.addBlock({
    //   variables: {
    //     input: values,
    //   },
    // }).then(({ data }) => {
    //   const { addBlock: { name: fullName } } = data;
    //   alert(`Them thanh cong ${fullName}`);
    // }).catch((e) => {
    //   console.log(e);
    //   alert('That bai');
    // });
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
        style={{ top: '58px' }}
      >
        {
          error && <div style={alertStyles}>
            <NotificationDoNotDisturbAlt /> &nbsp;{error}
          </div>
        }
        <div>
          <Field
            fullWidth
            name="subjectName"
            component={InputField}
            label="Tên tòa nhà"
            validate={[required, longLength]}
          />
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6">
            <Field
              fullWidth
              name="shortName"
              component={InputField}
              label="Tên viết tắt"
              validate={[maxLength25]}
            />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-6">
            <Field
              fullWidth
              name="prefix"
              component={InputField}
              label="Tiền tố"
              validate={[maxLength3]}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6">
            <Field
              fullWidth
              name="totalFloors"
              component={InputField}
              label="Số tầng"
              validate={[required, number]}
            />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-6">
            <Field
              fullWidth
              name="unitsPerFloor"
              component={InputField}
              label="Số Phòng / 1 Tầng"
              validate={[required, number]}
            />
          </div>
        </div>

        <div>
          <Field
            multiLine
            fullWidth
            label="Mô tả"
            name="description"
            component={InputField}
          />
        </div>

        <div style={{ paddingTop: '10px' }}>
          <Field
            type="checkbox"
            name="isInitApartment"
            component={CheckboxField}
            label="Có khởi tạo căn hộ cho tòa nhà?"
          />
        </div>
      </Dialog>
    );
  }
}

AddSubjectModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  error: PropTypes.string,
  reset: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const addSubjectMutation = gql`
  mutation createSubject($name: String!) {
    createSubject(name: $name) {
      _id
      name
      uniqueName
    }
  }
`;

const AddSubjectForm = reduxForm({
  form: 'AddSubjectForm',
  asyncValidate,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  asyncBlurFields: ['subjectName'],
})(compose(
  graphql(addSubjectMutation, { name: 'addSubject' }),
)(AddSubjectModal));

export default AddSubjectForm;
