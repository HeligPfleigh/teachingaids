import { EquipmentModel } from '../../models/index.js';

export const schema = [
  `
  type Equipments {
    _id: String
    barcode: String
    sequenceNum: Int
    equipmentTypeId: String
    status: String
  }
`,
];

export const queries = [
  `
  # list all equipment type has the same equipmentTypeId in db
  getAllPerTypeEquipment(equipmentTypeId: String!): [Equipments]

  # get equipment has equipmentTypeId and status
  getEquipByStatusAndType(equipmentTypeId: String!, status: String!): [Equipments]

  #get all the equipment to counnt
  getNumberEquipment: Int
  

`,
];

export const resolvers = {
  RootQuery: {
    async getAllPerTypeEquipment(parent, { equipmentTypeId }) {
      return EquipmentModel.find({ equipmentTypeId });
    },
    async getEquipByStatusAndType(parent, { equipmentTypeId, status }) {
      return EquipmentModel.find({ equipmentTypeId, status });
    },
    async getNumberEquipment() {
       let array = await EquipmentModel.find();
        return array.length;
    }
  },
};
