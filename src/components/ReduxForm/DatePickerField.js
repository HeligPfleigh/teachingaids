import React from 'react';
import moment from 'moment';
import isDate from 'lodash/isDate';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';

let DateTimeFormat;
if (areIntlLocalesSupported(['vi', 'vi-VN'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/vi');
  require('intl/locale-data/jsonp/vi-VN');
}

const renderDatePickerField = ({
  input,
  label,
  meta: { touched, error, warn },
  ...props
}) => (
  <DatePicker
    {...input}
    {...props}
    DateTimeFormat={DateTimeFormat}
    locale="vi"
    okLabel="Chọn"
    cancelLabel="Huỷ"
    floatingLabelText={label || 'Chọn ngày sinh'}
    hintText={label || 'Chọn ngày sinh'}
    errorText={touched && (error || warn)}
    value={input.value !== '' ? new Date(input.value) : null}
    onFocus={(event) => {
      let value = event.target.value;
      if (!isEmpty(value) && !isDate(value)) {
        value = moment(value, 'DD/MM/YYYY').toDate();
      }
      input.onChange(value);
    }}
    onChange={(event, value) => input.onChange(value)}
  />
);

renderDatePickerField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default renderDatePickerField;
