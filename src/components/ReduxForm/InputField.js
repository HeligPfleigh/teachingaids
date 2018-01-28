import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const renderInputField = ({
  input,
  label,
  meta: { touched, error, warn },
  ...props
}) => (
  <TextField
    {...input}
    {...props}
    hintText={label}
    floatingLabelText={label}
    errorText={touched && (error || warn)}
  />
);

renderInputField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default renderInputField;

