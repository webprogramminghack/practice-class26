import React from 'react';
import styles from './Navbar.module.scss';
import clsx from 'clsx';
import { Button } from '../Button';
import axios from 'axios';
import { postLogout } from '@/api/auth/logout';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await postLogout();
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error.response?.data.error;
        console.log(err);
      }
    }
  };

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.navWrapper}>
          <a href='/' className={styles.logo}>
            WPH
          </a>
          <nav>
            <ul>
              <li>
                <a href='/'>Home</a>
              </li>
              <li>
                <a href='/me'>Profile</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.headerActions}>
          <a href='/login' className={clsx(styles.btn, styles.secondary)}>
            Log in
          </a>
          <a href='/signup' className={clsx(styles.btn, styles.primary)}>
            Sign up
          </a>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </header>
  );
};
