import { EquipmentTypeModel } from '../../models/index.js';

export const schema = [
  `
  type EquipmentType {
    _id: String
    name: String
    equipmentInfo: EquipmentInfo
    totalNumber: String
    unit: String
    order: String
  }

  type EquipmentInfo {
    madeFrom: String
    grade: String
    khCode: String
  }
`,
];

export const queries = [
  `
  # list all equipment type in db
  getAllEquipment: [EquipmentType]

  # get name from equipment id
  getNameFromID(_id: String): EquipmentType
`,
];

export const resolvers = {
  RootQuery: {
    async getAllEquipment() {
      return EquipmentTypeModel.find();
    },
    async getNameFromID(parent, {_id}){
      return EquipmentTypeModel.findOne({_id: _id});
    }
  },
};
