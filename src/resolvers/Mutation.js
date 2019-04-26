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
    const title = args.title.toLowerCase();
    const Language = args.Language.toLowerCase();
    const { playlistId } = args;
    const id = uuid();
    let Items = [];
    const { data } = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=AIzaSyCxqkIJes14pl7_8hSkgq_cApTDRgK12OI&maxResults=50`
    );
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
      const tempItems = [];
      videoDetails.forEach(video => {
        if (video.id === item.video) {
          const duration = Math.round(
            moment.duration(video.duration).asMinutes()
          );
          tempItems.push({
            ...item,
            duration,
          });
        }
      });
      return { ...tempItems };
    });
    console.log(newItems[0]);

    db.collection(Language).add({
      id,
      title,
      playlistId,
      playlist: newItems,
    });

    return {
      id,
      title,
      language: Language,
      playlist: newItems,
    };
  },
};

export { Mutation as default };
