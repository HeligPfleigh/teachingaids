import EquipInfoService from '../services/equipInfoServices';

export const mutation = [
  `updateTotalNumberEquipmentInfo(
    _id: String!, 
    totalNumber: String!): EquipmentType
  `,
];

export const resolvers = {
  Mutation: {
    async updateTotalNumberEquipmentInfo(parent, { _id, totalNumber }) {
      return await EquipInfoService.updateAmountOfEquipmentType(_id, totalNumber);
    },
  },
};
