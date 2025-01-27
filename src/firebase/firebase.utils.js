import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDqILpCwNCbl9hJAgaKaokDAV-amaZJiv0",
  authDomain: "crwn-db-f8a6d.firebaseapp.com",
  databaseURL: "https://crwn-db-f8a6d-default-rtdb.firebaseio.com",
  projectId: "crwn-db-f8a6d",
  storageBucket: "crwn-db-f8a6d.appspot.com",
  messagingSenderId: "315447259502",
  appId: "1:315447259502:web:09cb49cde7014dcdb4517f"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
