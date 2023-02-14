import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Notfound from '../components/Notfound';
import Dashboard from '../components/admin/Dashboard';
import Movies from '../components/admin/Movies';
import Actors from '../components/admin/Actors';
import Navbar from '../components/admin/Navbar';

export default function AdminNavigator() {
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1 p-2 max-w-screen-xl">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </div>
  );
}
