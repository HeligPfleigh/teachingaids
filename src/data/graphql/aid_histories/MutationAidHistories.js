import createAidHistories from '../services/AidHistoryService';


export const mutation = [
  `createAidHistoried(
   lenserId: String!,
   borrowerId: String!,
   equipmentTypeId: String!
   returnTime: String!
   borrowTime: String!
    )`,
];

export const resolvers = {
  Mutation: {
    async createAidHistories(parent, prams) {
      return await createAidHistories(prams);
    },
  },
}
;
