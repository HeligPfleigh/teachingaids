import EquipmentStatusServices from '../services/equipmentStatusServices';

export const schema = [
  `
  type EquipmentStatus {
    _id: String
    name: String
    uniqueName: String
  }
`,
];

export const queries = [
  `
  # check equipment status exist
  checkEquipmentStatusExist(name: String!): Boolean

  # find equipment status by primary key
  getEquipmentStatusById(_id: String!): EquipmentStatus

  # list all equipment status in db
  getEquipmentStatus: [EquipmentStatus]
`,
];

export const resolvers = {
  RootQuery: {
    async checkEquipmentStatusExist(parent, { name }) {
      return await EquipmentStatusServices.checkEquipmentStatusExist(name);
    },
    async getEquipmentStatus() {
      return await EquipmentStatusServices.getEquipmentStatus();
    },
    async getEquipmentStatusById(parent, { _id }) {
      return await EquipmentStatusServices.getEquipmentStatusById(_id);
    },
  },
};
