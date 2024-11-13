import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { LoginForm } from './components/LoginForm';
import { Navbar } from './components/Navbar';
import { Profile } from './components/Profile';
import { SignupForm } from './components/SignupForm';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/me' element={<Profile />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
      </Routes>
    </>
  );
};

export default App;
