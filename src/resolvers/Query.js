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
    return results.map(result => ({
      id: result.id,
      title: result.title,
      playlistId: result.playlistId,
      language,
      playlist: result.playlist,
    }));
  },
};
export { Query as default };
