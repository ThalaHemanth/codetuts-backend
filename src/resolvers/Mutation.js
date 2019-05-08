/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
import uuid from 'uuid/v4';
import axios from 'axios';
import moment from 'moment';

const Mutation = {
  Signup: (parent, { email, password }, { firebase }) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err => console.log(err));
    return 'Success';
  },
  Signin: (parent, { email, password }, { firebase }) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => console.log(err));
    return 'Logged In';
  },
  CreateApi: async (parent, args, { db }) => {
    try {
      const title = args.title.toLowerCase();
      const Language = args.Language.toLowerCase();
      const { playlistId } = args;
      const id = uuid();
      let Items = [];
      let topics = [];
      let cover = '';
      const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=AIzaSyCxqkIJes14pl7_8hSkgq_cApTDRgK12OI&maxResults=50`
      );
      cover = data.items[0].snippet.thumbnails.default.url;
      Items = data.items.map(item => ({
        channel: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.default.url,
        title: item.snippet.title,
        video: item.snippet.resourceId.videoId,
      }));
      const urls = Items.map(
        item =>
          `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${
            item.video
          }&key=AIzaSyCxqkIJes14pl7_8hSkgq_cApTDRgK12OI`
      );
      const promises = urls.map(url => axios.get(url));
      const res = await Promise.all(promises);
      const videoDetails = await res.map(response => ({
        id: response.data.items[0].id,
        duration: response.data.items[0].contentDetails.duration,
      }));
      const newItems = Items.map(item => {
        let tempItems;
        videoDetails.forEach(video => {
          if (video.id === item.video) {
            const duration = Math.round(
              moment.duration(video.duration).asMinutes()
            );
            tempItems = { ...item, duration };
          }
        });
        return { ...tempItems };
      });
      console.log(newItems);
      await db.collection(Language).add({
        id,
        title,
        playlistId,
        cover,
        playlist: newItems,
      });
      await db
        .collection('topics')
        .doc('languages')
        .get()
        .then(doc => {
          topics.push(Language);
          topics.push(...doc.data().language);
          topics = [...new Set(topics)];
        });
      await db
        .collection('topics')
        .doc('languages')
        .set({ language: topics })
        .then(doc => null);

      return [
        {
          id,
          title,
          language: Language,
          playlist: newItems,
        },
      ];
    } catch (error) {
      console.log(error);
    }
  },
};

export { Mutation as default };
