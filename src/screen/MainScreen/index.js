import React, { useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useClickAway } from 'react-use';

import s from './style.module.scss';

import star from '../../assests/star.svg';
import { ReactComponent as SortArrow } from '../../assests/arrow.svg';
import unknownImage from '../../assests/unknownImage.svg';
import SortButton from '../../components/SortButton';
import { throttle } from 'lodash';

// <img className={s.modalMovieImage} alt="moviePoster" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />

// TODO: меньше кнопки пагинации, заменить (наступна, попередня)

const MainScreen = () => {
  const [movieList, setMovieList] = useState([]);
  const [expand, setExpand] = useState(false);
  const [sortList] = useState([
    'за датою',
    'за рейтингом',
    'за переглядами',
  ]);
  const [selectedSort, setSelectedSort] = useState(sortList[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedMovie, setSearchedMovie] = useState([]);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const refSortArrow = useRef(null);
  const refSortModal = useRef(null);
  const refMoviesContainer = useRef(null);
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
    if (refSortArrow.current.classList.contains(`${s.open}`)) {
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
    refMoviesContainer.current.classList.remove(`${s.showContainer}`);
    refMoviesContainer.current.classList.add(`${s.showContainer}`);
    setTimeout(() => {
      refMoviesContainer.current.classList.remove(`${s.showContainer}`);
    }, 300);
  }, [currentPage]);

  const onSearchChange = throttle((e) => {
    if (e.target.value) {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=0575eac7d0a89edcf83d5418ad2aebed&language=uk&query=${e.target.value}&page=1&include_adult=false&year=2021`)
        .then(response => response.json())
        .then((response) => {
          setSearchedMovie(response.results);
        });
    } else {
      setSearchedMovie([]);
    }
  }, 1000, { leading: false });

  return (
    <div className={s.main}>
      <div className={s.headerContainer}>
        <div className={s.logInContainer}>
          <span>Увійти</span>
        </div>
        <div className={s.searchContainer} ref={refSearchListModal}>
          <input
            placeholder="пошук"
            // onChange={e => setSearchValue(e.target.value)}
            onChange={onSearchChange}
            onFocus={() => setIsDropDownOpen(true)}
          />
          {isDropDownOpen && !!searchedMovie.length && (
            <div className={s.searchListModal}>
              {searchedMovie.map(movie => (
                <div role="presentation" className={s.modalMovieContainer} onClick={() => console.log(movie)}>
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
              ))}
            </div>
          )}
        </div>
        <div className={s.navContainer}>
          <div className={s.navMenu}>
            <span>Новини</span>
            <span>Кіно</span>
            <span>Серіали</span>
            <span>Мультфільми</span>
          </div>
          <div className={s.sortContainer} ref={refSortModal}>
            <span role="presentation" className={s.sortTitle} onClick={openSortModal}>
              {selectedSort}
            </span>
            <SortArrow role="presentation" className={s.sortArrow} ref={refSortArrow} onClick={openSortModal} />
            {expand ? (
              <SortButton arr={sortList} setExpand={setExpand} setSelectedSort={setSelectedSort} />
            )
              : ''}
          </div>
        </div>
      </div>
      <div className={s.moviesContainer} ref={refMoviesContainer}>
        {movieList && movieList.map(movie => (
          <div role="presentation" className={s.movieContainer}>
            <img className={s.moviePoster} alt="movie" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
            <div className={s.movieInfoContainer}>
              <span className={s.movieTitle}>
                {movie.title}
              </span>
              <div className={s.rateContainer}>
                <span className={s.movieRate}>
                  {movie.vote_average}
                </span>
                <img className={s.starIco} alt="star" src={star} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={s.paginateContainer}>
        <ReactPaginate
          onPageChange={onPageChange}
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
          nextLabel="наступна"
          previousLabel="попередня"
        />
      </div>
    </div>
  );
};

export default MainScreen;
