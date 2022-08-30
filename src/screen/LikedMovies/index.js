import React from 'react';

import s from './style.module.scss';

const LikedMovies = ({ likedMovieList }) => {
  console.log('LIKED', likedMovieList);
  return (
    <div className={s.mainContainer}>
      <div className={s.likedMoviesContainer}>
        123123
      </div>
    </div>
  );
};

export default LikedMovies;
