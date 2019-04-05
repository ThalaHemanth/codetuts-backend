'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var firebase = require('firebase');

var config = {
  apiKey: 'AIzaSyDwlGauFTymSX0OWi9yW5EEzUHNatkAgYA',
  authDomain: 'codetuts-firebase.firebaseapp.com',
  databaseURL: 'https://codetuts-firebase.firebaseio.com',
  projectId: 'codetuts-firebase',
  storageBucket: 'codetuts-firebase.appspot.com',
  messagingSenderId: '667233477427'
};
firebase.initializeApp(config);

exports.default = firebase;

// https://peaceful-plains-41627.herokuapp.com/
//# sourceMappingURL=db.js.map