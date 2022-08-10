import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import MainScreen from './screen/MainScreen';
import Sidebar from './components/Sidebar';
import s from './App.module.scss';
import Profile from './screen/ProfileScreen';
import ErrorScreen from './screen/ErrorScreen';
import MovieScreen from './screen/MovieScreen';
import RandomMovieScreen from './screen/RandomMovieScreen';
import RandomMovieTest from './screen/RandomMovieTest';

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState(0);

  return (
    <div className={s.App}>
      <Sidebar />
      <Routes>
        <Route path="/" element={<MainScreen getMovie={setSelectedMovie} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/error" element={<ErrorScreen />} />
        <Route path="/random-movie" element={<RandomMovieScreen />} />
        <Route path="/random-movie-test" element={<RandomMovieTest />} />
        <Route path="/movie/:id" element={<MovieScreen selectedMovie={selectedMovie} />} />
      </Routes>
    </div>
  );
};

export default App;
