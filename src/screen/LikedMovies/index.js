// import React, { useEffect, useState } from 'react';
import React, { useEffect, useState } from 'react';

import s from './style.module.scss';
import unknownImage from '../../assests/unknownImage.svg';
import { Link } from 'react-router-dom';

const LikedMovies = () => {
  const [likedMovieList, setLikedMovieList] = useState([]);
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/list/${localStorage.getItem('userList')}?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk`)
      .then(response => response.json())
      .then(response => setLikedMovieList(response.items));
  }, []);
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/list/${localStorage.getItem('userList')}?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk`)
      .then(response => response.json())
      .then(response => setLikedMovieList(response.items));
  }, [likedMovieList]);

  const removeMovie = (movieId) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json;charset=utf-8');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({ media_id: movieId }),
      redirect: 'follow',
    };

    fetch(`https://api.themoviedb.org/3/list/${localStorage.getItem('userList')}/remove_item?api_key=0575eac7d0a89edcf83d5418ad2aebed&session_id=9577a8eeacee9f458229ff5af1c5b31b2c2dd44f`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
  return (
    <div className={s.mainContainer}>
      <div className={s.moviesContainer}>
        {likedMovieList && (likedMovieList.map(movie => (
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
        )))}
      </div>
    </div>
  );
};

export default LikedMovies;
