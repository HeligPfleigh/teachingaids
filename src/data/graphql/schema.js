import merge from 'lodash/merge';

/** * Queries ** */
import {
  schema as getUsersSchema,
  queries as getUsersQueries,
  resolvers as getUsersResolver,
} from './users/getUsers';

/** * Mutations ** */
import {
  schema as createUserSchema,
  mutation as createUserMutation,
  resolvers as createUserResolver,
} from './users/createUser';

export const schema = [
  ...getUsersSchema,
  ...createUserSchema,
];

export const queries = [...getUsersQueries];

export const mutations = [...createUserMutation];

export const resolvers = merge(
  getUsersResolver,
  createUserResolver,
);
