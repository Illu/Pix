import {makeObservable, observable, action, runInAction} from 'mobx';
import {createContext} from 'react';
import auth from '@react-native-firebase/auth';
import {STATES} from '../constants';
import firestore from '@react-native-firebase/firestore';

class User {
  constructor() {
    auth().onAuthStateChanged((user) => this.onAuthStateChanged(user));
    auth().onUserChanged((user) => this.onAuthStateChanged(user));
    makeObservable(this, {
      state: observable,
      user: observable,
      posts: observable,
      onAuthStateChanged: action,
      loadPosts: action,
    });
  }

  user = null;
  posts = null;
  state = STATES.IDLE;

  onAuthStateChanged(user) {
    this.user = user;
    this.state = STATES.SUCCESS;
  }

  async loadPosts() {
    const snapshot = await firestore()
      .collection('Posts')
      .where('user.id', '==', this.user.uid)
      .get();
    const newPosts = [];
    snapshot.forEach((doc) => {
      newPosts.push(doc.data());
    });
    runInAction(() => {
      this.posts = newPosts;
    });
  }
}

export default createContext(new User());
