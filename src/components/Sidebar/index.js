import React, { useRef } from 'react';

import s from './style.module.scss';

import arrow from '../../assests/arrow.svg';

const Sidebar = () => {
  const refSidebar = useRef(null);
  const refArrow = useRef(null);

  const openSidebar = () => {
    if (refSidebar.current.classList.contains(`${s.mainOpen}`)) {
      refSidebar.current.classList.remove(`${s.mainOpen}`);
      refArrow.current.classList.remove(`${s.arrowRotate}`);
    } else {
      refSidebar.current.classList.add(`${s.mainOpen}`);
      refArrow.current.classList.add(`${s.arrowRotate}`);
    }
  };

  return (
    <div className={s.main} ref={refSidebar}>
      <div className={s.logoContainer}>
        Logo
      </div>
      <div className={s.menuContainer}>
        <div>
          Profile
        </div>
        <div ref={refArrow} role="presentation" className={s.arrowContainer} onClick={openSidebar}>
          <img src={arrow} alt="arrow" />
        </div>
        <div>
          Marks
        </div>
      </div>
      <div className={s.swiperContainer}>
        Swiper
      </div>
    </div>
  );
};

export default Sidebar;
