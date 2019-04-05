'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Query = {
  hello: function hello(parent, args, _ref) {
    var db = _ref.db;

    console.clear();
    var results = [];
    db.collection('Javascript').get().then(function (snapshot) {
      return snapshot.forEach(function (doc) {
        return results.push(doc.data().playlist);
      });
    });
    console.log('Get Courses', results);
    return 'Hello Worrld';
  }
};
exports.default = Query;
//# sourceMappingURL=Query.js.map