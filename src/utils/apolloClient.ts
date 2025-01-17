import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import {SHOPIFY_API_URL, SHOPIFY_STOREFRONT_ACCESS_TOKEN} from '@env';



const httpLink = new HttpLink({
  uri: SHOPIFY_API_URL, // Replace with your Shopify GraphQL endpoint
});

const authLink = new ApolloLink((operation, forward) => {
  // Add the authorization header
  operation.setContext({
    headers: {
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN, // Replace with your access token
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain the auth link with the HTTP link
  cache: new InMemoryCache(),
});

export default client;