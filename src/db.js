const firebase = require('firebase');

const config = {
  apiKey: 'AIzaSyDwlGauFTymSX0OWi9yW5EEzUHNatkAgYA',
  authDomain: 'codetuts-firebase.firebaseapp.com',
  databaseURL: 'https://codetuts-firebase.firebaseio.com',
  projectId: 'codetuts-firebase',
  storageBucket: 'codetuts-firebase.appspot.com',
  messagingSenderId: '667233477427',
};
firebase.initializeApp(config);

export default firebase;

// https://peaceful-plains-41627.herokuapp.com/
