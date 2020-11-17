import { makeObservable, observable, action, runInAction } from 'mobx';
import { createContext } from 'react';
import { Alert } from 'react-native';
import { STATES } from '../constants';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';

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

  async loadFeed(order: 'timestamp' | 'likesCount' = 'likesCount') {
    this.state = STATES.LOADING;
    try {
      const snapshot = await firestore()
        .collection('Posts')
        .orderBy(order, 'desc')
        .limit(10)
        .get();
      const newFeed = [];
      snapshot.forEach((doc) => {
        newFeed.push({ ...doc.data(), id: doc.id });
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
    const likesRef = firestore().collection('Posts').doc(postId);
    if (likes.includes(userId)) {
      likesRef.update({
        likes: firebase.firestore.FieldValue.arrayRemove(userId),
        likesCount: firebase.firestore.FieldValue.increment(-1),
      });
    } else {
      likesRef.update({
        likes: firebase.firestore.FieldValue.arrayUnion(userId),
        likesCount: firebase.firestore.FieldValue.increment(1),
      });
    }
    const newPostData = await firestore().collection('Posts').doc(postId).get();
    runInAction(() => {
      this.feed[
        this.feed.findIndex((i) => i.id === postId)
      ].likes = newPostData.data().likes;
      this.feed[
        this.feed.findIndex((i) => i.id === postId)
      ].likesCount = newPostData.data().likesCount;
    });
  }

  async reportPost(postId) {
    const postRef = firestore().collection('Posts').doc(postId);
    await postRef.update({
      reports: firebase.firestore.FieldValue.increment(1),
    })
    Alert.alert("Thank you for your report", "You are making the App a friendlier place for everyone.");
  }
}

export default createContext(new Feed());
