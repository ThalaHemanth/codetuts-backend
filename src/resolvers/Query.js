const Query = {
  hello: (parent, args, { db }) => {
    console.clear();
    const results = [];
    db.collection('Javascript')
      .get()
      .then(snapshot =>
        snapshot.forEach(doc => results.push(doc.data().playlist))
      );
    console.log('Get Courses', results);
    return 'Hello Worrld';
  },
};
export { Query as default };
