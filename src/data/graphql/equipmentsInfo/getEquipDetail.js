import { EquipmentModel } from '../../models/index.js';

export const schema = [
  `
  type Equipments {
    _id: String
    barcode: String
    equipmentTypeId: EquipmentInfo
  }
`,
];

export const queries = [
  `
  # list all equipment type has the same equipmentTypeId in db
  getAllPerTypeEquipment(equipmentTypeId: String!): [Equipments]
`,
];

export const resolvers = {
  RootQuery: {
    async getAllPerTypeEquipment(parent, {equipmentTypeId}) {
      return EquipmentModel.find({'equipmentTypeId': equipmentTypeId});
    },
  },
};