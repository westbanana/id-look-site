import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { Link } from 'react-router-dom';

import s from './style.module.scss';

import 'swiper/scss';
import './style.scss';

import { ReactComponent as RandomIcon } from '../../assests/randomMovieIcon.svg';
import unknownImage from '../../assests/unknownImage.svg';

const RandomMovieTest = () => {
  const [movieList, setMovieList] = useState();
  const [speedSpin, setSpeedSpin] = useState(1);
  const [swiper, setSwiper] = useState(null);
  const [movieId, setMovieId] = useState();
  const [opacity, setOpacity] = useState('0');
  const refRandomIcon = useRef(null);
  const getRandomMovieList = () => {
    const randomPage = Math.floor((Math.random() * 500) + 1);
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk&page=${randomPage}`)
      .then(response => response.json())
      .then((response) => {
        setMovieList(response.results);
      });
  };

  const spinSpeed = () => {
    setSpeedSpin(prevCount => prevCount * 1.38);
  };

  const spin = () => {
    setMovieId();
    refRandomIcon.current.classList.add(`${s.hideButton}`);
    refRandomIcon.current.classList.remove(`${s.targetButton}`);
    setOpacity('1');
    setTimeout(() => {
      swiper.autoplay.start();
    }, 1);
    setTimeout(() => {
      refRandomIcon.current.classList.remove(`${s.hideButton}`);
    }, 500);
    const interval = setInterval(spinSpeed, 250);
    setTimeout(() => {
      swiper.autoplay.stop();
      clearInterval(interval);
      setSpeedSpin(1);
      setMovieId(swiper.realIndex);
      setOpacity('0');
    }, 5000);
  };

  useEffect(() => {
    getRandomMovieList();
    setTimeout(() => {
      refRandomIcon.current.classList.add(`${s.targetButton}`);
    }, 1500);
  }, []);

  return (
    <div
      className={s.main}
      style={{
        backgroundImage: `${movieId !== undefined && !swiper?.autoplay?.running && movieList[movieId]?.backdrop_path ? `url(https://image.tmdb.org/t/p/original/${movieList[movieId].backdrop_path})` : ''}`,
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
            <div className={s.imdbContainer}>
              <span className={s.imdbSpan}>IMDB: </span>
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
        style={{
          opacity: `${opacity}`,
        }}
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
      { !swiper?.autoplay?.running && !movieId && (
        <h1
          className={s.pressButton}
        >
          <span className={s.word}>
            Натисніть
          </span>
          <span className={s.word}>
            кнопку
          </span>
          <span className={s.word}>
            знизу
          </span>
          <span className={s.word}>
            екрана
          </span>
        </h1>
      )}
      { !swiper?.autoplay?.running && (
        <div
          role="presentation"
          ref={refRandomIcon}
          onClick={spin}
          className={s.randomIconContainer}
        >
          <RandomIcon className={s.randomIcon} />
        </div>
      )}
    </div>
  );
};

export default RandomMovieTest;
