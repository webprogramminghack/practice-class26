import { z } from 'zod';
import { AppForm, AppFormProps } from './components/AppForm';
import { Button } from './components/Button';
import styles from './App.module.scss';
import { SelectOption } from './components/AppForm/AppFormSelect';

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
    .refine((val) => val !== null, 'Please select a country'),
  message: z.string().optional(),
});

const countryOptions: SelectOption[] = [
  { value: 'usa', label: 'United States' },
  { value: 'canada', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
];

const App = () => {
  const handleOnSubmit: AppFormProps<typeof schema>['onSubmit'] = (
    data,
    setError
  ) => {
    // pakai setError jika ingin menampilkan error pada field tertentu
    // contohnya jika ada error dari server
    // setError('email', 'Email is already used');
    console.log(data);
  };
  return (
    <div className={styles.formContainer}>
      <AppForm
        schema={schema}
        onSubmit={handleOnSubmit}
        options={{ clearOnSubmit: true }}
      >
        <AppForm.Input
          name='firstName'
          label='First Name'
          placeholder='First Name'
        />
        <AppForm.Input
          name='lastName'
          label='Last Name'
          placeholder='Last Name'
        />
        <AppForm.Input name='email' label='Email' placeholder='Email' />
        <AppForm.Select
          name='country'
          label='Country'
          options={countryOptions}
          placeholder='Select a country'
          // defaultValue={countryOptions[0]}
        />
        <AppForm.TextArea
          name='message'
          label='Message'
          placeholder='Leave us a message..'
        />
        <Button>Submit</Button>
      </AppForm>
    </div>
  );
};

export default App;
