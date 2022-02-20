import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

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

    const snapShot = await userRef.get();

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
        const { title, items, imageUrl } = doc.data()
        return ({
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            imageUrl,
            items: items.map((item, index) => {
                const { name, imageUrl, price } = item
                return ({
                    id: index+1,
                    name: name,
                    imageUrl: imageUrl,
                    price: price,
                })
            })
        })
    })

// turn array to the object
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged((userAuth) => {
            resolve(userAuth);
        }, reject)
    })
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const goolgeProvider = new firebase.auth.GoogleAuthProvider();

export const Facebookprovider = new firebase.auth.FacebookAuthProvider();

export default firebase;