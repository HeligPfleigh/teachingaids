import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';
import bcrypt from 'bcrypt';

// http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;

const { Schema } = mongoose;

const EmailSchema = new Schema({
  address: {
    type: String,
    required: true,
    sparse: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
}, {
  _id: false,
});

const ProfileSchema = new Schema({
  avatar: String,
  firstName: String,
  lastName: String,
  gender: Boolean,
  phone: String,
  birthDay: Date,
  address: String,
}, {
  _id: false,
});

const EmployeeInfoSchema = new Schema({
  group: String,
  teacherCode: String,
  professionalAssignment: String
}, {
  _id: false,
});

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  emails: EmailSchema,
  profile: ProfileSchema,
  employeeInfo: EmployeeInfoSchema,
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  role: {
    type: String,
    required: true,
    default: 'teacher',
  }
});

// plugins
UserSchema.plugin(timestamps);

/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};

/**
 * The pre-save hook method.
 */
UserSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();

  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      user.password = hash;
      return next();
    });
  });
});

const UserModel = mongoose.model('User', UserSchema, 'users');

export default UserModel;
