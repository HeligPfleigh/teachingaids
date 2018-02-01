import AidHistoryService from '../services/AidHistoryService';

export const mutation = [
  `createAidHistories(
    lenderId: String!
    borrowerId: String!
  ): AidHistory
  `,
];

export const resolvers = {
  Mutation: {
    async createAidHistories(parent, { lenderId, borrowerId }) {
      return await AidHistoryService.createAidHistories(lenderId, borrowerId);
    },
  },
};

