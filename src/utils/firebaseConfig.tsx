import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAdA1v8aEJbn_ZBoid9ciu_EKcJ7397KH0',
  authDomain: 'auth-server-afbc5.firebaseapp.com',
  projectId: 'auth-server-afbc5',
  storageBucket: 'auth-server-afbc5.firebasestorage.app',
  messagingSenderId: '836915331627',
  appId: '1:836915331627:web:7e79c1894edfcccc1d206e',
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
