import gql from 'graphql-tag';


export const getUser = gql`
    query {
        getUsers{
        _id
        username
        profile {
            fullName
            gender
            phone
        }
        email {
            address
        }
        }
    }
`;

export const getAllEquipment = gql`
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
