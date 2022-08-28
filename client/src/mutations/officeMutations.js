import {gql} from '@apollo/client'

export const ADD_OFFICE = gql`
  mutation addOffice($officeName: String!, $email: String!, $phone: String!,$physicalAddress: String!,$maximumCapacity:String!,$color: String!) {
    addOffice(officeName: $officeName, email: $email, phone: $phone,physicalAddress:$physicalAddress,maximumCapacity:$maximumCapacity,color:$color) {
      id
      officeName
      email
      phone
      physicalAddress
      maximumCapacity
      color
    }
  }
`;

export const DELETE_OFFICE = gql`
  mutation  deleteOffice($id: ID!) {
    deleteOffice(id: $id) {
      id
    }
  }
`;

export const UPDATE_OFFICE = gql`
  mutation updateOffice
    ($id: ID!, $officeName: String!, $email: String!, $phone: String!,$physicalAddress: String!,$maximumCapacity:String!,$color: String!)
   {
    updateOffice(
      id: $id
      officeName: $officeName, email: $email, phone: $phone,physicalAddress:$physicalAddress,maximumCapacity:$maximumCapacity,color:$color
    ) {
      id
      officeName
      email
      phone
      physicalAddress
      maximumCapacity
      color
    }
  }
`;

export const ADD_STAFF = gql`
  mutation addStaff
    ($id: ID!, $firstName: String!, $lastName: String!, $avatar: String!)
   {
    addStaff(
      id: $id
     firstName: $firstName, lastName: $lastName, avatar: $avatar
    ){
      staff{
      firstName
      lastName
      avatar
    }  
    }
    
}
`
export const DELETE_STAFF = gql`
  mutation 
  deleteStaff ($staffid: ID! , $officeid: ID! )
   {
    deleteStaff(
      staffid: $staffid ,officeid:$officeid
    ){
      staff{
      firstName
      lastName
      avatar
      id
    }  
    } 
}
`

export const UPDATE_STAFF = gql`
  mutation addStaff
    ($id: ID!, $firstName: String!,$staffid:ID!, $lastName: String!, $avatar: String!)
   {
    updateStaff(
      id: $id
      staffid:$staffid
     firstName: $firstName, lastName: $lastName, avatar: $avatar
    ){
    staff{
      firstName
      lastName
      avatar
    }
  } 
    }
    
`