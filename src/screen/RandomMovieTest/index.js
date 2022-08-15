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
  const [delaySpin, setDelaySpin] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [speedSpin, setSpeedSpin] = useState(1);
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [movieId, setMovieId] = useState();
  const getRandomMovieList = () => {
    const randomPage = Math.floor((Math.random() * 500) + 1);
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk&page=${randomPage}`)
      .then(response => response.json())
      .then((response) => {
        setMovieList(response.results);
      });
  };

  useEffect(() => {
    getRandomMovieList();
  }, []);

  const test = () => {
    setDelaySpin(prevCount => (prevCount * 0));
    setSpeedSpin(prevCount => prevCount * 1.4);
  };

  const spin = () => {
    setIsSpinning(true);
    firstSwiper.autoplay.start();
    const interval = setInterval(test, 250);
    setTimeout(() => {
      firstSwiper.autoplay.stop();
      clearInterval(interval);
      setIsSpinning(false);
      setDelaySpin(0);
      setSpeedSpin(1);
      setMovieId(firstSwiper.realIndex);
    }, 5000);
  };

  useEffect(() => {
    if (firstSwiper) {
      spin();
    }
  }, [firstSwiper]);

  return (
    <div
      className={s.main}
      style={{
        backgroundImage: `${movieId !== undefined ? `url(https://image.tmdb.org/t/p/original/${movieList[movieId].backdrop_path})` : unknownImage}`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Swiper
        onSwiper={setFirstSwiper}
        slidesPerView={5}
        speed={speedSpin}
        allowTouchMove={false}
        centeredSlides
        autoplay={{
          delay: delaySpin,
        }}
        loop
        modules={[Autoplay]}
      >
        {movieList && (
          movieList.map(movie => (
            <SwiperSlide key={movie.id} className={s.swiperSlide}>
              <Link to={`/movie/${movie.id}`}>
                <img
                  className={s.posterPath}
                  alt="movie"
                  src={movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : unknownImage}
                />
              </Link>
            </SwiperSlide>
          ))
        )}
      </Swiper>
      {!isSpinning && (<div role="presentation" onClick={spin} className={s.randomIconContainer}><RandomIcon className={s.randomIcon} /></div>) }
    </div>
  );
};

export default RandomMovieTest;
