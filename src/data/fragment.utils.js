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
  AidHistoryView: gql`
    fragment AidHistoryView on AidHistory {
      _id
      lender {
        userId
        name
      }
      borrower {
        userId
        name
        teacherCode
      }
      borrowTime
      returnTime
      equipment {
        equipmentTypeId
        equipmentId
        name
        barCode
      }
      status
    }
  `,
};

export default Fragment;
