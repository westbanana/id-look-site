import React, { useRef, useState } from 'react';

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
    <div className={s.main} ref={refSidebar}>
      <div className={s.logoContainer}>
        <img className={s.logo} alt="logo" src={logo} />
      </div>
      <div className={s.menuContainer}>
        <div className={s.profileContainer}>
          <img className={s.profile} alt="profileIco" src={profile} />
          {isSideBar && (
            <span>Profile</span>
          )}
        </div>
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
