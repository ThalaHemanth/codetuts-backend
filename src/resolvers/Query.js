const Query = {
  getCourses: async (parent, { language }, { db }) => {
    const results = [];

    try {
      await db
        .collection(language)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            results.push({ ...doc.data() });
          });
        });
    } catch (error) {
      throw new Error('Error', error);
    }
    console.log(results);
    return results;
  },
};
export { Query as default };
