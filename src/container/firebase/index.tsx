import * as firebase from "firebase/app";
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA_1hXS0Gzg_B_s2UOdmt0RDfXRW85EL2U",
  authDomain: "iotplatform-auth.firebaseapp.com",
  databaseURL: "https://iotplatform-auth.firebaseio.com",
  projectId: "iotplatform-auth",
  storageBucket: "iotplatform-auth.appspot.com",
  messagingSenderId: "301860640521",
  appId: "1:301860640521:web:6e6cd135bf4a2fd425e5d8"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const provider = {
  google: new firebase.auth.GoogleAuthProvider(),
  facebook: new firebase.auth.FacebookAuthProvider(),
  github: new firebase.auth.GithubAuthProvider(),
}

export default firebase.auth();
