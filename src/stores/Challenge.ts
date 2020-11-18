import { makeObservable, observable, action, runInAction } from 'mobx';
import { createContext } from 'react';
import { Alert } from 'react-native';
import { MONTHS, STATES } from '../constants';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';

class Challenge {
  constructor() {
    makeObservable(this, {
      state: observable,
      currentChallenge: observable,
      challenges: observable,
      likePost: action,
      loadChallenges: action,
      loadCurrentChallenge: action,
    });
  }

  challenges = null;
  currentChallenge = null;
  state = STATES.IDLE;

  async loadCurrentChallenge() {
    const currentMonth = MONTHS[new Date().getMonth()];
    const challengesData = await firestore().collection('Challenges').get();
    if (challengesData.empty) {
      this.state = STATES.ERROR;
    }
    challengesData.forEach((challenge) => {
      if (challenge.id === currentMonth) {
        runInAction(() => {
          this.currentChallenge = challenge.data();
        });
      }
    });
  }

  async loadChallenges(
    order: 'timestamp' | 'likesCount' = 'likesCount',
    challengeId,
  ) {
    this.state = STATES.LOADING;
    try {
      const snapshot = await firestore()
        .collection('Posts')
        .where('tag', '==', challengeId)
        .orderBy(order, 'desc')
        .limit(10)
        .get();
      const newChallenges = [];
      snapshot.forEach((doc) => {
        newChallenges.push({ ...doc.data(), id: doc.id });
      });
      runInAction(() => {
        this.state = STATES.SUCCESS;
        this.challenges = [...newChallenges];
      });
    } catch (err) {
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
      this.challenges[
        this.challenges.findIndex((i) => i.id === postId)
      ].likes = newPostData.data().likes;
      this.challenges[
        this.challenges.findIndex((i) => i.id === postId)
      ].likesCount = newPostData.data().likesCount;
    });
  }

  async reportPost(postId) {
    const postRef = firestore().collection('Posts').doc(postId);
    await postRef.update({
      reports: firebase.firestore.FieldValue.increment(1),
    })
    Alert.alert("Thank you for your report, you are making the App a friendlier place for everyone.");
  }
}

export default createContext(new Challenge());
