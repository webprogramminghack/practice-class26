import React from 'react';
import { z } from 'zod';
import styles from './SignupForm.module.scss';
import { Button } from '../Button';
import { AppForm, AppFormProps } from '../AppForm';
import { postSignup } from '@/api/auth/signup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const schema = z.object({
  name: z.string().refine((val) => val.trim() !== '', 'Name cannot be empty'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 characters long')
    .max(15, 'Phone number must not exceed 15 characters'),
  password: z.string().min(6, 'Password must be 6 characters long'),
});

export const SignupForm: React.FC = () => {
  const navigate = useNavigate();

  const handleOnSubmit: AppFormProps<typeof schema>['onSubmit'] = async (
    data,
    setError
  ) => {
    const signupData = {
      payload: data,
    };

    try {
      await postSignup(signupData);
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error.response?.data.error;
        setError('name', err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formHeader}>
        <h2>Create an account</h2>
        <p>Start your 30-day free trial.</p>
      </div>
      <div className={styles.formContainer}>
        <AppForm
          schema={schema}
          onSubmit={handleOnSubmit}
          options={{ clearOnSubmit: true }}
        >
          <AppForm.Input
            type='text'
            name='name'
            label='Name'
            placeholder='Enter your name'
          />
          <AppForm.Input
            type='text'
            name='email'
            label='Email'
            placeholder='Enter your email'
          />
          <AppForm.Input
            type='text'
            name='phoneNumber'
            label='Phone Number'
            placeholder='Enter your phone number'
          />
          <AppForm.Input
            type='password'
            name='password'
            label='Password'
            placeholder='Create a password'
          />
          <Button>Get started</Button>
        </AppForm>
      </div>
      <div className={styles.formFooter}>
        <p>
          Already have an account? <a href='/login'>Log in</a>
        </p>
      </div>
    </div>
  );
};
