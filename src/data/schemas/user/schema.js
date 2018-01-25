import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';

import AdminUserInterface from './interface';
import AdminProfileSchema from './profile';
import EmailAddressSchema from './emailAddress';

const UserSchema = new GraphQLObjectType({
  name: 'UserSchema',
  interfaces: [AdminUserInterface],
  description: 'Provider all information for system user',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    username: {
      type: GraphQLString,
    },
    profile: {
      type: AdminProfileSchema,
    },
    email: {
      type: EmailAddressSchema,
    },
  }),
});

export default UserSchema;
