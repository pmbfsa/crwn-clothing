import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCC99TUQKVKi4FCKoOU1NZaCOMhTWRrLAI',
  authDomain: 'crwn-clothing-b173b.firebaseapp.com',
  projectId: 'crwn-clothing-b173b',
  storageBucket: 'crwn-clothing-b173b.firebasestorage.app',
  messagingSenderId: '422941695743',
  appId: '1:422941695743:web:bf250b0e98c6c41150f6ca',
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore(firebaseApp);
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log('error creating user doc', error.messsage);
    }
  }

  return userDocRef;
};
