// Contains all methods required for posting data to/fetching data from firestore database.

import { initializeApp } from "firebase/app";
import {getAuth, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDV8hFgI9_dovomvtzGaXR_Wt2Tq1QKLiI",
    authDomain: "sit313-da8e6.firebaseapp.com",
    projectId: "sit313-da8e6",
    storageBucket: "sit313-da8e6.appspot.com",
    messagingSenderId: "239458248852",
    appId: "1:239458248852:web:086b753f784060764a6c81",
    measurementId: "G-Q6FJ13WHQ9"
};
  
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const dB = getFirestore();
export const storage = getStorage(app);

// Adds a collection and document to firestore
export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(dB, collectionKey)
    const batch = writeBatch(dB)
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title)
        batch.set(docRef, object)
    })

    await batch.commit()
    console.log('transaction is successful')
}

// Fetches documents from 'articles' collection
export const fetchArticleAndDocuments = async () => {
    const collectionRef = collection(dB, 'articles')
    const q = query(collectionRef)
    const querySnapshot = await getDocs(q);
    const articleMap = querySnapshot.docs.reduce((acc, docSnapshot) =>  {
        const {title, ...items } = docSnapshot.data();
        acc[title] = items;
        return acc;
    }, {})

    return articleMap;
}

// Fetches documents from 'questions' collection
export const fetchQuestionAndDocuments = async () => {
    const collectionRef = collection(dB, 'questions')
    const q = query(collectionRef)
    const querySnapshot = await getDocs(q);
    const questionMap = querySnapshot.docs.reduce((acc, docSnapshot) =>  {
        const {title, ...items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})

    return questionMap;
}

// Fetches documents from 'tutorials' collection
export const fetchTutorialAndDocuments = async () => {
    const collectionRef = collection(dB, 'tutorials')
    const q = query(collectionRef)
    const querySnapshot = await getDocs(q);
    const tutorialMap = querySnapshot.docs.reduce((acc, docSnapshot) =>  {
        const {title, ...items } = docSnapshot.data();
        acc[title] = items;
        return acc;
    }, {})

    return tutorialMap;
}

// Creates a 'user' document from user authorisation when creating a new user account
export const createUserDocFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth.email) return;
    const userDocRef = doc(dB, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('error in creating', error.message)
        }
    }

    return userDocRef;
}

// Creates a user with email and password credentials
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

// Signs in a user with email and password credentials
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

// Sends a reset password email to user
export const sendAuthUserPasswordResetEmail = async (email) => {
    if (!email) return;
    return await sendPasswordResetEmail(auth, email);
}

// Signs out the current user
export function signAuthUserOut() {
    return auth.currentUser.signOut();
}