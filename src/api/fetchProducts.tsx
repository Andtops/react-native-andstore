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

export const GETALL_COLLECTIONS = gql`
  query AllCollections {
    jackets: collection(handle: "jacket-coat") {
      id
      title
      handle
      image {
        url
      }
    }
    trousers: collection(handle: "trousers-jeans") {
      id
      title
      handle
      image {
        url
      }
    }
    shoes: collection(handle: "shoes") {
      id
      title
      handle
      image {
        url
      }
    }
    knitwear: collection(handle: "knitwear-sweaters") {
      id
      title
      handle
      image {
        url
      }
    }
    tshirts: collection(handle: "t-shirts-tops") {
      id
      title
      handle
      image {
        url
      }
    }
    dresses: collection(handle: "dresses-jumpsuits") {
      id
      title
      handle
      image {
        url
      }
    }
  }
`;

export const YOUMIGHTBEINTERSTED = gql`
  query YouMightBeInterested {
    collection(handle: "you-might-be-interested") {
      id
      title
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
  }
`;

export const SALEPRODUCTS = gql`
  query SaleProducts {
    collection(handle: "sale") {
      id
      title
      description
      image {
        url
      }
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
            options {
              name
              values
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
  }
`;

export const SHOE_COLLECTIONS = gql`
  query ShoeProducts {
    collection(handle: "shoes") {
      id
      title
      description
      image {
        url
      }
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
            options {
              name
              values
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
  }
`;

export const NEW_COLLECTIONS = gql`
  query newProducts {
    collection(handle: "new") {
      id
      title
      description
      image {
        url
      }
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
            options {
              name
              values
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
  }
`;

export const TROUSERS_AND_JEANS_COLLECTIONS = gql`
  query TrousersAndJeansCollections {
    collection(handle: "trousers-jeans") {
      id
      title
      description
      image {
        url
      }
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
            options {
              name
              values
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
  }
`;
export const JACKET_AND_COAT_COLLECTIONS = gql`
  query JacketAndCoatCollections {
    collection(handle: "jacket-coat") {
      id
      title
      description
      image {
        url
      }
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
            options {
              name
              values
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
  }
`;
export const KNITWEAR_AND_SWEATSHIRTS_COLLECTIONS = gql`
  query KnitwearAndSweatshirtsCollections {
    collection(handle: "knitwear-sweaters") {
      id
      title
      description
      image {
        url
      }
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
            options {
              name
              values
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
  }
`;

export const TSHIRTS_AND_TOPS_COLLECTIONS = gql`
  query TshirtsAndTopsCollections {
    collection(handle: "t-shirts-tops") {
      id
      title
      description
      image {
        url
      }
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
            options {
              name
              values
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
  }
`;

export const DRESSES_AND_JUMPSUITS_COLLECTIONS = gql`
  query DressesAndJumpsuitsCollections {
    collection(handle: "dresses-jumpsuits") {
      id
      title
      description
      image {
        url
      }
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
            options {
              name
              values
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
  }
`;

