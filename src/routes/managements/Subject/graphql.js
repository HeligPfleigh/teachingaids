import gql from 'graphql-tag';

/* eslint-disable import/prefer-default-export */
export const getSubjects = gql`query getSubjects {
  getSubjects {
    _id
    name
    uniqueName
  }
}`;

export const checkSubjectExist = gql`query checkSubjectExist ($name: String!) {
  checkSubjectExist (name: $name)
}`;

export const addSubjectMutation = gql`
  mutation createSubject($name: String!) {
    createSubject(name: $name) {
      _id
      name
      uniqueName
    }
  }
`;

export const updateSubjectMutation = gql`
  mutation updateSubject($_id: String!, $name: String!) {
    updateSubject(_id: $_id, name: $name) {
      _id
      name
      uniqueName
    }
  }
`;

export const deleteSubject = gql`
mutation deleteSubject($_id: String!) {
  deleteSubject (_id: $_id)
}`;
