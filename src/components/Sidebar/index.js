import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import s from './style.module.scss';

import arrow from '../../assests/arrow.svg';
import logo from '../../assests/logo.svg';
import swiper from '../../assests/swiper.svg';
import profile from '../../assests/profile.svg';
import marks from '../../assests/marks.svg';

const Sidebar = () => {
  const [isSideBar, setIsSideBar] = useState(false);
  const refSidebar = useRef(null);
  const refArrow = useRef(null);

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

  return (
    <div role="presentation" className={s.main} ref={refSidebar}>
      <div className={s.logoContainer}>
        <Link to="/">
          <img className={s.logo} alt="logo" src={logo} />
        </Link>
      </div>
      <div className={s.menuContainer}>
        <Link to="/profile">
          <div className={s.profileContainer}>
            <img className={s.profile} alt="profileIco" src={profile} />
            {isSideBar && (
              <span>Profile</span>
            )}
          </div>
        </Link>
        <div ref={refArrow} role="presentation" className={s.arrowContainer} onClick={openSidebar}>
          <img src={arrow} alt="arrow" />
        </div>
        <div className={s.marksContainer}>
          <img className={s.marks} alt="marksIco" src={marks} />
          {isSideBar && (
            <span>Marks</span>
          )}
        </div>
      </div>
      <div className={s.swiperContainer}>
        <img alt="swiperIco" src={swiper} />
      </div>
    </div>
  );
};

export default Sidebar;
