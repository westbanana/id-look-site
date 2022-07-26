import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import s from './style.module.scss';

import unknownImage from '../../assests/unknownImage.svg';

const RandomMovieScreen = () => {
  // const [randomId, setRandomId] = useState();
  // const [randomPage, setRandomPage] = useState();
  // const [movieId, setMovieId] = useState();
  const [randomMovie, setRandomMovie] = useState({});
  // const [randomMovie, setRandomMovie] = useState();

  const getRandomNumber = maxNumber => (
    Math.floor((Math.random() * maxNumber) + 1)
  );

  const getRandomMovie = () => {
    const randomPage = (getRandomNumber(500));
    const randomId = (getRandomNumber(19));
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk&page=${randomPage}`)
      .then(response => response.json())
      .then((response) => {
        fetch(`https://api.themoviedb.org/3/movie/${response.results[randomId].id}?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk`)
          .then(movie => movie.json())
          .then((movie) => {
            setRandomMovie(movie);
          });
      });
  };

  useEffect(() => {
    getRandomMovie();
  }, []);

  return (
    <div
      className={s.mainContainer}
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${randomMovie.backdrop_path})` }}
    >
      <div className={s.mainContainerGradient}>
        <Link to={`/movie/${randomMovie.id}`} className={s.linkContainer}>
          <div className={s.movieContainer}>
            <div className={s.moviePosterContainer}>
              <img
                className={s.poster}
                alt="movie-poster"
                src={
                  randomMovie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${randomMovie.poster_path}`
                    : unknownImage
                }
              />
            </div>
            <div className={s.movieInfoContainer}>
              <div className={s.titleContainer}>
                <span className={s.title}>
                  {randomMovie.title}
                </span>
                <span className={s.originalTitle}>
                  {`(${randomMovie.original_title})`}
                </span>
              </div>
              <div className={s.genresContainer}>
                {randomMovie.genres && (
                  randomMovie.genres.map(i => (
                    <span>{i.name}</span>
                  ))
                )}
              </div>
              <div className={s.release_dateContainer}>
                <span>
                  {randomMovie.release_date}
                </span>
              </div>
              <div className={s.runtimeContainer}>
                <span>
                  {`${randomMovie.runtime}хв`}
                </span>
              </div>
            </div>
          </div>
        </Link>
        <button
          type="button"
          onClick={() => getRandomMovie()}
          className={s.getMovieButton}
        >
          Отримати випадковий фільм
        </button>
      </div>
    </div>
  );
};
export default RandomMovieScreen;
