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
  }`,
];

export const mutation = [
  `createUser(
    user: CreateUserInput!
  ): User`,
];

export const resolvers = {
  Mutation: {
    async createUser(parent, { user }) {
      const newUser = await UsersService.createUser(user);
      return newUser;
    },
  },
};
