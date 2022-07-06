const { gql } = require('@apollo/client');

export const GET_ALL_PRODUCTS = gql`
  query {
    getAllProducts {
      id
      title
      price
      description
      category
      image
    }
  }
`;

export const GET_PRODUCT_DESCRIPTION = gql`
  query GetProductDecription($id: ID!) {
    getProductDescription(id: $id) {
      id
      title
      price
      description
      category
      image
      sizes
      colors
    }
  }
`;
export const GET_FILTERED_BY_IDS = gql`
  query GetFilteredByIds($id: [Int!]) {
    getFilteredByIds(ids: $id) {
      id
      title
      price
      image
      sizes
      colors
    }
  }
`;

export const GET_FILTERED_BY_CATEGORY = gql`
  query GetFilteredByCategory($category: String!) {
    getFilteredByCategory(category: $category) {
      id
      title
      price
      description
      category
      image
    }
  }
`;
