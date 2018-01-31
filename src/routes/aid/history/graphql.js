import gql from 'graphql-tag';
import { isEmpty } from 'lodash';
import createApolloClient from '../../../core/createApolloClient/createApolloClient.client';

const apolloClient = createApolloClient();

const getAidHistoriesOfEquipmentType = gql`
  query getAidHistoriesOfEquipmentType($equipmentTypeId: String!) {
    getAidHistoriesOfEquipmentType(equipmentTypeId: $equipmentTypeId) {
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
  }
`;

const getAidHistoriesOfTeacher = gql`
  query getAidHistoriesOfTeacher($teacherId: String) {
    getAidHistoriesOfTeacher(teacherId: $teacherId) {
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
  }
`;

const getAidHistories = gql`
  query {
    getAidHistories{
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
  }
`;

export const getAidHistoriesOfTeacherFunc = async (teacherId) => {
  if (!isEmpty(teacherId)) {
    const { data: { getAidHistoriesOfTeacher: result }, loading } = await apolloClient.query({
      query: getAidHistoriesOfTeacher,
      variables: { teacherId },
    });
    return { result, loading };
  }
  return {};
};

export const getAidHistoriesOfEquipmentTypeFunc = async (equipmentTypeId) => {
  if (!isEmpty(equipmentTypeId)) {
    const { data: { getAidHistoriesOfEquipmentType: result }, loading } = await apolloClient.query({
      query: getAidHistoriesOfEquipmentType,
      variables: { equipmentTypeId },
    });
    return { result, loading };
  }
  return {};
};

export const getAidHistoriesFunc = async () => {
  const { data: { getAidHistories: result }, loading } = await apolloClient.query({
    query: getAidHistories,
  });
  return { result, loading };
};
