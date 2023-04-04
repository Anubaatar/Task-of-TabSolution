import { gql } from '@apollo/client'

export const GET_STAFF = gql`
  {
    status{
      id
      name
      email
      phone
      address
      birthday
      sex
    }
  }
`;