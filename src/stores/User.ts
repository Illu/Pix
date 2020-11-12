import { makeObservable, observable, action } from 'mobx';
import { createContext } from 'react';
import auth from '@react-native-firebase/auth';
import { STATES } from '../constants';

class User {
  constructor() {
    console.log("lo")
    auth().onAuthStateChanged((user) => this.onAuthStateChanged(user));
    makeObservable(this, {
      state: observable,
      user: observable,
      onAuthStateChanged: action
    });
  }

  user = null;
  state = STATES.IDLE;

  onAuthStateChanged(user) {
    this.user = user;
    this.state = STATES.SUCCESS;
    console.log("this.user", this, user)
  }
}

export default createContext(new User());
