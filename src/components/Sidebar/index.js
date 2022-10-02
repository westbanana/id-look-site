import React, { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { Link } from 'react-router-dom';

import s from './style.module.scss';

import Login from '../Authorisation/Login';
import { ReactComponent as QuestionIcon } from '../../assests/randomMovieIcon.svg';
import { ReactComponent as ProfileIcon } from '../../assests/profile.svg';
import { ReactComponent as MarksIcon } from '../../assests/marks.svg';
import { ReactComponent as Logo } from '../../assests/logo.svg';
import { ReactComponent as LogoFull } from '../../assests/logoFull.svg';
import { ReactComponent as Swiper } from '../../assests/swiper.svg';
import { ReactComponent as Arrow } from '../../assests/arrow.svg';

const Sidebar = ({
  setTheme, theme, getUserToken, setUserData,
}) => {
  const [isSideBar, setIsSideBar] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const refSidebar = useRef(null);
  const refArrow = useRef(null);
  const refBurger = useRef(null);
  const openSidebar = () => {
    if (refSidebar.current.classList.contains(`${s.mainOpen}`)) {
      refSidebar.current.classList.remove(`${s.mainOpen}`);
      refArrow.current.classList.remove(`${s.arrowRotate}`);
      setIsSideBar(!isSideBar);
    } else {
      refSidebar.current.classList.add(`${s.mainOpen}`);
      refArrow.current.classList.add(`${s.arrowRotate}`);
      setIsSideBar(!isSideBar);
    }
  };
  useClickAway(refBurger, () => {
    setIsBurgerOpen(false);
  });

  useClickAway(refBurger || refArrow, () => {
    refSidebar.current.classList.remove(`${s.mainOpen}`);
    refArrow.current.classList.remove(`${s.arrowRotate}`);
    setIsSideBar(false);
  });

  useClickAway(refSidebar, () => {
    setIsSideBar(false);
    refSidebar.current.classList.remove(`${s.mainOpen}`);
    refArrow.current.classList.remove(`${s.arrowRotate}`);
  });

  const closeBurger = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  const swapTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };
  const isUserAuthorize = () => {
    setIsModalOpen(true);
  };
  return (
    <div role="presentation" className={s.main} ref={refSidebar}>
      {isModalOpen && (
        <Login
          setIsLogIn={setIsModalOpen}
          getUserToken={getUserToken}
          setUserProfileData={setUserData}
        />
      )}
      <div role="presentation" className={s.burgerContainer} onClick={() => setIsBurgerOpen(!isBurgerOpen)}>
        <div className={`${s.stroke} ${isBurgerOpen ? s.first : s.firstRerotate}`} />
        <div className={`${s.stroke} ${isBurgerOpen ? s.second : s.secondRerotate}`} />
        <div className={`${s.stroke} ${isBurgerOpen ? s.third : s.thirdRerotate}`} />
        {isBurgerOpen && (
          <div className={s.burgerModal}>
            {localStorage.getItem('token') ? (
              <Link
                to="/profile"
                className={s.burgerButtonsContainer}
                onClick={closeBurger}
              >
                Профіль
              </Link>
            ) : (
              <div
                role="presentation"
                className={s.burgerButtonsContainer}
                onClick={() => {
                  closeBurger();
                  isUserAuthorize();
                }}
              >
                Профіль
              </div>
            )}
            <Link
              to="/random-movie-test"
              className={s.burgerButtonsContainer}
              onClick={closeBurger}
            >
              Випадковий фільм
            </Link>
            <Link
              to="/liked-movies"
              className={s.burgerButtonsContainer}
              onClick={closeBurger}
            >
              Відмітки
            </Link>
            <div
              role="presentation"
              className={s.burgerButtonsContainer}
              onClick={closeBurger}
            >
              <div className={s.burgerButton}>
                {localStorage.getItem('token') ? 'Профіль' : 'Увійти'}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={s.logoContainer}>
        <Link to="/">
          {!isSideBar ? <Logo className={s.logo} />
            : <LogoFull className={s.logo} /> }
        </Link>
      </div>
      <div className={s.menuContainer}>
        {localStorage.getItem('token') ? (
          <Link to="/profile">
            <div className={s.menuItem}>
              <ProfileIcon className={s.profile} alt="profileIco" />
              {isSideBar && (
                <span className={s.description}>Профіль</span>
              )}
            </div>
          </Link>
        ) : (
          <div
            role="presentation"
            onClick={isUserAuthorize}
          >
            <div className={s.menuItem}>
              <ProfileIcon className={s.profile} alt="profileIco" />
              {isSideBar && (
                <span className={s.description}>Профіль</span>
              )}
            </div>
          </div>
        )}
        <Link to="/random-movie-test">
          <div className={s.menuItem}>
            <QuestionIcon className={s.randomMovie} />
            {isSideBar && (
              <span className={s.description}>Випадоквий фільм</span>
            )}
          </div>
        </Link>
        <div ref={refArrow} role="presentation" className={s.arrowContainer} onClick={openSidebar}>
          <Arrow />
        </div>
        {localStorage.getItem('token') ? (
          <Link to="/liked-movies" className={s.menuItem}>
            <MarksIcon className={s.marks} alt="marksIco" />
            {isSideBar && (
              <span className={s.description}>Відмітки</span>
            )}
          </Link>
        ) : (
          <div
            role="presentation"
            onClick={isUserAuthorize}
          >
            <div className={s.menuItem}>
              <MarksIcon className={s.marks} alt="marksIco" />
              {isSideBar && (
                <span className={s.description}>Відмітки</span>
              )}
            </div>
          </div>
        )}
      </div>
      <div
        role="presentation"
        className={s.swiperContainer}
      >
        <Swiper
          className={s.swiper}
          onClick={swapTheme}
        />
      </div>
    </div>
  );
};

export default Sidebar;
