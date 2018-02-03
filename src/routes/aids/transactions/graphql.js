import gql from 'graphql-tag';
import Fragment from '../../../data/fragment.utils';

export const searchEquipmentQuery = gql`
  query searchEquipment($borrowerId: String, $query: String) {
    searchEquipment(borrowerId: $borrowerId, query: $query) {
      type
      error
      message
      items {
        _id
        barcode
        equipmentType {
          name
          unit
          subject
        }
        status
      }
    }
  }
`;

export const getUsers = gql`query getUsers {
  getUsers {
    ...UserView
  }
}
${Fragment.UserView}`;

export const getAllEquipmentQuery = gql`
  query {
    getAllEquipment {
      _id
      name
      totalNumber
      unit
      order
      equipmentInfo {
        khCode
      }
    }
  }
`;

export const getAllPerTypeEquipment = gql`
  query getAllPerTypeEquipment($equipmentTypeId: String!){
    getAllPerTypeEquipment(equipmentTypeId: $equipmentTypeId) {
      _id
      barcode
      sequenceNum
      equipmentTypeId
    }
  }
`;

export const transactionMutation = gql`
  mutation transaction($input: TransactionInput!) {
    transaction(input: $input) {
      type
      status
    }
  }
`;
