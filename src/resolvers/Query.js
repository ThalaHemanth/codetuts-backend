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
      const newResults = results.map(result => {
        const newPlaylist = [];
        console.log(result.playlist[0]);
      });
      return 'success';
    } catch (error) {
      throw new Error('Error', error);
    }
  },
};
export { Query as default };
