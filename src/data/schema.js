import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import queries from './queries';

const schema = new Schema({
  query: new ObjectType({
    name: 'RootQuery',
    fields: queries,
  }),
});

export default schema;
