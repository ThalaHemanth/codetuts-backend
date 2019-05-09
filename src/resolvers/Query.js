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
    return results;
  },
  getTopics: async (parent, args, { db }) => {
    const topics = [];
    try {
      await db
        .collection('topics')
        .doc('languages')
        .get()
        .then(doc => {
          if (doc) {
            topics.push(...doc.data().language);
          }
        });
    } catch (error) {
      throw new Error('Error', error);
    }
    return topics;
  },
};
export { Query as default };
