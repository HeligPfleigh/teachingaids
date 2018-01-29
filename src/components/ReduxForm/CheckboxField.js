import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';

const renderCheckboxField = ({ input, label, props }) => (
  <Checkbox
    label={label}
    {...input}
    value={input.value ? 'on' : 'off'}
    onChange={(e, { checked }) => input.onChange(checked)}
    {...props}
  />
);

renderCheckboxField.propTypes = {
  props: PropTypes.any,
  label: PropTypes.string,
  input: PropTypes.object.isRequired,
};

export default renderCheckboxField;
