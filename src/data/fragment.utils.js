import gql from 'graphql-tag';

const Fragment = {
  AdminUserView: gql`
    fragment AdminUserView on AdminUserSchema {
      _id,
      username,
      profile {
        avatar,
        firstName,
        lastName,
        phone,
        birthDay,
      }
      email {
        address,
      }
    }
  `,

  PageInfoView: gql`fragment PageInfoView on PageInfoSchema {
      endCursor
      hasNextPage
    }
  `,
};

export default Fragment;
