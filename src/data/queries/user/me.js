import { UserModel } from '../../models';
import { UserSchema } from '../../schemas/user';

const Me = {
  type: UserSchema,
  resolve: ({ request }) => UserModel.findOne({ _id: request.user.id }),
};

export default Me;
