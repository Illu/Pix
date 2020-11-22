import { makeObservable, observable, action, runInAction } from 'mobx';
import { createContext } from 'react';
import auth from '@react-native-firebase/auth';
import { STATES } from '../constants';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';

class User {
  constructor() {
    auth().onAuthStateChanged((user) => this.onAuthStateChanged(user));
    auth().onUserChanged((user) => this.onAuthStateChanged(user));
    makeObservable(this, {
      state: observable,
      user: observable,
      isAdmin: observable,
      posts: observable,
      userData: observable,
      onAuthStateChanged: action,
      loadPosts: action,
      promote: action,
      addBadge: action
    });
  }

  user = null;
  userData = null;
  posts = null;
  isAdmin = false;
  state = STATES.IDLE;

  onAuthStateChanged(user) {
    this.user = user;
    if (user) {
      firestore()
        .collection('Users')
        .doc(user.uid)
        .get()
        .then((data) => {
          runInAction(() => {
            this.userData = data.data();
          });
        });
    } else {
      this.userData = null;
      this.isAdmin = false;
    }
    this.state = STATES.SUCCESS;
  }

  promote() {
    this.isAdmin = true;
  }

  async loadPosts() {
    this.state = STATES.LOADING;
    const snapshot = await firestore()
      .collection('Posts')
      .where('user.id', '==', this.user.uid)
      .orderBy('timestamp', 'desc')
      .get();
    const newPosts = [];
    snapshot.forEach((doc) => {
      newPosts.push(doc.data());
    });
    runInAction(() => {
      this.state = STATES.SUCCESS;
      this.posts = [...newPosts];
    });
  }

  addBadge(badge: string) {
    if (this.userData.badges && !this.userData.badges.includes(badge)) {
      const badgesRef = firestore().collection('Users').doc(this.user.uid)
      badgesRef.update({
        badges: firebase.firestore.FieldValue.arrayUnion(badge)
      }).then(() => Alert.alert("Contrats! 🎉", "You’ve earned a brand new badge for your participation in this month challenge!"))
      this.userData.badges.push(badge)
    }
  }
}

export default createContext(new User());
