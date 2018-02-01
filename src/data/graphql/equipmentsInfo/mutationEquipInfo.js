import EquipInfoService from '../services/equipInfoServices';

export const mutation = [
  `
  updateTotalNumberEquipmentInfo(
    _id: String!, 
    totalNumber: String!
  ): EquipmentType

  createEquipmentInfo(
    name: String!,
    madeFrom: String!,
    grade: String!,
    khCode: String!,
    unit: String!,
    subject: String!
  ): EquipmentType
  `,
];

export const resolvers = {
  Mutation: {
    async updateTotalNumberEquipmentInfo(parent, { _id, totalNumber }) {
      return await EquipInfoService.updateAmountOfEquipmentType(_id, totalNumber);
    },
    async createEquipmentInfo(parent, { name, madeFrom, grade, khCode, unit, subject }) {
      return await EquipInfoService.createEquipmentType(name, madeFrom, grade, khCode, unit, subject);
    },
  },
};
