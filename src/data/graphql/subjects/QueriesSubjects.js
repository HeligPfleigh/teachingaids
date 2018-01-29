import SubjectService from '../services/subjectServices';

export const schema = [
  `
  type Subject {
    _id: String
    name: String
    uniqueName: String
  }
`,
];

export const queries = [
  `
  # check subject exist
  checkSubjectExist(name: String!): Boolean

  # find subject by primary key
  getSubjectById(_id: String!): Subject

  # list all subject in db
  getSubjects: [Subject]
`,
];

export const resolvers = {
  RootQuery: {
    async checkSubjectExist(parent, { name }) {
      return await SubjectService.checkSubjectExist(name);
    },
    async getSubjects() {
      return await SubjectService.getSubjects();
    },
    async getSubjectById(parent, { _id }) {
      return await SubjectService.getSubject(_id);
    },
  },
};
