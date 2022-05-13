import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBMiQyrhSjmRPfo4bwz3uVSPy2W1uGADHg",
  authDomain: "deskdrops-e664d.firebaseapp.com",
  projectId: "deskdrops-e664d",
  storageBucket: "deskdrops-e664d.appspot.com",
  messagingSenderId: "225230694078",
  appId: "1:225230694078:web:a52cb3e7771fcc8cabe0ef",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Auth exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Firestore exports
export const firestore = firebase.firestore();
export const { serverTimestamp } = firebase.firestore.FieldValue;
export const { fromMillis } = firebase.firestore.Timestamp;
export const { increment } = firebase.firestore.FieldValue;

// Storage exports
export const storage = firebase.storage();
export const { STATE_CHANGED } = firebase.storage.TaskEvent;

/// Helper functions

/** `
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("username", "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/** `
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}
