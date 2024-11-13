import React, { useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import axios from 'axios';
// import { User } from '@/models/user';
// import { getUser } from '@/api/users/getUser';
import { getGoogleUser } from '@/api/google/getGoogleUser';
import { GoogleUser } from '@/models/googleUser';

export const Profile: React.FC = () => {
  // const [user, setUser] = useState<User | undefined>(undefined);
  const [user, setUser] = useState<GoogleUser | undefined>(undefined);

  // const fetchUser = async () => {
  //   try {
  //     const resp = await getUser();
  //     setUser(resp);
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       const err = error.response?.data.error;
  //       console.log(err);
  //     }
  //   }
  // };

  const fetchUserGoogle = async () => {
    try {
      const resp = await getGoogleUser();
      console.log(resp);
      setUser(resp);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error.response?.data.error;
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchUserGoogle();
  }, []);

  return (
    <div className={styles.container}>
      <h1>User Profile</h1>
      {/* <p>ID: {user?.id}</p>
      <p>ID: {user?.username}</p>
      <p>ID: {user?.email}</p>      
      <p>Phone number: {user?.phoneNumber}</p>
      <p>Password: {user?.password}</p> */}

      <p>ID: {user?.uid}</p>
      <img src={user?.photoURL} alt='user photo' />
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
};
