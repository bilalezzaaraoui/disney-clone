import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGXUTFLO8wSb4akFwW7m7noHWaksrBWhE",
  authDomain: "disneyplus-clone-eb469.firebaseapp.com",
  projectId: "disneyplus-clone-eb469",
  storageBucket: "disneyplus-clone-eb469.appspot.com",
  messagingSenderId: "704871189199",
  appId: "1:704871189199:web:26f0fe4481315f4cf1c5ba",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
