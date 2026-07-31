import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils.js';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component.jsx';

const signIn = () => {
  const loginWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>I'm sign-in page</h1>
      <button onClick={loginWithGoogle}>Sign in with Google Popup</button>
      <SignUpForm />
    </div>
  );
};

export default signIn;
