import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    appId: process.env.REACT_APP_APP_ID,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
};

// console.log("firebaseConfig", firebaseConfig);
// console.log("env", process.env);

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
firebase.auth().onIdTokenChanged(async (user) => {
    if (user) {
        const token = await user.getIdToken();
        // console.log({ token });
        localStorage.setItem("token", JSON.stringify({ token }));
    } else {
        // console.log("hello");
        // localStorage.setItem('token', JSON.stringify(null))
        // localStorage.setItem('user', JSON.stringify(null))
    }
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const database = firebase.database();

export { firebase, auth, firestore, database, storage };
