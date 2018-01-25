import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const AdminProfileSchema = new GraphQLObjectType({
  name: 'AdminProfileSchema',
  description: 'Provider profile information for system user',
  fields: () => ({
    avatar: {
      type: GraphQLString,
    },
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
    gender: {
      type: GraphQLString,
    },
    phone: {
      type: GraphQLString,
    },
    birthDay: {
      type: GraphQLString,
    },
    address: {
      type: GraphQLString,
    },
  }),
});

export default AdminProfileSchema;
