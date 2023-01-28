import React from 'react';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Singup';
import Navbar from './components/user/Navbar';
export default function App() {
  return (
    <>
      <Navbar />
      <Signup />
    </>
  );
}
