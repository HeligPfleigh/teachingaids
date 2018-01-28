import React from 'react';
import PropTypes from 'prop-types';
import { RadioButtonGroup } from 'material-ui/RadioButton';

const renderRadioGroupField = ({ input, ...props }) => (
  <RadioButtonGroup
    {...input}
    {...props}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

renderRadioGroupField.propTypes = {
  input: PropTypes.object.isRequired,
};

export default renderRadioGroupField;
