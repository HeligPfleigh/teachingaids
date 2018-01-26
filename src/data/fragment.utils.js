import gql from 'graphql-tag';

const Fragment = {
  UserView: gql`
    fragment UserView on User {
      _id,
      username,
      profile {
        avatar,
        firstName,
        lastName,
        fullName,
        phone,
        birthDay,
      }
      email {
        address,
      }
      isActive
    }
  `,
};

export default Fragment;
