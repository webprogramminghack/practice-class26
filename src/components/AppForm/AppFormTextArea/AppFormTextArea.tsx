import React from 'react';
import styles from './AppFormTextArea.module.scss';
import { AppFormInputGroup } from '../AppFormInputGroup';
import { useFormContext } from 'react-hook-form';
import { useAppFormContext } from '../hooks/useAppFormContext';
import clsx from 'clsx';

type AppTextAreaProps = {
  name: string;
  label: string;
  placeholder: string;
};

export const AppFormTextArea: React.FC<AppTextAreaProps> = ({
  name,
  label,
  placeholder,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { requiredFields } = useAppFormContext();
  const isRequired = requiredFields.includes(name);

  return (
    <AppFormInputGroup errorMessage={errors[name]?.message as string}>
      <label htmlFor={name} className={clsx(isRequired && styles.required)}>
        {label}
      </label>
      <textarea {...register(name)} id={name} placeholder={placeholder} />
    </AppFormInputGroup>
  );
};
