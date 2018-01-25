import {
  GraphQLString as StringType,
} from 'graphql';

import { UserSchema } from '../../schemas/user';
import { UserModel } from '../../models';

const user = {
  type: UserSchema,
  args: {
    _id: { type: StringType },
  },
  resolve({ request }, { _id }) {
    return UserModel.findOne({ _id });
  },
};

export default user;
