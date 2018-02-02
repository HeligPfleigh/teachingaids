import gql from 'graphql-tag';
import Fragment from '../../../data/fragment.utils';

export const searchEquipmentQuery = gql`
  query searchEquipment($query: String) {
    searchEquipment(query: $query) {
      type
      items {
        _id
        barcode
        equipmentTypeId
        typeName
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
