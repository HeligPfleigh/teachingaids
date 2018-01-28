import gql from 'graphql-tag';

/* eslint-disable import/prefer-default-export */
export const getSubjects = gql`query getSubjects {
  getSubjects {
    _id
    name
    uniqueName
  }
}`;
