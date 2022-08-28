import { gql } from "@apollo/client";

//Query All Offices
export const GET_OFFICES = gql`
  query {
    offices {
      officeName
      email
      phone
      physicalAddress
      maximumCapacity
      color
      id
      staff {
        lastName
        firstName
        avatar
        id
      }
    }
  }
`;

//Query Single Office By Id
export const GET_OFFICE = gql`
  query ($id: ID!) {
    office(id: $id) {
      officeName
      email
      phone
      physicalAddress
      maximumCapacity
      color
      id
      staff {
        lastName
        firstName
        avatar
        id
      }
    }
  }
`;


//Query All Offices
export const GET_STAFF = gql`
  query {
    offices {
      officeName
      email
      phone
      physicalAddress
      maximumCapacity
      color
      id
      staff {
        lastName
        firstName
        avatar
        id
      }
    }
  }
`;