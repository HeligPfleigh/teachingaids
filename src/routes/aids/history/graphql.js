import gql from 'graphql-tag';
import { isEmpty } from 'lodash';
import createApolloClient from '../../../core/createApolloClient/createApolloClient.client';
import Fragment from '../../../data/fragment.utils';

const apolloClient = createApolloClient();

const getAidHistoriesOfEquipmentType = gql`
  query getAidHistoriesOfEquipmentType($equipmentTypeId: String!) {
    getAidHistoriesOfEquipmentType(equipmentTypeId: $equipmentTypeId) {
      ...AidHistoryView
    }
  }
  ${Fragment.AidHistoryView}`;

const getAidHistoriesOfTeacher = gql`
  query getAidHistoriesOfTeacher($teacherId: String) {
    getAidHistoriesOfTeacher(teacherId: $teacherId) {
      ...AidHistoryView
    }
  }
  ${Fragment.AidHistoryView}
`;

const getAidHistories = gql`
  query {
    getAidHistories{
      ...AidHistoryView
    }
  }
  ${Fragment.AidHistoryView}
`;

export const getAidHistoriesOfTeacherFunc = async (teacherId) => {
  if (!isEmpty(teacherId)) {
    const { data: { getAidHistoriesOfTeacher: result }, loading } = await apolloClient.query({
      query: getAidHistoriesOfTeacher,
      variables: { teacherId },
      fetchPolicy: 'network-only',
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
      fetchPolicy: 'network-only',
    });
    return { result, loading };
  }
  return {};
};

export const getAidHistoriesFunc = async () => {
  const { data: { getAidHistories: result }, loading } = await apolloClient.query({
    query: getAidHistories,
    fetchPolicy: 'network-only',
  });
  return { result, loading };
};
