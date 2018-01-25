import {
  GraphQLString,
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

import AdminProfileSchema from './profile';
import EmailAddressSchema from './emailAddress';

const AdminUserInterface = new GraphQLInterfaceType({
  name: 'AdminUserInterface',
  description: 'AdminUserInterface',
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
  resolveType: () => {
    const result = 'AdminUserSchema';
    return result;
  },
});

export default AdminUserInterface;
