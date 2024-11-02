import React from 'react';
import styles from './InputGroup.module.scss';

type InputGroupProps = {
  children: React.ReactNode;
  errorMessage?: string;
};

export const InputGroup: React.FC<InputGroupProps> = ({
  children,
  errorMessage,
}) => {
  return (
    <div className={styles.inputGroup}>
      <div className={styles.content}>{children}</div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};
