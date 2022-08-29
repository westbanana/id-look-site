import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import s from './style.module.scss';

import unknownImage from '../../assests/unknownImage.svg';

const ActorsScreen = () => {
  const [actorDetails, setActorDetails] = useState({});
  const [actorMovieList, setActorMovieList] = useState([]);
  const { actorId } = useParams();
  const getActorDetails = () => {
    fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk`)
      .then(response => response.json())
      .then(response => setActorDetails(response));
  };
  const getActorMovieCredits = () => {
    fetch(`https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk`)
      .then(response => response.json())
      .then(response => setActorMovieList(response.cast));
  };
  useEffect(() => {
    getActorDetails();
    getActorMovieCredits();
  }, []);

  const searchMovie = (value) => {
    const result = actorMovieList.filter(movie => movie.title.toLowerCase().includes(value.toLowerCase()));
    setActorMovieList(value ? result : actorMovieList);
    if (!value.length) {
      getActorMovieCredits();
    }
  };

  return (
    <div className={s.main}>
      <div className={s.actorContainer}>
        <div className={s.actorInfoContainer}>
          <div className={s.actorPhotoContainer}>
            <img src={`https://image.tmdb.org/t/p/w200/${actorDetails.profile_path}`} alt={actorDetails.name} />
          </div>
          <div className={s.infoDescription}>
            <div className={`${s.info} ${s.firstNameInfo}`}>
              <span className={s.nameInfo}>Iм&apos;я</span>
              <span>{actorDetails.name}</span>
            </div>
            <div className={s.info}>
              <span className={s.nameInfo}>Дата народження</span>
              <span>{actorDetails.birthday}</span>
            </div>
            <div className={s.info}>
              <span className={s.nameInfo}>Місце народження</span>
              <span>{actorDetails.place_of_birth}</span>
            </div>
            <div className={s.info}>
              <span className={s.nameInfo}>Популярність</span>
              <span>{actorDetails.popularity}</span>
            </div>
          </div>
        </div>
        <div className={s.actorMovieList}>
          <div className={s.searchContainer}>
            <input className={s.searchInput} placeholder="пошук" onChange={e => searchMovie(e.target.value)} />
          </div>
          <div className={s.moviesContainer}>
            {actorMovieList.map(movie => (
              <Link to={`/movie/${movie.id}`} className={s.movie}>
                <div className={s.movieContainer}>
                  <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : unknownImage} alt={movie.title} />
                  <div className={s.movieTitle}>
                    <span>{movie.title}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorsScreen;
