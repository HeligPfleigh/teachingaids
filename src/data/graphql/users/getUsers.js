import { UserModel } from '../../models/index.js';
import UserServices from '../services/userServices';

export const schema = [
  `
  type User {
    _id: String
    username: String
    email: EmailSchema
    profile: UserProfile
    fullName: String
    roles: [String]
    isActive: String
    updatedAt: String
    createdAt: String
  }

  type EmailSchema {
    address: String
    verified: Boolean
  }

  type UserProfile {
    avatar: String
    firstName: String
    lastName: String
    fullName: String
    gender: Boolean
    phone: String
    birthDay: Date
    address: String
  }
`,
];

export const queries = [
  `
  # current user
  me: User

  # list all user in db
  getUsers: [User]

  # check user exist
  checkUserExist(query: String!): Boolean

  # find user by email
  getUserByEmail(email: String!): User

  # check exist user
  checkExistUser(query: String!): Boolean
`,
];

export const resolvers = {
  RootQuery: {
    async me({ request }) {
      return UserModel.findOne({ _id: request.user.id });
    },
    async getUsers() {
      return UserModel.find();
    },
    async checkUserExist(parent, { query }) {
      return await UserServices.checkExistUser({ query });
    },
    async getUserByEmail(parent, { email }) {
      return UserModel.findOne({ 'email.address': email });
    },
    async checkExistUser(parent, { query }) {
      return await UserServices.checkExistUser({ query });
    },
  },
  UserProfile: {
    fullName(profile) {
      return `${(profile && profile.firstName) || 'no'} ${(profile && profile.lastName) || 'name'}`;
    },
  },
  User: {
    isActive(user) {
      return user && user.isActive ? 'Active' : 'InActive';
    },
    fullName({ profile }) {
      return `${(profile && profile.firstName) || 'no'} ${(profile && profile.lastName) || 'name'} - ${(profile && profile.phone) || 'name'}`;
    },
  },
};
