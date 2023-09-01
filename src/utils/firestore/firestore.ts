import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
  User,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  DocumentData,
} from "firebase/firestore";

// Firebase config from web

const firebaseConfig = {
  apiKey: "AIzaSyBKTCkN-0r3pF3g7MdRVm7QUqrAhGoGxsc",
  authDomain: "print-planet-6579f.firebaseapp.com",
  projectId: "print-planet-6579f",
  storageBucket: "print-planet-6579f.appspot.com",
  messagingSenderId: "502324877885",
  appId: "1:502324877885:web:5bdd70f91e4b682d1da854",
  measurementId: "G-QXYZVVVTJK",
};

// Set up Firebase with config

initializeApp(firebaseConfig);

// Sign-in Setup

export const auth = getAuth();

const googleProvider = new GoogleAuthProvider();

// Prompt user to select Google account (later in detail)

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Sign in functions

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// db points to Database

export const db = getFirestore();

// Create data

export const addCollectionAndDocuments = async (
  collectionKey: string,
  objectsToAdd: DocumentData[]
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

// Create user document in Database from Google Popup Sign-in

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error: any) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const getUserDocument = async (userAuth: User) => {
  const docRef = doc(db, "users", userAuth.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const user = docSnap.data();
    user.createdAt = user.createdAt.toMillis();
    user.uid = userAuth.uid;
    return user;
  } else {
    console.log("No such document!");
  }
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    return;
  }

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    return;
  }

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutAuthUser = async () => {
  await signOut(auth);
};

export const onAuthStateChangedListener = (callback: any) => {
  onAuthStateChanged(auth, callback);
};

export const setNewPassword = async (newPassword: string) => {
  if (!auth.currentUser) {
    return;
  }
  if (newPassword.length < 6) {
    return;
  }
  await updatePassword(auth.currentUser, newPassword);
};
