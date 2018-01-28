import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...props
}) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    // eslint-disable-next-line
    children={children}
    {...props}
  />
);

renderSelectField.propTypes = {
  label: PropTypes.string,
  children: PropTypes.any.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default renderSelectField;
