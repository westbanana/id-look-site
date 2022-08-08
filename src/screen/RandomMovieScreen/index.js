import React, { useEffect, useState } from 'react';

import s from './style.module.scss';

import unknownImage from '../../assests/unknownImage.svg';

const RandomMovieScreen = () => {
  const [movieId, setMovieId] = useState();
  const [randomMovie, setRandomMovie] = useState();
  const [animation, setAnimation] = useState(false);
  const getRandomMovie = () => {
    setAnimation(true);
    const page = Math.floor(Math.random() * 500);
    const randomId = Math.floor(Math.random() * 20);
    console.log('page', page);
    console.log('randomId', randomId);
    console.log('animation', animation);
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk&page=${page}`)
      .then(response => response.json())
      .then((response) => {
        setMovieId(response.results[randomId].id);
      });
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk`)
      .then(response => response.json())
      .then((response) => {
        setRandomMovie(response);
      });
    console.log('randomMovie', randomMovie);
    setTimeout(() => {
      setAnimation(false);
    }, 500);
  };

  useEffect(() => {
    getRandomMovie();
  }, []);

  return (
    <div className={s.mainContainer}>
      <div className={`${s.movieContainer} ${animation ? s.changeMovie : ''}`}>
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
          <div className={s.budgetContainer}>
            <span>
              {`${randomMovie.budget}$`}
            </span>
          </div>
        </div>
      </div>
      {!animation && (
        <button
          type="button"
          onClick={getRandomMovie}
          className={s.getMovieButton}
        >
          Отримати випадковий фільм
        </button>
      )}
    </div>
  );
};
export default RandomMovieScreen;
