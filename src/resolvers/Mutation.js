/* eslint-disable prefer-destructuring */
/* eslint-disable no-const-assign */
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
    const duration = '';
    const { data } = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=AIzaSyCxqkIJes14pl7_8hSkgq_cApTDRgK12OI&maxResults=50`
    );
    const Items = data.items.map(async item => {
      const { videoId } = item.snippet.resourceId;
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=AIzaSyCxqkIJes14pl7_8hSkgq_cAp2+TDRgK12OI`
      );
      const videos = res.data.items.map(item2 => {
        duration = item2.contentDetails.duration;
        duration = Math.round(moment.duration(duration).asMinutes());
      });

      return {
        channel: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.default.url,
        title: item.snippet.title,
        video: item.snippet.resourceId.videoId,
        duration,
      };
    });
    db.collection(Language).add({
      id,
      title,
      playlistId,
      playlist: Items,
    });
    return {
      id,
      title,
      language: Language,
      playlist: () => Items.map(item => ({ item })),
    };
  },
};

export { Mutation as default };

/*
 id:
 titile:
 playlistId:
 playlist:
*/
