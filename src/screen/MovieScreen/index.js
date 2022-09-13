import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import s from './style.module.scss';

import { ReactComponent as Heart } from '../../assests/heart.svg';
import { ReactComponent as FullHeart } from '../../assests/fullHeart.svg';
import { ReactComponent as Star } from '../../assests/star.svg';

const MovieScreen = () => {
  const [movieDetails, setMovieDetails] = useState([]);
  const [movieTrailer, setMovieTrailer] = useState();
  const [movieCast, setMovieCast] = useState();
  const [movieCrew, setMovieCrew] = useState();
  const [liked, setLiked] = useState(false);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [moviesIdList, setMoviesIdList] = useState([]);
  const refFrame = useRef(null);
  const { id } = useParams();
  const movieID = Number(id);
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/list/${localStorage.getItem('userList')}?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk`)
      .then(response => response.json())
      .then((response) => {
        setMoviesIdList(response.items.map(e => e.id));
      });
  }, []);

  useEffect(() => {
    if (moviesIdList) {
      const result = moviesIdList.find(element => element === movieID);
      if (result === movieID) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }, [moviesIdList]);
  const rateArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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

  const addMovieToList = () => {
    setLiked(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json;charset=utf-8');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({ media_id: id }),
      redirect: 'follow',
    };

    fetch(`https://api.themoviedb.org/3/list/${localStorage.getItem('userList')}/add_item?api_key=0575eac7d0a89edcf83d5418ad2aebed&session_id=9577a8eeacee9f458229ff5af1c5b31b2c2dd44f`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  const removeMovieFromList = () => {
    setLiked(false);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json;charset=utf-8');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({ media_id: id }),
      redirect: 'follow',
    };

    fetch(`https://api.themoviedb.org/3/list/${localStorage.getItem('userList')}/remove_item?api_key=0575eac7d0a89edcf83d5418ad2aebed&session_id=9577a8eeacee9f458229ff5af1c5b31b2c2dd44f`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
  const changeMovieStatus = () => {
    if (!liked) {
      addMovieToList();
    } else {
      removeMovieFromList();
    }
  };
  return (
    <div className={s.mainContainer}>
      {movieDetails.map(movie => (
        <div className={s.movieContainer}>
          <div className={s.header}>
            <div className={s.titleContainer}>
              <span className={s.title}>{movie.title}</span>
              <span className={s.originalTitle}>{`(${movie.original_title})`}</span>
            </div>
            <div
              role="presentation"
              className={s.favorites}
              onClick={changeMovieStatus}
            >
              {liked ? <FullHeart className={s.heartIconFull} /> : <Heart className={s.heartIcon} />}
            </div>
          </div>
          <div className={s.body}>
            <div className={s.image_info_container}>
              <div className={s.posterContainer}>
                <img alt="movie poster" className={s.poster} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
              </div>
              <div className={s.infoContainer}>
                <div className={s.infoBlock}>
                  <span className={s.nameField}>Рейтинг</span>
                  <div className={s.blockDecription}>
                    <span>{movieDetails[0].vote_average}</span>
                  </div>
                </div>
                <div className={s.infoBlock}>
                  <span className={s.nameField}>Слоган</span>
                  <div className={s.blockDecription}>
                    {movieDetails[0].tagline.length === 0 ? <span>Відсутній</span> : <span>{movieDetails[0].tagline}</span>}
                  </div>
                </div>
                <div className={s.infoBlock}>
                  <span className={s.nameField}>Дата виходу</span>
                  <div className={s.blockDecription}>
                    <span>{movieDetails[0].release_date}</span>
                  </div>
                </div>
                <div className={s.infoBlock}>
                  <span className={s.nameField}>Країна</span>
                  <div className={s.blockDecription}>
                    {movieDetails[0].production_countries.map(i => <span>{i.name}</span>)}
                  </div>
                </div>
                <div className={s.infoBlock}>
                  <span className={s.nameField}>Режисер</span>
                  <div className={s.blockDecription}>
                    {movieCrew ? <span>{movieCrew.name}</span> : ''}
                  </div>
                </div>
                <div className={s.infoBlock}>
                  <span className={s.nameField}>Жанр</span>
                  <div className={s.genres}>
                    {movieDetails[0].genres.map(i => <span>{`${i.name} `}</span>)}
                  </div>
                </div>
                <div className={s.infoBlock}>
                  <span className={s.nameField}>Час</span>
                  <div className={s.blockDecription}>
                    <span>{`${movieDetails[0].runtime}хв.`}</span>
                  </div>
                </div>
                <div className={s.infoBlock}>
                  <span className={s.nameField}>У ролях:</span>
                  <div className={s.blockDecription}>
                    {movieCast && (movieCast.map(i => <Link to={`/actor/${i.id}`} key={i.id}>{`${i.name},  `}</Link>))}
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
                  ref={refFrame}
                  title="trailer"
                  src={`https://www.youtube.com/embed/${movieTrailer}?showinfo=0`}
                  allowFullScreen
                />
              </div>
            )}
            <div className={s.rateContainer}>
              <div>
                {rateArr.map((labelKey, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={labelKey}>
                      <input
                        type="radio"
                        name="ratind"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                      />
                      <Star
                        className={s.star}
                        style={{ fill: `${ratingValue <= (hover || rating) ? '#ffc107' : ''}` }}
                        onMouseOver={() => setHover(ratingValue)}
                        onMouseOut={() => setHover(null)}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieScreen;
