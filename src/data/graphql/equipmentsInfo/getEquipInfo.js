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
    subject: String
  }

  type EquipmentInfo {
    madeFrom: String
    grade: String
    khCode: String
  }

  type PageInfoWithSkip {
    page: Int
    hasNextPage: Boolean
    total: Int
    limit: Int
  }

  type EquipmentPaggingResult {
    pageInfo: PageInfoWithSkip
    edges: [EquipmentType]
  }
`,
];

export const queries = [
  `
  # list all equipment type in db
  getAllEquipment: [EquipmentType]

  equipments(page: Int, limit: Int): EquipmentPaggingResult

  # get name from equipment id
  getNameFromID(_id: String): EquipmentType
`,
];

export const resolvers = {
  RootQuery: {
    async getAllEquipment() {
      return EquipmentTypeModel.find();
    },
    async equipments(context, { page = 1, limit = 3 }) {
      console.log({ limit, page });
      const skip = (page - 1) * limit;
      const count = await EquipmentTypeModel.find().count();
      const data = await EquipmentTypeModel.find().skip(skip).limit(limit);
      const hasNextPage = data.length === limit;
      return {
        pageInfo: {
          total: count,
          limit,
          page: page + 1,
          hasNextPage,
        },
        edges: data,
      };
    },
    async getNameFromID(parent, { _id }) {
      return EquipmentTypeModel.findOne({ _id });
    },
  },
};
