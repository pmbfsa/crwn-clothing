import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils.js';

const signIn = () => {
  const loginWithGoogle = async () => {
    const response = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(response.user);
    console.log(userDocRef);
  };

  return (
    <div>
      <h1>I'm sign-in page</h1>
      <button onClick={loginWithGoogle}>Sign in with Google Popup</button>
    </div>
  );
};

export default signIn;
