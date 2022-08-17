import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { Link } from 'react-router-dom';

import s from './style.module.scss';
import { ReactComponent as RandomIcon } from '../../assests/randomMovieIcon.svg';

import 'swiper/scss';
import './style.scss';

import unknownImage from '../../assests/unknownImage.svg';

const RandomMovieTest = () => {
  const [movieList, setMovieList] = useState();
  const [speedSpin, setSpeedSpin] = useState(1);
  const [swiper, setSwiper] = useState(null);
  const [movieId, setMovieId] = useState();
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

  const test = () => {
    // setSpeedSpin(prevCount => (prevCount >= 400 ? prevCount * 1.38 : prevCount * 1.8));
    setSpeedSpin(prevCount => prevCount * 1.38);
  };

  const spin = () => {
    swiper.autoplay.start();
    const interval = setInterval(test, 250);
    setTimeout(() => {
      swiper.autoplay.stop();
      clearInterval(interval);
      setSpeedSpin(1);
      setMovieId(swiper.realIndex);
    }, 5000);
  };

  useEffect(() => {
    if (swiper) {
      spin();
    }
  }, [swiper]);

  return (
    <div
      className={s.main}
      style={{
        background: `${movieId !== undefined && !swiper?.autoplay?.running && movieList[movieId]?.backdrop_path ? `url(https://image.tmdb.org/t/p/original/${movieList[movieId].backdrop_path})` : '#17222A'}`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      {movieId && !swiper?.autoplay?.running && (
        <div className={s.movieInfo}>
          <div className={s.infoContainer}>
            <span className={s.title}>
              {movieList[movieId]?.title}
            </span>
            <span className={s.original_title}>
              {`(${movieList[movieId]?.original_title})`}
            </span>
            <div>
              <span>IMDB: </span>
              <span
                className={s.rate}
                style={{ color: `${movieList[movieId].vote_average <= 5 ? '#ff2f2f' : movieList[movieId].vote_average > 5 && movieList[movieId].vote_average <= 7 ? '#eeee41' : '#29f729'}` }}
              >
                {movieList[movieId]?.vote_average}
              </span>
            </div>
          </div>
          <Link className={s.movieLink} to={`/movie/${movieList[movieId].id}`}>
            <div>Перейти до фільму</div>
          </Link>
        </div>
      )}
      <Swiper
        onSwiper={setSwiper}
        slidesPerView={5}
        breakpoints={{
          960: {
            slidesPerView: 4,
          },
          720: {
            slidesPerView: 3,
          },
          540: {
            slidesPerView: 3,
          },
          320: {
            slidesPerView: 3,
          },
        }}
        speed={speedSpin}
        allowTouchMove={false}
        centeredSlides
        autoplay={{ delay: 0 }}
        loop
        modules={[Autoplay]}
        style={{ marginBottom: `${swiper?.autoplay?.running ? '0px' : '40px'}` }}
      >
        {movieList && (
          movieList.map(movie => (
            <SwiperSlide
              key={movie.id}
              className={s.swiperSlide}
            >
              <img
                className={s.posterPath}
                alt="movie"
                src={movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : unknownImage}
              />
            </SwiperSlide>
          ))
        )}
      </Swiper>
      { !swiper?.autoplay?.running && (<div role="presentation" onClick={spin} className={s.randomIconContainer}><RandomIcon className={s.randomIcon} /></div>) }
    </div>
  );
};

export default RandomMovieTest;
