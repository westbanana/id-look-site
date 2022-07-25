import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainScreen from './screen/MainScreen';
import Sidebar from './components/Sidebar';
import s from './App.module.scss';
import Profile from './screen/ProfileScreen';
import ErrorScreen from './screen/ErrorScreen';

const App = () => (
  <div className={s.App}>
    <Sidebar />
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/error" element={<ErrorScreen />} />
    </Routes>
  </div>
);

export default App;
