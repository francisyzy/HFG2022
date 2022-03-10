import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  });
}

const auth = firebase.auth();
if (process.env.NODE_ENV === "development") {
  auth.useEmulator("http://localhost:9099");
}
const firestore = firebase.firestore();
if (process.env.NODE_ENV === "development") {
  firestore.useEmulator("localhost", 8080);
}

export default firebase;
export { auth, firestore };
