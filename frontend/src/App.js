import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Singup';
import Notfound from './components/Notfound';
import EmailVerification from './components/auth/EmailVerification';
import ForgetPassword from './components/auth/ForgetPassword';
import ConfirmPassword from './components/auth/ConfirmPassword';
import Home from './components/Home';
import Navbar from './components/user/Navbar';
import { useAuth } from './hooks';
import AdminNavigator from './navigator/AdminNavigator';
export default function App() {
  const { authInfo } = useAuth();
  const isAdmin = authInfo.profile?.role === 'admin';
  if (isAdmin) return <AdminNavigator />;
  console.log(authInfo);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/verification" element={<EmailVerification />} />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />
        <Route path="/auth/reset-password" element={<ConfirmPassword />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}
