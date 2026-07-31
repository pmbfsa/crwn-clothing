import SignInForm from '../../components/sign-in-form/sign-in-form.component.jsx';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component.jsx';

import './authentication.styles.scss';

const signIn = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default signIn;
