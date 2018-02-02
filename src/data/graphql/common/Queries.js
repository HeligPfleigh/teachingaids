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
    type: String!
    items: [EquipmentResult]
  }
`,
];

export const queries = [
  `
  # search equipments
  searchEquipment(query: String): EquipmentSearchResult
`,
];

export const resolvers = {
  RootQuery: {
    async searchEquipment(parent, { query }) {
      return await CommonServices.searchEquipment(query);
    },
  },
  EquipmentResult: {
    equipmentType({ equipmentTypeId }) {
      return EquipmentTypeModel.findById(equipmentTypeId).select('name unit subject');
    },
  },
};
