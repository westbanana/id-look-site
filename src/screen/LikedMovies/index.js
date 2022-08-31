// import React, { useEffect, useState } from 'react';
import React from 'react';

import s from './style.module.scss';

const LikedMovies = ({ likedMovieList }) => {
  console.log(1);
  // useEffect(() => {
  //   setWatchList(...likedMovieList);
  // }, []);
  return (
    <div className={s.mainContainer}>
      <div className={s.likedMoviesContainer}>
        { /* {watchList && watchList.map(e => <span>{e}</span>)} */ }
        <span>{likedMovieList}</span>
      </div>
    </div>
  );
};

export default LikedMovies;
