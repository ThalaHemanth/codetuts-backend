import uuid from 'uuid/v4';
import axios from 'axios';

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
    const title = args.title.toLower();
    const Language = args.Language.toLower();
    const playlistId = args;
    const id = uuid();
    const { data } = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=AIzaSyCxqkIJes14pl7_8hSkgq_cApTDRgK12OI&maxResults=50`
    );
    const Items = data.items.map(item => ({
      channel: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.default.url,
      title: item.snippet.title,
      video: item.snippet.resourceId.videoId,
    }));
    db.collection(this.Language).add({
      id,
      title,
      playlistId,
      playlist: Items,
    });
    return {
      id,
      title,
      language: Language,
      playlist: Items.forEach(item => item),
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
