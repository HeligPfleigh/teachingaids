import EquipmentModel from '../../models/equipment.js';

export const schema = [
`
  type BarcodeNumber {
    barcode: String,
    _id: String,
    equipmentTypeId: String    
  }
`,
];

export const queries = [
`
  # find equipment status by primary key
  getEquipmentDetailByBarcode( barcode: String): [BarcodeNumber]
`
];

export const resolvers = {
  RootQuery: {
    async getEquipmentDetailByBarcode(parent, { barcode }) {
      return EquipmentModel.find({barcode});
    }
  },
};
