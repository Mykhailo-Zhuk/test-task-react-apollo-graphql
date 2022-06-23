import { gql } from '@apollo/client';

export const CREATE_NEW_PRODUCT = gql`
  mutation CreateNewProduct($input: UserInput) {
    createProduct(input: $input) {
      id
      title
      description
      price
      category
      image
      rating {
        rate
        count
      }
    }
  }
`;
