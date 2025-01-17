import { initializeApp } from "firebase/app";
import {
    getAuth,
    // signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged

} from "firebase/auth"
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyB7NGO6TT3e3l_5kowSNub9BMVxsIUGl0w",
    authDomain: "crown-clothing-db-b26fd.firebaseapp.com",
    projectId: "crown-clothing-db-b26fd",
    storageBucket: "crown-clothing-db-b26fd.appspot.com",
    messagingSenderId: "1055033040608",
    appId: "1:1055033040608:web:cf2cd43c17010fc1c23a85"
};

const fireBaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()


export const addCollectionAndDocuments = async (collectionKey, objectstoAdd) => {
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db)
    objectstoAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    });

    await batch.commit()
    console.log("done")
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, "categories")
    const q = query(collectionRef)
    const querySnapshot = await getDocs(q)
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data()
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})

    return categoryMap
}


export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return
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
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return
    return await createUserWithEmailAndPassword(auth, email, password)
}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)