import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import s from './style.module.scss';

import unknownImage from '../../assests/unknownImage.svg';
import Error from '../../components/Error';

const LikedMovies = () => {
  const [list, setList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/list/${localStorage.getItem('userList')}?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk`)
      .then(response => response.json())
      .then((response) => {
        setList(response.items);
      });
  }, []);

  const removeMovie = (movieId) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json;charset=utf-8');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({ media_id: movieId }),
      redirect: 'follow',
    };

    const clearedList = list.filter(element => element.id !== movieId);
    setList(clearedList);

    fetch(`https://api.themoviedb.org/3/list/${localStorage.getItem('userList')}/remove_item?api_key=0575eac7d0a89edcf83d5418ad2aebed&session_id=9577a8eeacee9f458229ff5af1c5b31b2c2dd44f`, requestOptions)
      .catch(error => setErrorMessage(error));
  };
  return (
    <div
      className={s.mainContainer}
    >
      <Error message={errorMessage} />
      {localStorage.getItem('token') && (
        <div
          className={s.moviesContainer}
        >
          {list.length !== 0 ? (
            list.map(movie => (
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
                <div
                  role="presentation"
                  className={s.removeMovie}
                  onClick={() => removeMovie(movie.id)}
                >
                  <span>X</span>
                </div>
              </div>
            ))
          ) : (
            <h1 className={s.headerListEmpty}>
              Вподобані фільми відсутні
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default LikedMovies;
