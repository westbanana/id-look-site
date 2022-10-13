import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import s from './style.module.scss';

import unknownImage from '../../assests/unknownImage.svg';

const UserScreen = () => {
  const id = useParams();
  const [userData, setUserData] = useState({});
  const [listId, setListId] = useState('');
  const [userFavoritesMovies, setUserFavoritesMovies] = useState([]);
  const refUsersMovieList = useRef(null);
  const token = localStorage.getItem('token');
  const {
    avatar, login, name, surname, watchListId,
  } = userData;
  const getUser = () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`https://id-look-server.herokuapp.com/api/v1/users?user_id=${id.userId}`, requestOptions)
      .then(response => response.json())
      .then((result) => {
        setUserData(result.data);
        setListId(result.data.watchListId);
        if (watchListId) ;
      })
      .catch(error => console.log('error', error));
  };

  const getUserFavoritesMovie = () => {
    fetch(`https://api.themoviedb.org/3/list/${listId}?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk`)
      .then(response => response.json())
      .then((response) => {
        setUserFavoritesMovies(response.items);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (listId) getUserFavoritesMovie();
  }, [listId]);
  return (
    <div
      style={{
        justifyContent: userFavoritesMovies.length ? '' : 'center',
      }}
      className={s.main}
    >
      <div className={s.userAvatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <div className={s.userName}>
        <span className={s.name}>{`${name} ${surname}`}</span>
        <span className={s.login}>{login}</span>
      </div>
      <div
        className={s.moviesContainer}
        ref={refUsersMovieList}
      >
        {userFavoritesMovies?.map(movie => (
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
  );
};

export default UserScreen;
