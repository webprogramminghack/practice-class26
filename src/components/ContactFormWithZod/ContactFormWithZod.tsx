import React from 'react';
import { useController, useForm } from 'react-hook-form';
import { InputGroup } from './InputGroup';
import styles from './ContactFormWithZod.module.scss';
import { Button } from '../Button';
import Select from 'react-select';
import { z, ZodIssueCode } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  firstName: z
    .string()
    .refine((val) => val.trim() !== '', 'First name cannot be empty'),
  lastName: z
    .string()
    .refine((val) => val.trim() !== '', 'Last name cannot be empty'),
  email: z.string().email('Invalid email address'),
  country: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .nullable()
    // .refine((val) => val !== null, 'Please select a country'),
    .superRefine((val, ctx) => {
      if (val === null) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: 'Please select a country',
        });
      }
    }),
  message: z.string().optional(),
});

const countryOptions = [
  { value: 'usa', label: 'United States' },
  { value: 'canada', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
];

type FormData = z.infer<typeof schema>;

const defaultValues: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  country: null,
  message: '',
};

export const ContactFormWithZod: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    reset(defaultValues);
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
        <input {...register('firstName')} type='text' id='firstname' />
      </InputGroup>

      <InputGroup errorMessage={errors.lastName?.message}>
        <label htmlFor='lastName' className={styles.required}>
          Last Name
        </label>
        <input {...register('lastName')} type='text' id='lastName' />
      </InputGroup>

      <InputGroup errorMessage={errors.email?.message}>
        <label htmlFor='email' className={styles.required}>
          Email
        </label>
        <input {...register('email')} type='text' id='email' />
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
