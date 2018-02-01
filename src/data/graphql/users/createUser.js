import UsersService from '../services/userServices';

export const schema = [
  `input EmailInput {
    address: String!
    verified: Boolean
  }

  input ProfileInput {
    avatar: String
    firstName: String
    lastName: String
    gender: Boolean
    phone: String
    birthDay: Date
    address: String
  }

  input CreateUserInput {
    email: EmailInput!
    password: String
    username: String
    profile: ProfileInput!
  }

  type changeUserInfoResult {
    status: String
    user: User
    type: String
  }
  `,
];

export const mutation = [`
  # Create new user
  createUser(
    user: CreateUserInput!
  ): User

  # Change email user
  changeUserEmail(
    password: String!,
    email: String!
  ): changeUserInfoResult

  # Change password user
  changeUserPassword(
    oldPassword: String!,
    newPassword: String!
  ): changeUserInfoResult

`];

export const resolvers = {
  Mutation: {
    async createUser(parent, { user }) {
      const newUser = await UsersService.createUser(user);
      return newUser;
    },
    async changeUserEmail({ request }, { password, email }) {
      if (!request.user) {
        return {
          user: {},
          type: 'error',
          status: 'Người dùng chưa đăng nhập hệ thống',
        };
      }

      return await UsersService.changeUserEmail({
        email,
        password,
        userId: request.user.id,
      });
    },
    async changeUserPassword({ request }, { oldPassword, newPassword }) {
      if (!request.user) {
        return {
          user: {},
          type: 'error',
          status: 'Người dùng chưa đăng nhập hệ thống',
        };
      }

      return await UsersService.changeUserPassword({
        oldPassword,
        newPassword,
        userId: request.user.id,
      });
    },
  },
};
