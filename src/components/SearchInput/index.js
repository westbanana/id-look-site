import React, { useEffect, useRef, useState } from 'react';
import { throttle } from 'lodash';
import { Link } from 'react-router-dom';

import s from './style.module.scss';

import { ReactComponent as RemoveIcon } from '../../assests/remove.svg';
import unknownImage from '../../assests/unknownImage.svg';

const SearchInput = ({ query, changeIsDropDown, itemsType }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [foundItems, setFoundItems] = useState([]);
  const refSearchInput = useRef(null);
  useEffect(() => {
    if (changeIsDropDown) {
      changeIsDropDown(isDropDownOpen);
    }
  }, [isDropDownOpen]);
  const onSearchChange = throttle((e) => {
    if (e.target.value) {
      query(setFoundItems, e.target.value);
      setIsDropDownOpen(true);
    } else {
      setIsDropDownOpen(false);
      setFoundItems([]);
    }
  }, 1000, { leading: false });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      setIsDropDownOpen(false);
      refSearchInput.current.value = '';
    }
  });
  return (
    <div
      style={{
        height: `${isDropDownOpen ? '100vh' : ''}`,
      }}
      className={s.mainSearch}
    >
      <div
        style={{
          minWidth: `${isDropDownOpen ? '100%' : '50%'}`,
        }}
        className={s.inputContainer}
      >
        <input
          ref={refSearchInput}
          placeholder="пошук"
          onChange={onSearchChange}
          style={{
            marginTop: `${refSearchInput?.current?.value ? '0' : '50px'}`,
            minWidth: `${refSearchInput?.current?.value ? '100%' : '50%'}`,
          }}
        />
        {isDropDownOpen && (
          <RemoveIcon
            className={s.closeSearchContainerButton}
            onClick={() => {
              setIsDropDownOpen(false);
              refSearchInput.current.value = '';
            }}
          />
        )}
      </div>
      {isDropDownOpen && !!foundItems.length && itemsType === 'movies' && (
        <div
          className={s.searchListModal}
          style={{
            gridTemplateColumns: `${itemsType !== 'users' ? 'repeat(auto-fill, minmax(230px, 1fr))' : 'repeat(auto-fill, minmax(400px, 1fr))'}`,
          }}
        >
          {foundItems.map(movie => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <div role="presentation" className={s.modalMovieContainer}>
                <img
                  className={s.modalMovieImage}
                  alt="moviePoster"
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : unknownImage
                  }
                />
                <div className={s.modalMovieInfoContainer}>
                  <span>{movie.title}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {isDropDownOpen && !!foundItems.length && itemsType === 'users' && (
        <div
          className={s.searchListModal}
        >
          {foundItems.map(user => (
            <div className={s.userContainer} key={user.id}>
              <div role="presentation" className={s.userAvatar}>
                <img
                  className={s.modalUsersImage}
                  alt="moviePoster"
                  src={user.avatar}
                />
              </div>
              <div className={s.userInfo}>
                <span className={s.name}>
                  {`${user.name} ${user.surname}`}
                </span>
                <span
                  className={s.login}
                >
                  {`@${user.login}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
