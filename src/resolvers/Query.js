const Query = {
  hello: (parent, args, { db }) => {
    db.collection('cities')
      .doc('LA')
      .delete()
      .then(() => console.log('Docs Deleted Successfully'));
  }
};

export { Query as default };
