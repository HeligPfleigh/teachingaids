import EquipDetailService from '../services/equipDetailServices';

export const mutation = [
  `createEquipment(
    barcode: String!, 
    equipmentTypeId: String!): Equipments
  `,
];

export const resolvers = {
  Mutation: {
    async createEquipment(parent, { barcode, equipmentTypeId }) {
      return await EquipDetailService.createSubject(barcode, equipmentTypeId);
    },
  },
};
