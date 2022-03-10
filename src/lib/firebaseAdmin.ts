import firebaseAdmin from "firebase-admin";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      // Use solution from https://stackoverflow.com/a/41667023 if not working
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: process.env.DATABASE_URL,
  });
}

export const verifyIdToken = (token) => {
  return firebaseAdmin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      return decodedToken;
    })
    .catch((error) => {
      throw error;
    });
};

export default firebaseAdmin;
export const firestoreAdmin = firebaseAdmin.firestore();
export const authAdmin = firebaseAdmin.auth();
