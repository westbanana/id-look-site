import React, { useEffect, useState } from 'react';

import s from './style.module.scss';

import star from '../../assests/star.svg';

const MainScreen = () => {
  const [movieList, setMovieList] = useState();

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

  return (
    <div className={s.main}>
      <div className={s.headerContainer}>
        <div className={s.logInContainer}>
          <span>Увійти</span>
        </div>
        <div className={s.searchContainer}>
          <input placeholder="пошук" />
        </div>
        <div className={s.navContainer}>
          <div className={s.navMenu}>
            <span>Новини</span>
            <span>Кіно</span>
            <span>Серіали</span>
            <span>Мультфільми</span>
          </div>
          <div className={s.sortContainer}>
            <span>
              за датою
            </span>
          </div>
        </div>
      </div>
      <div className={s.moviesContainer}>
        {movieList && (
          movieList.map(movie => (
            <div className={s.movieContainer}>
              <img className={s.moviePoster} alt="movie" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
              <div className={s.movieInfoContainer}>
                <span className={s.movieTitle}>
                  {movie.title}
                </span>
                <div className={s.rateContainer}>
                  <span className={s.movieRate}>
                    7.3
                  </span>
                  <img className={s.starIco} alt="star" src={star} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MainScreen;
