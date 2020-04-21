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

const auth = firebase.auth()

// Sign Up
export const doCreateUserWithEmailAndPassword = (
  email: string,
  password: string
) => auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email: string, password: string) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () => auth.signOut();

// Password Reset
export const doPasswordReset = (email: string) =>
  auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = async (password: string) => {
  if (auth.currentUser) {
    await auth.currentUser.updatePassword(password);
  }
  throw Error("No auth.currentUser!");
};

export default auth;