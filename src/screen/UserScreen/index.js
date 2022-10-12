import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import s from './style.module.scss';

import { ReactComponent as ArrowIcon } from '../../assests/arrow.svg';
import unknownImage from '../../assests/unknownImage.svg';

const UserScreen = () => {
  const id = useParams();
  const [userData, setUserData] = useState({});
  const [userFavoritesMovies, setUserFavoritesMovies] = useState([]);
  const refSubscriptionsList = useRef(null);
  const refUsersMovieList = useRef(null);
  const refFirstArrow = useRef(null);
  const refSecondArrow = useRef(null);
  console.log(userData.watchListId);
  console.log(userFavoritesMovies);
  const {
    avatar, login, name, surname,
  } = userData;
  const getUser = () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`https://id-look-server.herokuapp.com/api/v1/users?user_id=${id.userId}`, requestOptions)
      .then(response => response.json())
      .then(result => setUserData(result.data))
      .catch(error => console.log('error', error));
  };

  const getUserFavoritesMovie = () => {
    fetch(`https://api.themoviedb.org/3/list/${userData.watchListId}?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk`)
      .then(response => response.json())
      .then((response) => {
        setUserFavoritesMovies(response.items);
      });
  };
  useEffect(() => {
    getUser();
    if (userData.watchListId) {
      getUserFavoritesMovie();
    }
  }, []);
  return (
    <div className={s.main}>
      <div className={s.userAvatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <div className={s.userName}>
        <span className={s.name}>{`${name} ${surname}`}</span>
        <span className={s.login}>{login}</span>
      </div>
      <div
        className={s.userSubscribers}
      >
        <div className={s.headerContainer}>
          <span className={s.headerName}>MOVIES</span>
          <ArrowIcon
            ref={refFirstArrow}
            onClick={() => {
              if (refUsersMovieList.current.classList.contains(`${s.moviesContainer}`)) {
                refUsersMovieList.current.classList.remove(`${s.moviesContainer}`);
                refUsersMovieList.current.classList.add(`${s.moviesContainerOpen}`);
                refFirstArrow.current.classList.add(`${s.arrowRotate}`);
              } else {
                refUsersMovieList.current.classList.remove(`${s.moviesContainerOpen}`);
                refFirstArrow.current.classList.remove(`${s.arrowRotate}`);
                refUsersMovieList.current.classList.add(`${s.moviesContainer}`);
              }
            }}
            className={s.arrowIcon}
          />
        </div>
        <div
          className={s.moviesContainer}
          ref={refUsersMovieList}
        >
          {userFavoritesMovies.map(movie => (
            <div className={s.block}>
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <div
                  role="presentation"
                  className={s.movieContainer}
                >
                  <img className={s.moviePoster} alt="movie" src={`${movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : unknownImage}`} />
                  <div className={s.movieInfoContainer}>
                    <span className={s.movieTitle}>
                      {movie.title}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div
        className={s.userSubscriptions}
      >
        <div className={s.headerContainer}>
          <span className={s.headerName}>SUBSCRIPTIONS</span>
          <ArrowIcon
            ref={refSecondArrow}
            onClick={() => {
              if (refSubscriptionsList.current.classList.contains(`${s.moviesContainer}`)) {
                refSubscriptionsList.current.classList.remove(`${s.moviesContainer}`);
                refSubscriptionsList.current.classList.add(`${s.moviesContainerOpen}`);
                refSecondArrow.current.classList.add(`${s.arrowRotate}`);
              } else {
                refSubscriptionsList.current.classList.remove(`${s.moviesContainerOpen}`);
                refSecondArrow.current.classList.remove(`${s.arrowRotate}`);
                refSubscriptionsList.current.classList.add(`${s.moviesContainer}`);
              }
            }}
            className={s.arrowIcon}
          />
        </div>
        <div
          className={s.moviesContainer}
          ref={refSubscriptionsList}
        >
          {userFavoritesMovies.map(movie => (
            <div className={s.block}>
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <div
                  role="presentation"
                  className={s.movieContainer}
                >
                  <img className={s.moviePoster} alt="movie" src={`${movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : unknownImage}`} />
                  <div className={s.movieInfoContainer}>
                    <span className={s.movieTitle}>
                      {movie.title}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserScreen;
