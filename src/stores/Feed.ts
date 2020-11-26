import { makeObservable, observable, action, runInAction } from 'mobx';
import { createContext } from 'react';
import { Alert } from 'react-native';
import { STATES } from '../constants';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';

const PAGE_ITEMS = 5;

class Feed {
  constructor() {
    makeObservable(this, {
      state: observable,
      feed: observable,
      sort: observable,
      loadFeed: action,
      loadMore: action,
      likePost: action,
      clearFeed: action,
      changeSort: action
    });
  }

  feed = null;
  state = STATES.IDLE;
  lastSnapshot = null;
  sort: 'timestamp' | 'likesCount' = 'likesCount';

  async loadFeed() {
    this.state = STATES.LOADING;
    try {
      const snapshot = await firestore()
        .collection('Posts')
        .orderBy(this.sort, 'desc')
        .limit(PAGE_ITEMS)
        .get();

      const newFeed = [];
      snapshot.forEach((doc) => {
        newFeed.push({ ...doc.data(), id: doc.id });
      });
      this.lastSnapshot = snapshot.docs[snapshot.docs.length - 1];
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

  async loadMore() {
    if (this.state !== STATES.LOADING && this.state !== STATES.LOADING_BACKGROUND && this.lastSnapshot) {
      this.state = STATES.LOADING_BACKGROUND;
      try {
        const snapshot = await firestore()
          .collection('Posts')
          .orderBy(this.sort, 'desc')
          .startAfter(this.lastSnapshot)
          .limit(PAGE_ITEMS)
          .get();

        const newFeed = [];
        snapshot.forEach(doc => {
          newFeed.push({ ...doc.data(), id: doc.id });
        });
        this.lastSnapshot = snapshot.docs[snapshot.docs.length - 1];
        runInAction(() => {
          this.state = STATES.SUCCESS;
          this.feed = [...this.feed, ...newFeed];
        });
      } catch (err) {
        console.log('err', err);
        runInAction(() => {
          this.state = STATES.ERROR;
        });
      }
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

  changeSort(newSort: 'timestamp' | 'likesCount') {
    this.sort = newSort;
  }

  clearFeed() {
    this.feed = null;
    this.lastSnapshot = null;
  }

  async reportPost(postId) {
    const postRef = firestore().collection('Posts').doc(postId);
    await postRef.update({
      reports: firebase.firestore.FieldValue.increment(1),
    });
    Alert.alert(
      'Thank you for your report',
      'You are making the App a friendlier place for everyone.',
    );
  }
}

export default createContext(new Feed());
