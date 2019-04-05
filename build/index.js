'use strict';

var _graphqlYoga = require('graphql-yoga');

require('babel-polyfill');

var _Mutation = require('./resolvers/Mutation');

var _Mutation2 = _interopRequireDefault(_Mutation);

var _Query = require('./resolvers/Query');

var _Query2 = _interopRequireDefault(_Query);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = _db2.default.firestore();

// const resolvers = {
//   Query,
//   Mutation
// };

var server = new _graphqlYoga.GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Mutation: _Mutation2.default,
    Query: _Query2.default
  },
  context: {
    firebase: _db2.default,
    db: db
  }
});
server.start(function () {
  // firebase.auth().onAuthStateChanged(user => {
  //   if (user) {
  //     console.log('USER LOGGED IN', user);
  //     user.updateProfile({
  //       displayName: 'Sharwanand',
  //     });
  //   }
  // });
  console.log('Server is running on localhost:4000');
});
//# sourceMappingURL=index.js.map