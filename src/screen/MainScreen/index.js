import React, { useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
// import { throttle } from 'lodash';
import { Link } from 'react-router-dom';
// import { useClickAway } from 'react-use';

import s from './style.module.scss';

import { ReactComponent as SortArrow } from '../../assests/arrow.svg';
import unknownImage from '../../assests/unknownImage.svg';
import Login from '../../components/Authorisation/Login';
import Error from '../../components/Error';
import SearchInput from '../../components/SearchInput';

const MainScreen = ({
  getMovie, setUserData, getUserToken, userAvatar,
}) => {
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [islogInModalOpen, setIslogInModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [nameList, setNameList] = useState('Нові');
  const refSearchListModal = useRef(null);
  const refSortList = useRef(null);
  const getMovieList = () => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk&page=${currentPage}`)
      .then(response => response.json())
      .then((response) => {
        setMovieList(response.results);
      });
  };
  useEffect(() => {
    getMovieList();
  }, []);
  const getNowPlaying = () => {
    setNameList('Зараз дивляться');
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk&page=${currentPage}`)
      .then(response => response.json())
      .then(response => setMovieList(response.results));
  };
  const getTopRated = () => {
    setNameList('Найкращі');
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk&page=${currentPage}`)
      .then(response => response.json())
      .then(response => setMovieList(response.results));
  };
  const getUpcoming = () => {
    setNameList('Незабаром');
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk&page=${currentPage}`)
      .then(response => response.json())
      .then(response => setMovieList(response.results));
  };

  const onPageChange = (e) => {
    setCurrentPage(e.selected += 1);
  };

  useEffect(() => {
    switch (nameList) {
      case 'Нові':
        getMovieList();
        break;
      case 'Зараз дивляться':
        getNowPlaying();
        break;
      case 'Незабаром':
        getUpcoming();
        break;
      case 'Найкращі':
        getTopRated();
        break;
      default:
        getMovieList();
    }
  }, [currentPage]);

  const logIn = () => {
    setIslogInModalOpen(true);
  };

  return (
    <div
      style={{
        overflow: `${isDropDownOpen ? 'hidden' : 'auto'}`,
      }}
      className={s.main}
    >
      {errorMessage && (<Error message={errorMessage} />)}
      {islogInModalOpen && (
        <Login getError={setErrorMessage} setIsLogIn={setIslogInModalOpen} setUserProfileData={setUserData} getUserToken={getUserToken} />
      )}
      <div className={s.headerContainer}>
        <div
          className={s.searchContainer}
          ref={refSearchListModal}
          style={{ margin: `${isDropDownOpen ? '0' : ''}`, width: `${isDropDownOpen ? '100%' : ''}` }}
        >
          {localStorage.getItem('token') && !isDropDownOpen ? (
            <Link
              to="/profile"
              className={s.avatarContainer}
            >
              <img
                src={userAvatar}
                alt="avatar"
                className={s.userAvatar}
              />
            </Link>
          ) : (
            <div role="presentation" className={s.logInContainer} onClick={logIn}>
              <span>Увійти</span>
            </div>
          )}
          <SearchInput
            itemsType="movies"
            changeIsDropDown={setIsDropDownOpen}
            query={(setFoundItems, inputValue) => {
              fetch(`https://api.themoviedb.org/3/search/movie?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk&query=${inputValue}&page=1&include_adult=false`)
                .then(response => response.json())
                .then((response) => {
                  setFoundItems(response.results);
                });
            }}
          />
        </div>
        <div className={s.navContainer}>
          <div className={s.navMenu} ref={refSortList}>
            <span
              role="presentation"
              className={`${s.navMenu__item} ${nameList === 'Незабаром' ? `${s.activeSort}` : ''}`}
              onClick={getUpcoming}
            >
              Незабаром
            </span>
            <span
              role="presentation"
              className={`${s.navMenu__item} ${nameList === 'Зараз дивляться' ? `${s.activeSort}` : ''}`}
              onClick={getNowPlaying}
            >
              Зараз дивляться
            </span>
            <span
              role="presentation"
              className={`${s.navMenu__item} ${nameList === 'Найкращі' ? `${s.activeSort}` : ''}`}
              onClick={getTopRated}
            >
              Найкращі
            </span>
            <span
              role="presentation"
              className={`${s.navMenu__item} ${nameList === 'Нові' ? `${s.activeSort}` : ''}`}
              onClick={() => {
                setNameList('Нові');
                getMovieList();
              }}
            >
              Нові
            </span>
          </div>
        </div>
      </div>
      <div className={s.moviesContainer}>
        {movieList && movieList.map(movie => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <div
              role="presentation"
              className={s.movieContainer}
              onClick={() => {
                getMovie(movie.id);
              }}
            >
              <img className={s.moviePoster} alt="movie" src={`${movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : unknownImage}`} />
              <div className={s.movieInfoContainer}>
                <span className={s.movieTitle}>
                  {movie.title}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className={s.paginateContainer}>
        <ReactPaginate
          onPageChange={onPageChange}
          onClick={() => window.scrollTo(0, 0)}
          pageCount={500}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          breakClassName={s.pageItem}
          breakLinkClassName={s.pageLink}
          containerClassName={s.pagination}
          pageClassName={s.pageItem}
          pageLinkClassName={s.pageLink}
          previousClassName={s.pageItem}
          previousLinkClassName={s.pageLink}
          nextClassName={s.pageItem}
          nextLinkClassName={s.pageLink}
          activeClassName={s.active}
          disabledClassName={s.disabled}
          renderOnZeroPageCount={null}
          nextLabel={<SortArrow className={s.nextLabel} />}
          previousLabel={<SortArrow />}
        />
      </div>
    </div>
  );
};

export default MainScreen;
