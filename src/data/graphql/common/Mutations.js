import CommonServices from '../services/commonServices';

export const schema = [
  `
  input TransactionInput {
    userId: String!
    items: [String]
  }

  type TransactionResult {
    type: String
    status: String
  }
`,
];

export const mutation = [
  `
  # transaction
  transaction(input: TransactionInput!): TransactionResult
`,
];

export const resolvers = {
  Mutation: {
    async transaction({ request }, { input: { userId, items } }) {
      if (!request.user) {
        return {
          user: {},
          type: 'error',
          status: 'Người dùng chưa đăng nhập hệ thống',
        };
      }

      return await CommonServices.transaction({
        userId,
        items,
        ownerUser: request.user.id,
      });
    },
  },
};
