// // Import the functions you need from the SDKs you need
// import { initializeApp,  } from "firebase/app";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore, collection, getDocs, doc} from "firebase/firestore";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDbMg5hj4Areww41k4gfuqQLj5LKBeqZxc",
//   authDomain: "clothing-e-commerce-db-f3d88.firebaseapp.com",
//   projectId: "clothing-e-commerce-db-f3d88",
//   storageBucket: "clothing-e-commerce-db-f3d88.appspot.com",
//   messagingSenderId: "79405258452",
//   appId: "1:79405258452:web:85988cf39541ce031e0d41",
//   measurementId: "G-HT6N0TTX5X"
// };

// // Initialize Firebase
// initializeApp(firebaseConfig);

// // Export all we need method
// export const auth = getAuth();
// export const firestore = getFirestore();

// const provider = new GoogleAuthProvider();
// export const signInWithGoogle = () => signInWithPopup(auth, provider);

// export const createUserProfileDocument = async (userAuth, additionalData) => {
//     if (!userAuth) return
//     console.log(getDoc("users/128ewgwg"));
// }


import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyDbMg5hj4Areww41k4gfuqQLj5LKBeqZxc",
  authDomain: "clothing-e-commerce-db-f3d88.firebaseapp.com",
  projectId: "clothing-e-commerce-db-f3d88",
  storageBucket: "clothing-e-commerce-db-f3d88.appspot.com",
  messagingSenderId: "79405258452",
  appId: "1:79405258452:web:85988cf39541ce031e0d41",
  measurementId: "G-HT6N0TTX5X"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) {
        return
    }

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    // const collectionRef = firestore.collection("users");
    // console.log(collectionRef);

    const snapShot = await userRef.get();
    // const collectionSnapshot = await collectionRef.get();
    // console.log(collectionSnapshot);

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const userCreatedTime = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                userCreatedTime,
                ...additionalData
            })
        } catch (error) {
            console.log(error, "error creating user");
        }
    }
    return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();

    objectsToAdd.forEach((object) => {
        const newDocRef = collectionRef.doc()
        batch.set(newDocRef, object)
    })

    return await batch.commit()
};

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map((doc) => {
        const { title, items } = doc.data()
        return ({
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        })
    })

// turn array to the object
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;