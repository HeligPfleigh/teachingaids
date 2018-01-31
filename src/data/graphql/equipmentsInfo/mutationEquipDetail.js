import EquipDetailService from '../services/equipDetailServices';

export const mutation = [
  `createEquipment(
    equipmentTypeId: String!
    quantity: Int!): [Equipments]
  `,
];

export const resolvers = {
  Mutation: {
    async createEquipment(parent, { equipmentTypeId, quantity }) {
      return await EquipDetailService.createEquipment(equipmentTypeId, quantity);
    },
  },
};
