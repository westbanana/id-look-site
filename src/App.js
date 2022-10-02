// TODO: убрать кнопку с избранных, если не авторизован и хочет поставить лайка, отображать модалку авторизации
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
  const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');
  useEffect(() => {
    if (userData.message === 'user does not exist') {
      localStorage.removeItem('token');
    }
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('https://id-look-server.herokuapp.com/api/v1/users', requestOptions)
      .then(response => response.json())
      .then(result => setUserData(result.data))
      .catch(error => console.log('error', error));
  }, []);

  return (
    <div className={s.App}>
      <Sidebar
        setTheme={setTheme}
        theme={theme}
        getUserToken={setUserToken}
        setUserData={setUserData}
      />
      <Routes>
        <Route
          path="/"
          element={(
            <MainScreen
              userAvatar={userData.avatar}
              getMovie={setSelectedMovie}
              setUserData={setUserData}
              userData={userData}
              getUserToken={setUserToken}
            />
          )}
        />
        <Route
          path="/profile"
          element={localStorage.getItem('token') ? (
            <Profile userData={userData} userToken={userToken} setUserData={setUserData} getUserToken={setUserToken} />
          ) : (
            <ErrorScreen />
          )}
        />
        <Route
          path="/liked-movies"
          element={(
            <LikedMovies
              getUserToken={setUserToken}
              setUserData={setUserData}
            />
          )}
        />
        <Route
          path="/error"
          element={
            <ErrorScreen />
          }
        />
        <Route
          path="/actor/:actorId"
          element={
            <ActorScreen />
          }
        />
        <Route
          path="/random-movie"
          element={
            <RandomMovieScreen />
          }
        />
        <Route
          path="/random-movie-test"
          element={
            <RandomMovieTest />
          }
        />
        <Route
          path="/movie/:id"
          element={(
            <MovieScreen
              selectedMovie={selectedMovie}
              getUserToken={setUserToken}
              setUserData={setUserData}
            />
          )}
        />
      </Routes>
    </div>
  );
};

export default App;
