import { GraphQLClient } from 'graphql-request';

const NETTYWORTH_GRAPHQL_URL = 'https://top-sales.nettyworth.io/graphql';
// const NETTYWORTH_GRAPHQL_URL = 'http://localhost:3002/graphql';

export const newGraphqlClient = new GraphQLClient(NETTYWORTH_GRAPHQL_URL);
