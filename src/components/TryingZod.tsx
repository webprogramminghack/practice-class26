import { z, ZodError, ZodIssueCode } from 'zod';

const nameSchema = z.string().refine((val) => val.trim() !== '', {
  message: 'Name cannot be empty',
});
const ageSchema = z.number().min(18, 'You must be 18 years old');
const isActiveSchema = z.boolean();

try {
  // console.log(nameSchema.parse(' '));
  // console.log(ageSchema.parse(17));
  // console.log(isActiveSchema.parse('hello'));
} catch (error) {
  if (error instanceof ZodError) {
    console.error(error.errors);
  }
}

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  zip: z.string(),
});

const countrySchema = z.object({
  name: z.string(),
  code: z.string(),
});

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  profileUrl: z.string().url(),
  age: z.number().refine((val) => val >= 18, {
    message: 'You must be 18 years old',
    path: ['min18'],
  }),
  friends: z.array(z.string()).max(3),
  address: addressSchema,
  country: z.preprocess(
    (val) => (val === undefined ? null : val),
    countrySchema
      .nullable()
      .refine((val) => val !== null, 'Please select a country')
  ),
});

// const userCountry = userSchema.shape.country;
const userWithoutAddressSchema = userSchema.omit({
  address: true,
});

type UserWithoutAddress = z.infer<typeof userWithoutAddressSchema>;

// type User = z.infer<typeof userSchema>;

const user = {
  name: 'John',
  email: 'hello@gmail.com',
  profileUrl: 'https://google.com',
  age: 18,
  friends: ['Alice', 'Bob', 'Charlie'],
  address: {
    street: '123 Main St',
    city: 'Springfield',
    zip: '12345',
  },
};

try {
  // console.log(userSchema.parse(user));
  // console.log(countrySchema.parse('hello'));
} catch (error) {
  if (error instanceof ZodError) {
    console.error(error.errors);
  }
}

const nicknameSchema = z
  .string()
  .nullable()
  .refine((val) => val !== null, 'Nickname is required');

type Nickname = z.infer<typeof nicknameSchema>;

const nicknameSchemaWithSuperRefine = z
  .string()
  .nullable()
  .superRefine((val, ctx) => {
    if (val === null) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: 'Nickname is required',
      });
    }
  });

// console.log(nicknameSchemaWithSuperRefine.parse(null));

nicknameSchemaWithSuperRefine
  .safeParse(null)
  .error?.errors.forEach(({ message }) => console.log(message));

// console.log('hello');

export const TryingZod = () => {
  return <div>TryingZod</div>;
};
