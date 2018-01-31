import React from 'react';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const renderRadioGroupField = ({ options, styles, input, ...props }) => (
  <RadioButtonGroup
    {...input}
    {...props}
    valueSelected={input.value}
  >
    {
      options.map((option, index) =>
        <RadioButton
          key={index}
          style={styles}
          value={option.value}
          label={option.label}
          onClick={() => {
            input.onChange(option.value);
          }}
        />,
      )
    }
  </RadioButtonGroup>
);

renderRadioGroupField.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.any.isRequired,
  styles: PropTypes.any,
};

export default renderRadioGroupField;
