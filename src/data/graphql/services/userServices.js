import isUndefined from 'lodash/isUndefined';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import bcrypt from 'bcrypt';
import moment from 'moment';
import { generate as idRandom } from 'shortid';
import { UserModel } from '../../models/index.js';
import removeToneVN, { generateUserSearchField } from '../../../utils/removeToneVN.js';

async function getUser(userId) {
  const user = await UserModel.findOne({ _id: userId });
  if (!user) {
    throw new Error('not found user request');
  }
  return user;
}

async function checkExistUser({ userId, query }) {
  // Case 1: Only check exist user by key
  // -> use verify user with key
  if (userId && !query) {
    try {
      const user = await UserModel.findById(userId);
      if (isEmpty(user)) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  // Case 2: Check exist user by username
  // -> use create new or update
  const options = {
    $or: [
      { username: query },
      { 'profile.phone': query },
      { 'email.address': query },
    ],
  };

  const user = await UserModel.findOne(options);
  if (
    (isEmpty(user)) ||
    (userId && isEqual(userId, user._id.toString()))
  ) {
    return false;
  }

  return true;
}

async function changeUserProfile({ userId, password, profile }) {
  const result = {
    user: {},
    type: 'error',
    status: 'Cập nhật thông tin người dùng thành công!',
  };

  const currentUser = await UserModel.findById(userId);
  if (!currentUser) {
    return {
      ...result,
      status: 'Người dùng không tồn tại',
    };
  }

  if (isUndefined(profile)) {
    return {
      ...result,
      status: 'Bạn chưa cung cấp thông tin cần thay đổi',
    };
  }

  if (isUndefined(profile.gender)) {
    return {
      ...result,
      status: 'Thiếu thông tin giới tính',
    };
  }

  if (isUndefined(profile.firstName)) {
    return {
      ...result,
      status: 'Chưa nhập họ của người dùng',
    };
  }

  if (isUndefined(profile.lastName)) {
    return {
      ...result,
      status: 'Chưa nhập tên người dùng',
    };
  }

  if (isUndefined(profile.phone)) {
    return {
      ...result,
      status: 'Chưa nhập số điện thoại',
    };
  }

  if (isUndefined(profile.birthDay)) {
    return {
      ...result,
      status: 'Chưa cung cấp ngày sinh',
    };
  }

  if (isUndefined(profile.address)) {
    return {
      ...result,
      status: 'Chưa nhập địa chỉ người dùng',
    };
  }

  if (isUndefined(password)) {
    return {
      ...result,
      status: 'Chưa nhập cung cấp mật khẩu',
    };
  }

  const validPassword = await bcrypt.compare(password, currentUser.password);
  if (!validPassword) {
    return {
      ...result,
      status: 'Mật khẩu hiện tại không đúng',
    };
  }

  const newUser = await UserModel.findByIdAndUpdate({
    _id: userId,
  }, {
    $set: {
      ...currentUser.profile,
      profile,
    },
  });

  return {
    ...result,
    type: 'success',
    user: newUser,
  };
}

async function createUser(params) {
  const {
    username,
    password,
    profile: { phone },
    email: {
      address: emailAddress,
    },
  } = params;

  if (isUndefined(username)) {
    throw new Error('username is undefined');
  }


  if (isUndefined(emailAddress)) {
    throw new Error('email is undefined');
  }

  const { firstName, lastName } = params.profile;
  let newUserName = `${removeToneVN(lastName.replace(' ', ''))}.${removeToneVN(firstName.replace(' ', ''))}`;
  newUserName = newUserName.replace(' ', '').toLowerCase();

  if (await UserModel.findOne({ newUserName })) {
    newUserName = `${newUserName}.${Math.random(1000)}`;
    // throw new Error('username is exist');
  }

  if (await UserModel.findOne({ 'profile.phone': phone })) {
    throw new Error('Phone number is exist');
  }

  if (await UserModel.findOne({ 'email.address': emailAddress })) {
    throw new Error('Email address is exist');
  }

  params.password = await bcrypt.hashSync(password, bcrypt.genSaltSync(), null);

  params.username = newUserName;

  const activeCode = idRandom();
  params.email.code = activeCode;
  params.email.verified = true;

  params.profile.avatar = params.profile.avatar || '/avatar-default.jpg';

  params.search = generateUserSearchField(params);
  params.isNewUser = true;

  const user = await UserModel.create(params);

  return user;
}

async function activeUser(params) {
  const {
    username,
    activeCode,
  } = params;

  if (isUndefined(username)) {
    throw new Error('username is undefined');
  }

  if (isUndefined(activeCode)) {
    throw new Error('code active is undefined');
  }

  if (!await UserModel.findOne({ username })) {
    throw new Error('Account is not exist');
  }

  const user = await UserModel.findOne({ username, 'email.code': activeCode });
  if (!user || isEmpty(user)) {
    throw new Error('Code active incorrect');
  }

  const updatedAt = moment(user.email.updatedAt || new Date());
  const duration = moment.duration(moment().diff(updatedAt));
  const hours = duration.asHours();

  if (hours > 24) {
    throw new Error('Code active expired');
  }

  const result = await UserModel.findOneAndUpdate({ _id: user._id }, {
    $set: {
      // status: 1,
      'email.code': '',
      'email.verified': true,
    },
  });

  return result;
}

async function changeUserPassword({ userId, oldPassword, newPassword }) {
  if (isUndefined(oldPassword)) {
    return {
      user: {},
      type: 'error',
      status: 'Bạn chưa cung cấp mật khẩu cũ',
    };
  }

  if (isUndefined(newPassword)) {
    throw new Error('Bạn chưa cung cấp mật khẩu mới');
  }

  const user = await UserModel.findById(userId);
  if (isEmpty(user)) {
    return {
      user: {},
      type: 'error',
      status: 'Tài khoản không tồn tại',
    };
  }

  if (!isEmpty(oldPassword)) {
    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      return {
        user: {},
        type: 'error',
        status: 'Mật khẩu hiện tại không đúng',
      };
    }
  }

  const passwordVal = await bcrypt.hashSync(newPassword, bcrypt.genSaltSync(), null);
  const result = await UserModel.findOneAndUpdate({ _id: userId }, {
    $set: {
      password: passwordVal,
      isNewUser: false,
    },
  });

  return {
    user: result,
    type: 'success',
    status: 'Thay đổi mật khẩu thành công',
  };
}

async function changeUserEmail({ userId, password, email }) {
  if (isUndefined(password)) {
    return {
      user: {},
      type: 'error',
      status: 'Bạn chưa cung cấp mật khẩu hiện tại',
    };
  }

  if (isUndefined(email)) {
    return {
      user: {},
      type: 'error',
      status: 'Bạn chưa cung cấp địa chỉ email',
    };
  }

  const currentUser = await UserModel.findById(userId);

  if (!currentUser) {
    return {
      user: {},
      type: 'error',
      status: 'Người dùng không tồn tại trên hệ thống',
    };
  }

  if (!isEmpty(currentUser.password)) {
    const validPassword = await bcrypt.compare(password, currentUser.password);
    if (!validPassword) {
      return {
        user: {},
        type: 'error',
        status: 'Mật khẩu hiện tại không đúng',
      };
    }
  }

  const user = await UserModel.findOne({
    $and: [
      { _id: { $ne: userId } },
      { 'email.address': email },
    ],
  });

  if (user) {
    return {
      user: {},
      type: 'error',
      status: 'Địa chỉ email đã được sử dụng bởi một tài khoản khác',
    };
  }

  const result = await UserModel.findOneAndUpdate({ _id: userId }, {
    $set: {
      'email.code': '',
      'email.address': email,
      'email.verified': true,
    },
  });

  return {
    user: result,
    type: 'success',
    status: 'Thay đổi địa chỉ email thành công',
  };
}

export default {
  checkExistUser,
  activeUser,
  getUser,
  createUser,
  changeUserProfile,
  changeUserPassword,
  changeUserEmail,
};
