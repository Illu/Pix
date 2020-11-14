import {makeObservable, observable, action, runInAction} from 'mobx';
import {createContext} from 'react';
import {STATES} from '../constants';
import firestore from '@react-native-firebase/firestore';

class Feed {
  constructor() {
    makeObservable(this, {
      state: observable,
      feed: observable,
      loadFeed: action,
      likePost: action,
    });
  }

  feed = null;
  state = STATES.IDLE;

  async loadFeed() {
    this.state = STATES.LOADING;
    try {
      const snapshot = await firestore().collection('Posts').limit(10).get();
      const newFeed = [];
      snapshot.forEach((doc) => {
        newFeed.push({...doc.data(), id: doc.id});
      });
      runInAction(() => {
        this.state = STATES.SUCCESS;
        this.feed = [...newFeed];
      });
    } catch (err) {
      console.log('err', err);
      runInAction(() => {
        this.state = STATES.ERROR;
      });
    }
  }

  async likePost(postId, userId, likes) {
    console.log('likes', likes);
    console.log('id', userId);
    if (likes.includes(userId)) {
      return;
    }
    const newLikes = [...likes, userId];
    await firestore().collection('Posts').doc(postId).update({likes: newLikes});
    runInAction(() => {
      this.feed[this.feed.findIndex((i) => i.id === postId)].likes = newLikes;
    });
  }
}

export default createContext(new Feed());
