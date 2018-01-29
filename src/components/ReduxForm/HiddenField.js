import React from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';

class renderHiddenField extends React.Component {
  componentWillMount() {
    const { onFill, input } = this.props;
    if (isFunction(onFill)) {
      onFill(input.value);
    }
  }

  componentDidUpdate(prevProps) {
    const { onFill, input } = this.props;
    if (isFunction(onFill) && input.value !== prevProps.input.value) {
      onFill(input.value);
    }
  }

  render() {
    return null;
  }
}

renderHiddenField.propTypes = {
  input: PropTypes.object.isRequired,
  onFill: PropTypes.func,
};

export default renderHiddenField;
