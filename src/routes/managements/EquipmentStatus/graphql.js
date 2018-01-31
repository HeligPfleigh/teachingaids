import gql from 'graphql-tag';

/* eslint-disable import/prefer-default-export */
export const getEquipmentStatus = gql`query getEquipmentStatus {
  getEquipmentStatus {
    _id
    name
    uniqueName
  }
}`;

export const checkEquipmentStatusExist = gql`query checkEquipmentStatusExist ($name: String!) {
  checkEquipmentStatusExist (name: $name)
}`;

export const addEquipmentStatus = gql`
  mutation createEquipmentStatus($name: String!) {
    createEquipmentStatus(name: $name) {
      _id
      name
      uniqueName
    }
  }
`;

export const updateEquipmentStatus = gql`
  mutation updateEquipmentStatus($_id: String!, $name: String!) {
    updateEquipmentStatus(_id: $_id, name: $name) {
      _id
      name
      uniqueName
    }
  }
`;

export const deleteEquipmentStatus = gql`
mutation deleteEquipmentStatus($_id: String!) {
  deleteEquipmentStatus (_id: $_id)
}`;
