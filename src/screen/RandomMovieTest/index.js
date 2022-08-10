import React, { useEffect, useState } from 'react';

import s from './style.module.scss';

import unknownImage from '../../assests/unknownImage.svg';

const RandomMovieTest = () => {
  const [movieList, setMovieList] = useState();
  const getRandomMovieList = () => {
    const randomPage = Math.floor((Math.random() * 500) + 1);
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk&page=${randomPage}`)
      .then(response => response.json())
      .then((response) => {
        setMovieList(response.results);
      });
  };

  console.log(movieList);

  useEffect(() => {
    getRandomMovieList();
  }, []);

  return (
    <div className={s.main}>
      <div className={s.movieListContainer}>
        {movieList && movieList.map(movie => (
          <div>
            <img
              alt="movie"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : unknownImage
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomMovieTest;
