import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from '../data/models';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Sign in with Local.
 */
passport.use(new LocalStrategy({
  // usernameField: 'username',
  // passwordField: 'password',
  session: false,
  // passReqToCallback: true,
}, (username, password, done) => {
  const fooBar = async () => {
    const user = await UserModel.findOne({ username });
    if (!user) {
      const error = {
        name: 'IncorrectUsernameError',
        message: 'Tài khoản đăng nhập không tồn tại.',
      };
      return done(error);
    }

    // check if a hashed user's password is equal to a value saved in the database
    // return user.comparePassword(userData.password, (passwordErr, isMatch) => {});
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      const error = {
        name: 'IncorrectPasswordError',
        message: 'Mật khẩu không đúng.',
      };
      return done(error);
    }

    return done(null, {
      id: user._id || '',
      profile: user.profile || {},
      email: user.emails.address || '',
      roles: user.roles || [],
    });
  };

  fooBar().catch(done);
}));

export default passport;
