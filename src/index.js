import { GraphQLServer } from 'graphql-yoga';

import Mutation from './resolvers/Mutation';
import Query from './resolvers/Query';
import firebase from './db';

const db = firebase.firestore();

// const resolvers = {
//   Query,
//   Mutation
// };

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Mutation,
    Query
  },
  context: {
    firebase,
    db
  }
});
server.start(() => console.log('Server is running on localhost:4000'));
