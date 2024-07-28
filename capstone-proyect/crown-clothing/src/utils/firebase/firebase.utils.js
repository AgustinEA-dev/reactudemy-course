import { initializeApp } from "firebase/app"

import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth"

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyB7NGO6TT3e3l_5kowSNub9BMVxsIUGl0w",
    authDomain: "crown-clothing-db-b26fd.firebaseapp.com",
    projectId: "crown-clothing-db-b26fd",
    storageBucket: "crown-clothing-db-b26fd.appspot.com",
    messagingSenderId: "1055033040608",
    appId: "1:1055033040608:web:cf2cd43c17010fc1c23a85"
};


const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};