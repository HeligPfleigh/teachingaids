import validator from 'validator';

export default {
  normal: (value) => {
    if (validator.isEmpty(value)) {
      return 'Không được để trống';
    }

    if (!validator.isLength(value, { min: 3, max: 250 })) {
      return 'Tài khoản phải từ 3 - 250 kí tự';
    }

    return '';
  },
  username: (value) => {
    if (validator.isEmpty(value)) {
      return 'Không được để trống';
    }

    if (!validator.isLength(value, { min: 5, max: 25 })) {
      return 'Tài khoản phải từ 5 - 25 kí tự';
    }

    if ((!validator.isAlphanumeric(value) && !validator.isAlpha(value))
      && !validator.matches(value, /^[\w.]+$/g)) {
      return 'Tài khoản có chứa kí tự đặc biệt';
    }

    if (validator.isNumeric(value.charAt(0))) {
      return 'Kí tự đầu tiền phải là chữ';
    }

    return '';
  },
  password: (value) => {
    if (validator.isEmpty(value)) {
      return 'Không được để trống';
    }

    if (!validator.isLength(value, { min: 5, max: 25 })) {
      return 'Mật khẩu phải từ 5 - 25 kí tự';
    }

    if (!(/\d/.test(value)) || !(/[A-Z]/.test(value))) {
      return 'Mật khẩu phải chứa kí tự in hoa và chữ số';
    }

    return '';
  },
};
