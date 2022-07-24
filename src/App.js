import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import MainScreen from './screen/MainScreen';
import Sidebar from './components/Sidebar';
import s from './App.module.scss';
import Profile from './screen/ProfileScreen';
import ErrorScreen from './screen/ErrorScreen';

const App = () => {
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk')
      .then(response => response.json())
      .then((response) => {
        setMovieList(response.results);
      });
  };

  useEffect(() => {
    getMovieList();
  }, []);

  console.log(movieList);

  return (
    <div className={s.App}>
      <Sidebar />
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/error" element={<ErrorScreen />} />
      </Routes>
    </div>
  );
};

export default App;
