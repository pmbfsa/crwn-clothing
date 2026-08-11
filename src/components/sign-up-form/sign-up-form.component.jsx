import { useState } from 'react';
import {
  createUserAuthWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils.js';

import FormInput from '../form-input/form-input.component.jsx';
import Button from '../button/button.component.jsx';

import { SignUpContainer } from './sign-up-form.styles.jsx';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const formSubmitHandle = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password and Confirm fields don't match.");
      return;
    }

    try {
      const { user } = await createUserAuthWithEmailAndPassword(
        email,
        password,
      );

      await createUserDocumentFromAuth(user, { displayName });

      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot sign up, email already in use.');
      } else {
        console.log('user create authentication failed:', error.message);
      }
    }
  };

  const fieldChangeHandle = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>Dan't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={formSubmitHandle}>
        <FormInput
          label="Display Name"
          name="displayName"
          value={displayName}
          type="text"
          onChange={fieldChangeHandle}
          required
        />
        <FormInput
          label="Email"
          name="email"
          value={email}
          type="email"
          onChange={fieldChangeHandle}
          required
        />
        <FormInput
          label="Password"
          name="password"
          value={password}
          type="password"
          onChange={fieldChangeHandle}
          required
        />
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          type="password"
          onChange={fieldChangeHandle}
          required
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
