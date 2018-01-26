import SubjectService from '../services/subjectServices';

export const mutation = [
  `createSubject(
    name: String!
  ): Subject

  updateSubject(
    _id: String!
    name: String!
  ): Subject

  deleteSubject(
    _id: String!
  ): Boolean
  `,
];

export const resolvers = {
  Mutation: {
    async createSubject(parent, { name }) {
      return await SubjectService.createSubject(name);
    },
    async updateSubject(parent, { _id, name }) {
      return await SubjectService.updateSubject(_id, name);
    },
    async deleteSubject(parent, { _id }) {
      return await SubjectService.deleteSubject(_id);
    },
  },
};
