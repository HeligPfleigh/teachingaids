import AidHistoryService from '../services/AidHistoryService';

export const schema = [
  `
  type LenderHistory {
    userId: String
    name: String
  }
  type BorrowerHistory {
    userId: String
    name: String
    teacherCode: String
  }
  type EquipmentHistory {
    equipmentTypeId: String
    equipmentId: String
    name: String
    barCode: String
  }
  type AidHistory {
    _id: String
    lender: LenderHistory
    borrower: BorrowerHistory
    borrowTime: Date
    returnTime: Date
    equipment: EquipmentHistory
  }
`,
];

export const queries = [
  `
  # list all aid histories in db
  getAidHistories: [AidHistory]
`,
];

export const resolvers = {
  RootQuery: {
    async getAidHistories() {
      return await AidHistoryService.getAidHistories();
    },
  },
};
