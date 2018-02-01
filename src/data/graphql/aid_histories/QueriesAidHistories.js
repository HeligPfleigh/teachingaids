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
    status: String
  }
`,
];

export const queries = [
  `
  # list all aid histories in db
  getAidHistories: [AidHistory]

  # get aid history of an equipment
  getAidHistoriesOfEquipmentType(equipmentTypeId: String): [AidHistory]

  # get aid history of a teacher
  getAidHistoriesOfTeacher(teacherId: String): [AidHistory]
`,
];

export const resolvers = {
  RootQuery: {
    async getAidHistories() {
      return await AidHistoryService.getAidHistories();
    },
    async getAidHistoriesOfEquipmentType(parent, { equipmentTypeId }) {
      return await AidHistoryService.getAidHistoriesOfEquipmentType(equipmentTypeId);
    },
    async getAidHistoriesOfTeacher(parent, { teacherId }) {
      return await AidHistoryService.getAidHistoriesOfTeacher(teacherId);
    },
  },
};
