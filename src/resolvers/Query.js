const Query = {
  getCourses: async (parent, args, { db }) => {
    const results = [];
    try {
      await db
        .collection('javascript')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            results.push({ ...doc.data() });
          });
        });
      return 'success';
    } catch (error) {
      throw new Error('Error', error);
    }
  },
};
export { Query as default };
