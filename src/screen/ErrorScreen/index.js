import React from 'react';

import s from './style.module.scss';

const ErrorScreen = () => {
  console.log(1);
  return (
    <div className={s.mainContainer}>
      <div className={s.eyesContainer}>
        <div className={s.eye}>
          <div className={s.highlight} />
        </div>
        <div className={s.eye}>
          <div className={s.highlight} />
        </div>
      </div>
      <div className={s.noseContainer}>
        <div className={s.nose}>
          <div className={s.nostril} />
          <div className={s.nostril} />
        </div>
      </div>
      <span className={s.error}>ERROR</span>
    </div>
  );
};

export default ErrorScreen;
