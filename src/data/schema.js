import merge from 'lodash/merge';
import { makeExecutableSchema } from 'graphql-tools';

import {
  schema as schemaType,
  resolvers as resolversType,
} from './types';

import {
  schema as databaseSchema,
  resolvers as databaseResolvers,
  mutations as databaseMutations,
  queries as databaseQueries,
} from './graphql/schema';

const queries = [
  `type RootQuery {
    ${databaseQueries}
  }`,
];

const mutation = [
  `type Mutation {
    ${databaseMutations}
  }`,
];

const schema = [
  `schema {
    query: RootQuery
    mutation: Mutation
  }`,
];

// Merge all of the resolver objects together
// Put schema together into one array of schema strings
const typeDefs = [
  ...schema,
  ...queries,
  ...mutation,

  ...databaseSchema,

  ...schemaType,
];

const resolvers = merge(databaseResolvers, resolversType);

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
