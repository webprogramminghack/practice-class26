import React from 'react';
import { useController, useForm } from 'react-hook-form';
import { InputGroup } from './InputGroup';
import styles from './ContactForm.module.scss';
import { Button } from '../Button';
import Select from 'react-select';

type Country = { value: string; label: string };

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  country: Country | null;
  message: string;
};

const countryOptions: Country[] = [
  { value: 'usa', label: 'United States' },
  { value: 'canada', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
];

export const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // console.log(data);
    console.log('Runs');
  };

  const { field: countryField } = useController({
    name: 'country',
    control,
    rules: { required: 'Country is required' },
    defaultValue: countryOptions[0],
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
      <InputGroup errorMessage={errors.firstName?.message}>
        <label htmlFor='firstName' className={styles.required}>
          First Name
        </label>
        <input
          type='text'
          id='firstname'
          {...register('firstName', {
            required: 'First name is required',
          })}
        />
      </InputGroup>

      <InputGroup errorMessage={errors.lastName?.message}>
        <label htmlFor='lastName' className={styles.required}>
          Last Name
        </label>
        <input
          type='text'
          id='lastName'
          {...register('lastName', {
            required: 'Last name is required',
          })}
        />
      </InputGroup>

      <InputGroup errorMessage={errors.email?.message}>
        <label htmlFor='email' className={styles.required}>
          Email
        </label>
        <input
          type='text'
          id='email'
          {...register('email', {
            required: 'Email is required',
            validate: {
              minLength: (value) => {
                if (value.length < 8) {
                  return 'Email is too short';
                }
              },
              validEmail: (value) => {
                if (!value.includes('@')) {
                  return 'Email is not valid';
                }
              },
            },
          })}
        />
      </InputGroup>

      <InputGroup errorMessage={errors.country?.message}>
        <label htmlFor='country' className={styles.required}>
          Country
        </label>
        <Select
          {...countryField}
          options={countryOptions}
          className={styles.select}
          placeholder='Select a country'
        />
      </InputGroup>

      <InputGroup errorMessage={errors.message?.message}>
        <label htmlFor='message'>Message</label>
        <textarea id='message' {...register('message')} />
      </InputGroup>

      <Button>Submit</Button>
    </form>
  );
};
