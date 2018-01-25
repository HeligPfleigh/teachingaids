import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLBoolean as Boolean,
} from 'graphql';

const PageInfoSchema = new ObjectType({
  name: 'PageInfoSchema',
  fields: {
    endCursor: { type: StringType },
    hasNextPage: { type: Boolean },
  },
});

export default PageInfoSchema;
