import gql from 'graphql-tag';

/* eslint-disable import/prefer-default-export */
export const getUsers = gql`query getUsers {
  getUsers {
    _id
    username
    
    email {
      address
      verified
    }
    profile {
      avatar
      firstName
      lastName
      fullName
      gender
      phone
      birthDay
      address
    }
    roles
    isActive
    updatedAt
    createdAt
  }
}`;

export const checkUserExist = gql`query checkUserExist ($query: String!) {
  checkUserExist (query: $query)
}`;

export const addUserMutation = gql`
  mutation createUser($user:  CreateUserInput!) {
    createUser(user: $user) {
      _id
      username
      email
      profile
      roles
      isActive
      updatedAt
      createdAt
    }
  }
`;

