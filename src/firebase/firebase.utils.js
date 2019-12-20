import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config =  {
        apiKey: "AIzaSyCGAhA3OfgjD8HkVBCSfabhBy1Jcxb3qfw",
        authDomain: "crwn-db-f1e8f.firebaseapp.com",
        databaseURL: "https://crwn-db-f1e8f.firebaseio.com",
        projectId: "crwn-db-f1e8f",
        storageBucket: "crwn-db-f1e8f.appspot.com",
        messagingSenderId: "1034677980364",
        appId: "1:1034677980364:web:4b7347d8203f84b05cc669",
        measurementId: "G-JHMD5YPMDJ"
      };


      firebase.initializeApp(config);

      export const auth =firebase.auth();
      export const firestore =firebase.firestore();


      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({prompt: 'select_account'});
      export const signInWithGoogle = () => auth.signInWithPopup(provider);


      export default firebase;