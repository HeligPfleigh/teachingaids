import EquipmentStatusServices from '../services/equipmentStatusServices';

export const mutation = [
  `createEquipmentStatus(
    name: String!
  ): EquipmentStatus

  updateEquipmentStatus(
    _id: String!
    name: String!
  ): EquipmentStatus

  deleteEquipmentStatus(
    _id: String!
  ): Boolean
  `,
];

export const resolvers = {
  Mutation: {
    async createEquipmentStatus(parent, { name }) {
      return await EquipmentStatusServices.createEquipmentStatus(name);
    },
    async updateEquipmentStatus(parent, { _id, name }) {
      return await EquipmentStatusServices.updateEquipmentStatus(_id, name);
    },
    async deleteEquipmentStatus(parent, { _id }) {
      return await EquipmentStatusServices.deleteEquipmentStatus(_id);
    },
  },
};
