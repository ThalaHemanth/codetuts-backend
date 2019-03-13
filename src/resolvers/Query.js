const Query = {
  hello: (parent, args, { db }) => {
    //   db.collection('cities')
    //     .doc('LA')
    //     .delete()
    //     .then(() => console.log('Docs Deleted Successfully'));
    // }
    return 'Hello Worrld';
  }
};
export { Query as default };
