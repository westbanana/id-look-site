import React, { useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useClickAway } from 'react-use';

import s from './style.module.scss';

import star from '../../assests/star.svg';
import { ReactComponent as SortArrow } from '../../assests/arrow.svg';
import SortButton from '../../components/SortButton';

const MainScreen = () => {
  const [movieList, setMovieList] = useState();
  const [expand, setExpand] = useState(false);
  const [sortList] = useState([
    'за датою',
    'за рейтингом',
    'за переглядами',
  ]);
  const [selectedSort, setSelectedSort] = useState(sortList[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const refSortArrow = useRef(null);
  const refSortModal = useRef(null);
  const refMoviesContainer = useRef(null);

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

  return (
    <div className={s.main}>
      <div className={s.headerContainer}>
        <div className={s.logInContainer}>
          <span>Увійти</span>
        </div>
        <div className={s.searchContainer}>
          <input placeholder="пошук" />
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
        {movieList && (
          movieList.map(movie => (
            <div role="presentation" className={s.movieContainer} onClick={() => console.log(movie)}>
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
          ))
        )}
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
