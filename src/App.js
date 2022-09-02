import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import s from './App.module.scss';
import MainScreen from './screen/MainScreen';
import Sidebar from './components/Sidebar';
import Profile from './screen/ProfileScreen';
import ErrorScreen from './screen/ErrorScreen';
import MovieScreen from './screen/MovieScreen';
import RandomMovieScreen from './screen/RandomMovieScreen';
import RandomMovieTest from './screen/RandomMovieTest';
import ActorScreen from './screen/ActorScreen';
import LikedMovies from './screen/LikedMovies';
import useTheme from './components/Hooks/useTheme';

const App = () => {
  const { theme, setTheme } = useTheme();
  const [selectedMovie, setSelectedMovie] = useState(0);
  const [userData, setUserData] = useState([]);
  const [userToken, setUserToken] = useState('');
  useEffect(() => {
    setUserToken(localStorage.getItem('token'));
    if (userToken) {
      const getUser = new Headers();
      getUser.append(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`,
      );

      const requestOptionsGetUser = {
        method: 'GET',
        headers: getUser,
        redirect: 'follow',
      };

      fetch('https://evening-basin-02735.herokuapp.com/api/v1/users', requestOptionsGetUser)
        .then(response => response.json())
        .then((result) => {
          setUserData(result.data);
        })
        .catch(error => console.log('error', error));
    }
  }, []);
  return (
    <div className={s.App}>
      <Sidebar setTheme={setTheme} theme={theme} />
      <Routes>
        <Route path="/" element={<MainScreen getMovie={setSelectedMovie} setUserData={setUserData} userData={userData} getUserToken={setUserToken} />} />
        <Route path="/profile" element={<Profile userData={userData} userToken={userToken} setUserData={setUserData} getUserToken={setUserToken} />} />
        <Route path="/liked-movies" element={<LikedMovies />} />
        <Route path="/error" element={<ErrorScreen />} />
        <Route path="/actor/:actorId" element={<ActorScreen />} />
        <Route path="/random-movie" element={<RandomMovieScreen />} />
        <Route path="/random-movie-test" element={<RandomMovieTest />} />
        <Route path="/movie/:id" element={<MovieScreen selectedMovie={selectedMovie} />} />
      </Routes>
    </div>
  );
};

export default App;
