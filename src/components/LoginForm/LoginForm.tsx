import React from 'react';
import { z } from 'zod';
import styles from './LoginForm.module.scss';
import { Button } from '../Button';
import { AppForm, AppFormProps } from '../AppForm';
import { postLogin } from '@/api/auth/login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/utils/firebaseConfig';
import { googleLogin } from '@/api/google/googleLogin';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be 6 characters long'),
});

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const handleOnSubmit: AppFormProps<typeof schema>['onSubmit'] = async (
    data,
    setError
  ) => {
    const loginData = {
      payload: data,
    };

    try {
      await postLogin(loginData);
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error.response?.data.error;
        setError('email', err);
      }
    }
  };

  const handleLoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      await googleLogin({
        payload: {
          id_token: idToken,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error.response?.data.error;
        console.log(err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formHeader}>
        <h2>Log in to your account</h2>
        <p>Welcome back! Please enter your details.</p>
      </div>
      <div className={styles.formContainer}>
        <AppForm
          schema={schema}
          onSubmit={handleOnSubmit}
          options={{ clearOnSubmit: true }}
        >
          <AppForm.Input
            type='text'
            name='email'
            label='Email'
            placeholder='Enter your email'
          />

          <AppForm.Input
            type='password'
            name='password'
            label='Password'
            placeholder='Create a password'
          />
          <Button>Sign in</Button>
        </AppForm>
        <div className={styles.googleButton}>
          <Button onClick={handleLoginGoogle}>Sign in with Google</Button>
        </div>
      </div>
      <div className={styles.formFooter}>
        <p>
          Don’t have an account? <a href='/signup'>Sign up</a>
        </p>
      </div>
    </div>
  );
};
