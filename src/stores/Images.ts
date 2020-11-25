import { makeObservable, observable, action, runInAction } from 'mobx';
import { createContext } from 'react';
import { STATES } from '../constants';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { listFilesAndDirectories } from '../helpers';


class Images {
  constructor() {
    makeObservable(this, {
      state: observable,
      avatars: observable,
      loadAvatarsURLs: action
    });
  }

  state = STATES.IDLE;
  avatars = {};

  avatarPaths = [];

  listFilesAndDirectories(reference, pageToken?) {
    return reference.list({ pageToken }).then(result => {
      result.items.forEach(ref => {
        // Only store avatar paths (needed for profile edition)
        if (ref.fullPath.includes('avatars')) {
          this.avatarPaths.push(ref.fullPath)
        }
      });
      if (result.nextPageToken) {
        return listFilesAndDirectories(reference, result.nextPageToken);
      }
      return Promise.resolve();
    });
  }

  loadAvatarsURLs() {
    const reference = storage().ref('avatars');
    this.listFilesAndDirectories(reference).then(() => {
      this.avatarPaths.forEach(async (avatarPath) => {
        const name = avatarPath.substring(
          avatarPath.lastIndexOf("/") + 1,
          avatarPath.lastIndexOf(".")
        );
        const url = await storage().ref(avatarPath).getDownloadURL()

        const avatarData = {
          cloudPath: avatarPath,
          category: `${avatarPath.substring(
            avatarPath.lastIndexOf("/") + 1,
            avatarPath.lastIndexOf("-")
          )}s`,
          url
        }
        this.avatars[name] = avatarData
      })
    })
  }
}

export default createContext(new Images());
