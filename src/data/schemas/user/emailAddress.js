import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

const EmailAddressSchema = new GraphQLObjectType({
  name: 'EmailAddressSchema',
  description: 'Provider email information of system admin',
  fields: () => ({
    address: {
      type: GraphQLString,
    },
    verified: {
      type: GraphQLBoolean,
    },
  }),
});

export default EmailAddressSchema;
