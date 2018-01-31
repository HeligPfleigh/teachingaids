import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  options,
  ...props
}) => (
  <SelectField
    {...input}
    {...props}
    floatingLabelText={label}
    errorText={touched && error}
    onChange={(event, index, value) => input.onChange(value)}
  >
    {options.map((option, index) => <MenuItem key={index} value={option.value} primaryText={option.label} />)}
  </SelectField>
);

renderSelectField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default renderSelectField;
