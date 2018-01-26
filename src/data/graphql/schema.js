import merge from 'lodash/merge';

/** * Queries ** */
import {
  schema as userSchema,
  queries as userQueries,
  resolvers as userResolver,
} from './users/getUsers';

import {
  schema as subjectSchema,
  queries as subjectQueries,
  resolvers as subjectResolver,
} from './subjects/QueriesSubjects';

/** * Mutations ** */
import {
  schema as mutationUserSchema,
  mutation as userMutation,
  resolvers as mutationUserResolver,
} from './users/createUser';

import {
  mutation as subjectMutation,
  resolvers as mutationSubResolver,
} from './subjects/MutationSubject';

export const schema = [
  ...userSchema,
  ...mutationUserSchema,
  ...subjectSchema,
];

export const queries = [
  ...userQueries,
  ...subjectQueries,
];

export const mutations = [
  ...userMutation,
  ...subjectMutation,
];

export const resolvers = merge(
  userResolver,
  mutationUserResolver,
  subjectResolver,
  mutationSubResolver,
);
