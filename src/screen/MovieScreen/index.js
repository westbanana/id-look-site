import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import s from './style.module.scss';

import { ReactComponent as Heart } from '../../assests/heart.svg';
import { ReactComponent as Star } from '../../assests/star.svg';

// TODO: movie/(пусто) - возвращать на главный экран, movie/(undefined id) - страница not found

const MovieScreen = () => {
  const [movieDetails, setMovieDetails] = useState([]);
  const [movieTrailer, setMovieTrailer] = useState();
  const [movieCast, setMovieCast] = useState();
  const [movieCrew, setMovieCrew] = useState();
  const { id } = useParams();
  const getMovieDetails = () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk`)
      .then(response => response.json())
      .then((response) => {
        setMovieDetails([response]);
      });
  };
  const getMovieTrailer = () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk`)
      .then(response => response.json())
      .then((response) => {
        setMovieTrailer(response.results[0].key);
      });
  };

  const getMovieCast = () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk`)
      .then(response => response.json())
      .then((response) => {
        setMovieCast(response.cast);
      });
  };
  const getMovieCrew = () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk`)
      .then(response => response.json())
      .then((response) => {
        setMovieCrew(response.crew.find(i => i.known_for_department === 'Directing'));
      });
  };

  useEffect(() => {
    getMovieDetails();
    getMovieTrailer();
    getMovieCast();
    getMovieCrew();
  }, [id]);

  return (
    <div className={s.mainContainer}>
      {movieDetails.map(movie => (
        <div className={s.movieContainer}>
          <div className={s.header}>
            <div className={s.titleContainer}>
              <span className={s.title}>{movie.title}</span>
              <span className={s.originalTitle}>{`(${movie.original_title})`}</span>
            </div>
            <div className={s.favorites}>
              <Heart className={s.heartIcon} />
            </div>
          </div>
          <div className={s.body}>
            <div className={s.image_info_container}>
              <div className={s.posterContainer}>
                <img alt="movie poster" className={s.poster} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
              </div>
              <div className={s.infoContainer}>
                <div className={s.infoBlock}>
                  <div className={s.nameField}>
                    <span>Рейтинг</span>
                  </div>
                  <div className={s.descriptionField}>
                    <span>{movieDetails[0].vote_average}</span>
                  </div>
                </div>
                <div className={s.infoBlock}>
                  <div className={s.nameField}>
                    <span>Слоган</span>
                  </div>
                  <div className={s.descriptionField}>
                    {movieDetails[0].tagline.length === 0 ? 'Відсутній' : <span>{movieDetails[0].tagline}</span>}
                  </div>
                </div>
                <div className={s.infoBlock}>
                  <div className={s.nameField}>
                    <span>Дата виходу</span>
                  </div>
                  <div className={s.descriptionField}>
                    <span>{movieDetails[0].release_date}</span>
                  </div>
                </div>
                <div className={s.infoBlock}>
                  <div className={s.nameField}>
                    <span>Країна</span>
                  </div>
                  <div className={s.descriptionField}>
                    {movieDetails[0].production_countries.map(i => <span>{i.name}</span>)}
                  </div>
                </div>
                <div className={s.infoBlock}>
                  <div className={s.nameField}>
                    <span>Режисер</span>
                  </div>
                  <div className={s.descriptionField}>
                    {movieCrew ? <span>{movieCrew.name}</span> : ''}
                  </div>
                </div>
                <div className={s.infoBlock}>
                  <div className={s.nameField}>
                    <span>Жанр</span>
                  </div>
                  <div className={s.descriptionField}>
                    {movieDetails[0].genres.map(i => <span>{`${i.name} `}</span>)}
                  </div>
                </div>
                <div className={s.infoBlock}>
                  <div className={s.nameField}>
                    <span>Час</span>
                  </div>
                  <div className={s.descriptionField}>
                    <span>{`${movieDetails[0].runtime}хв.`}</span>
                  </div>
                </div>
                <div className={s.infoBlock}>
                  <div className={s.nameField}>
                    <span>У ролях:</span>
                  </div>
                  <div className={s.descriptionField}>
                    {movieCast && (movieCast.map(i => <span>{`${i.name}, `}</span>))}
                  </div>
                </div>
              </div>
            </div>
            {movie.overview && (
              <div className={s.aboutContainer}>
                <span className={s.about}>{`Про що фільм «${movie.title}»:`}</span>
                <span className={s.overview}>{movie.overview}</span>
              </div>
            )}
            {movieTrailer && (
              <div className={s.trailerContainer}>
                <iframe
                  title="trailer"
                  width="800"
                  height="500"
                  src={`https://www.youtube.com/embed/${movieTrailer}?showinfo=0`}
                  allowFullScreen
                />
              </div>
            )}
            <div className={s.rateContainer}>
              <div className={s.starsContainer}>
                <Star className={s.star} />
                <Star className={s.star} />
                <Star className={s.star} />
                <Star className={s.star} />
                <Star className={s.star} />
                <Star className={s.star} />
                <Star className={s.star} />
                <Star className={s.star} />
                <Star className={s.star} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieScreen;
