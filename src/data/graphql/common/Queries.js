import CommonServices from '../services/commonServices';
import { EquipmentTypeModel } from '../../models/index.js';

export const schema = [
  `
  type EquipmentResult {
    _id: String
    barcode: String
    equipmentType: EquipmentType
    status: String
  }

  type EquipmentSearchResult {
    error: Boolean
    message: String
    type: String!
    items: [EquipmentResult]
  }
`,
];

export const queries = [
  `
  # search equipments
  searchEquipment(borrowerId: String, query: String): EquipmentSearchResult
`,
];

export const resolvers = {
  RootQuery: {
    async searchEquipment(parent, { borrowerId, query }) {
      return await CommonServices.searchEquipment({ borrowerId, query });
    },
  },
  EquipmentResult: {
    equipmentType({ equipmentTypeId }) {
      return EquipmentTypeModel.findById(equipmentTypeId).select('name unit subject');
    },
  },
};
