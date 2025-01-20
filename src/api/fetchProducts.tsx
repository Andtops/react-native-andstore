import {gql} from '@apollo/client';

export const GETALLPRODUCTS = gql`
  query GetAllProducts {
    products(first: 10) {
      edges {
        node {
          id
          handle
          title
          description
          featuredImage {
            url
          }
          variants(first: 10) {
            edges {
              node {
                compareAtPrice {
                  amount
                }
                price {
                  amount
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;