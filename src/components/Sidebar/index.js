import React, { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { Link } from 'react-router-dom';

import s from './style.module.scss';

import { ReactComponent as QuestionIcon } from '../../assests/randomMovieIcon.svg';
import { ReactComponent as ProfileIcon } from '../../assests/profile.svg';
import { ReactComponent as MarksIcon } from '../../assests/marks.svg';
import { ReactComponent as Logo } from '../../assests/logo.svg';
import { ReactComponent as Swiper } from '../../assests/swiper.svg';
import arrow from '../../assests/arrow.svg';

const Sidebar = () => {
  const [isSideBar, setIsSideBar] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
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

  console.log(isBurgerOpen);

  return (
    <div role="presentation" className={s.main} ref={refSidebar}>
      <div role="presentation" className={s.burgerContainer} onClick={() => setIsBurgerOpen(true)}>
        <div className={`${s.stroke} ${isBurgerOpen ? s.first : s.firstRerotate}`} />
        <div className={`${s.stroke} ${isBurgerOpen ? s.second : s.secondRerotate}`} />
        <div className={`${s.stroke} ${isBurgerOpen ? s.third : s.thirdRerotate}`} />
        {isBurgerOpen && (
          <div className={s.burgerModal} ref={refBurger}>
            <div className={s.burgerButtonsContainer}>
              <Link
                to="/profile"
                className={s.burgerButton}
                onClick={() => setIsBurgerOpen(false)}
              >
                Профіль
              </Link>
            </div>
            <div className={s.burgerButtonsContainer}>
              <Link
                to="/random-movie"
                className={s.burgerButton}
                onClick={() => setIsBurgerOpen(false)}
              >
                Випадоквий фільм
              </Link>
            </div>
            <div className={s.burgerButtonsContainer}>
              <Link
                to="/"
                className={s.burgerButton}
                onClick={() => setIsBurgerOpen(false)}
              >
                Відмітки
              </Link>
            </div>
            <div className={s.burgerButtonsContainer}>
              <div className={s.burgerButton}>
                Увійти
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={s.logoContainer}>
        <Link to="/">
          <Logo className={s.logo} />
        </Link>
      </div>
      <div className={s.menuContainer}>
        <Link to="/profile">
          <div className={s.menuItem}>
            <ProfileIcon className={s.profile} alt="profileIco" />
            {isSideBar && (
              <span className={s.description}>Профіль</span>
            )}
          </div>
        </Link>
        <Link to="/random-movie">
          <div className={s.menuItem}>
            <QuestionIcon className={s.randomMovie} />
            {isSideBar && (
              <span className={s.description}>Випадоквий фільм</span>
            )}
          </div>
        </Link>
        <div ref={refArrow} role="presentation" className={s.arrowContainer} onClick={openSidebar}>
          <img src={arrow} alt="arrow" />
        </div>
        <div className={s.menuItem}>
          <MarksIcon className={s.marks} alt="marksIco" />
          {isSideBar && (
            <span className={s.description}>Відмітки</span>
          )}
        </div>
      </div>
      <div className={s.swiperContainer}>
        <Swiper className={s.swiper} />
      </div>
    </div>
  );
};

export default Sidebar;
