import React, { useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useClickAway } from 'react-use';
import { throttle } from 'lodash';
import { Link } from 'react-router-dom';

import s from './style.module.scss';

import star from '../../assests/star.svg';
import { ReactComponent as SortArrow } from '../../assests/arrow.svg';
import unknownImage from '../../assests/unknownImage.svg';
import SortButton from '../../components/SortButton';
import Login from '../../components/Authorisation/Login';

const MainScreen = ({
  getMovie, setUserData, userData, getUserToken,
}) => {
  const [movieList, setMovieList] = useState([]);
  const [expand, setExpand] = useState(false);
  const [sortList] = useState([
    'за датою',
    'за рейтингом',
    'за переглядами',
  ]);
  const [selectedSort, setSelectedSort] = useState('сортувати');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedMovie, setSearchedMovie] = useState([]);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [islogInModalOpen, setIslogInModalOpen] = useState(false);
  const refSortArrow = useRef(null);
  const refSortModal = useRef(null);
  const refSearchListModal = useRef(null);

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

  const openSortModal = () => {
    if (expand) {
      setExpand(false);
      refSortArrow.current.classList.remove(`${s.open}`);
      refSortArrow.current.classList.add(`${s.sortArrow}`);
    } else {
      refSortArrow.current.classList.add(`${s.open}`);
      refSortArrow.current.classList.remove(`${s.sortArrow}`);
      setExpand(true);
    }
  };

  useClickAway(refSortModal, () => {
    setExpand(false);
    refSortArrow.current.classList.remove(`${s.open}`);
    refSortArrow.current.classList.add(`${s.sortArrow}`);
  });

  useClickAway(refSearchListModal, () => {
    setIsDropDownOpen(false);
  });

  const onPageChange = (e) => {
    setCurrentPage(e.selected += 1);
    getMovieList();
  };

  useEffect(() => {
    getMovieList();
  }, [currentPage]);

  const onSearchChange = throttle((e) => {
    if (e.target.value) {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk&query=${e.target.value}&page=1&include_adult=false`)
        .then(response => response.json())
        .then((response) => {
          setSearchedMovie(response.results);
        });
    } else {
      setSearchedMovie([]);
    }
  }, 1000, { leading: false });

  const sortMovieList = (sort) => {
    if (sort === 'за датою') {
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk&sort_by=release_date.desc&include_adult=false&include_video=false&page=${currentPage}&with_watch_monetization_types=flatrate`)
        .then(response => response.json())
        .then(response => setMovieList(response.results));
    } else if (sort === 'за рейтингом') {
      fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk&page=${currentPage}`)
        .then(response => response.json())
        .then(response => setMovieList(response.results));
    } else {
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk&sort_by=vote_count.desc&include_adult=false&include_video=false&page=${currentPage}&with_watch_monetization_types=flatrate`)
        .then(response => response.json())
        .then(response => setMovieList(response.results));
    }
  };

  const logIn = () => {
    setIslogInModalOpen(true);
  };

  return (
    <div className={s.main}>
      {islogInModalOpen && (
        <Login setIsLogIn={setIslogInModalOpen} setUserProfileData={setUserData} getUserToken={getUserToken} />
      )}
      <div className={s.headerContainer}>
        {userData.name && userData.surname ? (
          <Link to="/profile" className={s.logInContainer}>
            <span>{userData.name && userData.surname ? `${userData.name} ${userData.surname}` : 'Увійти'}</span>
          </Link>
        ) : (
          <div role="presentation" className={s.logInContainer} onClick={logIn}>
            <span>{userData.name && userData.surname ? `${userData.name} ${userData.surname}` : 'Увійти'}</span>
          </div>
        )}
        <div className={s.searchContainer} ref={refSearchListModal}>
          <input
            placeholder="пошук"
            onChange={onSearchChange}
            onFocus={() => setIsDropDownOpen(true)}
          />
          {isDropDownOpen && !!searchedMovie.length && (
            <div className={s.searchListModal}>
              {searchedMovie.map(movie => (
                <Link key={movie.id} to={`/movie/${movie.id}`} className={s.testLink}>
                  <div role="presentation" className={s.modalMovieContainer}>
                    <div className={s.modalMovieImageContainer}>
                      <img
                        className={s.modalMovieImage}
                        alt="moviePoster"
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                            : unknownImage
                        }
                      />
                    </div>
                    <div className={s.modalMovieInfoContainer}>
                      <span className={s.originalTitle}>{`(${movie.original_title})`}</span>
                      <span>{movie.title}</span>
                      <div className={s.modalMovieRate}>
                        <span>{movie.vote_average}</span>
                        <img alt="star" src={star} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className={s.navContainer}>
          <div className={s.navMenu}>
            <span role="presentation" className={s.navMenu__item}>Незабаром</span>
            <span className={s.navMenu__item}>Зараз дивляться</span>
            <span className={s.navMenu__item}>Найкращі</span>
          </div>
          <div className={s.sortContainer} ref={refSortModal}>
            <span role="presentation" className={s.sortTitle} onClick={openSortModal}>
              {selectedSort}
            </span>
            <SortArrow role="presentation" className={s.sortArrow} ref={refSortArrow} onClick={openSortModal} />
            {expand ? (
              <SortButton arr={sortList} setExpand={setExpand} setSelectedSort={setSelectedSort} sort={sortMovieList} />
            )
              : ''}
          </div>
        </div>
      </div>
      <div className={s.moviesContainer}>
        {movieList && movieList.map(movie => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className={s.testLink}>
            <div
              role="presentation"
              className={s.movieContainer}
              onClick={() => {
                getMovie(movie.id);
              }}
            >
              <div className={s.testRate}>
                <span>
                  {`IMDb: ${movie.vote_average}`}
                </span>
              </div>
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
