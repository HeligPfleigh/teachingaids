import isUndefined from 'lodash/isUndefined';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { generate as idRandom } from 'shortid';
import moment from 'moment';
import { UserModel } from '../../models/index.js';
import { generateUserSearchField } from '../../../utils/removeToneVN.js';

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
  console.log(userId, query);
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

async function updateProfile(userId, profile) {
  if (isUndefined(userId)) {
    throw new Error('userId is undefined');
  }

  if (!await UserModel.findOne({ _id: new ObjectId(userId) })) {
    throw new Error('userId does not exist');
  }

  if (isUndefined(profile)) {
    throw new Error('profile is undefined');
  }

  if (isUndefined(profile.gender)) {
    throw new Error('gender is undefined');
  }

  if (isUndefined(profile.picture)) {
    throw new Error('picture is undefined');
  }

  if (isUndefined(profile.firstName)) {
    throw new Error('firstName is undefined');
  }

  if (isUndefined(profile.lastName)) {
    throw new Error('lastName is undefined');
  }

  await UserModel.update({ _id: userId }, { $set: { profile } });

  return UserModel.findOne({ _id: userId });
}

async function createUser(params) {
  const {
    username,
    password = 'Mtt2016a@',
    profile: { phone },
    email: {
      address: emailAddress,
    },
  } = params;

  if (isUndefined(username)) {
    params.username = 'hellokiukiu';
  }


  if (isUndefined(emailAddress)) {
    throw new Error('email is undefined');
  }

  if (await UserModel.findOne({ username })) {
    throw new Error('username is exist');
  }

  if (await UserModel.findOne({ 'profile.phone': phone })) {
    throw new Error('Phone number is exist');
  }

  if (await UserModel.findOne({ 'email.address': emailAddress })) {
    throw new Error('Email address is exist');
  }

  params.password = await bcrypt.hashSync(password, bcrypt.genSaltSync(), null);

  const activeCode = idRandom();
  params.email.code = activeCode;
  params.email.verified = true;

  params.profile.avatar = params.profile.avatar || '/avatar-default.jpg';

  params.search = generateUserSearchField(params);

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

async function changePassword({ username, password, oldPassword }) {
  if (isUndefined(username)) {
    throw new Error('Bạn chưa cung cấp tên đăng nhập');
  }

  if (isUndefined(password)) {
    throw new Error('Bạn chưa cung cấp mật khẩu mới');
  }

  const user = await UserModel.findOne({ username });
  if (isEmpty(user)) {
    throw new Error('Tài khoản không tồn tại');
  }

  if (!isEmpty(oldPassword)) {
    const validPassword = await bcrypt.compare(oldPassword, user.password.value);
    if (!validPassword) {
      throw new Error('Mật khẩu hiện tại không đúng');
    }
  }

  const passwordVal = await bcrypt.hashSync(password, bcrypt.genSaltSync(), null);
  const result = await UserModel.findOneAndUpdate({ username }, {
    $set: {
      'password.code': '',
      'password.counter': 0,
      'password.value': passwordVal,
      'password.updatedAt': new Date(),
    },
  });

  return result;
}

export default {
  checkExistUser,
  activeUser,
  getUser,
  createUser,
  updateProfile,
  changePassword,
};
