import React from 'react';

import s from './style.module.scss';

const Error = ({ error }) => (
  <div className={s.main}>
    <div className={s.string} />
    <div className={s.descriptionContainer}>
      <div className={s.error}>
        <span>error</span>
      </div>
      <div className={s.description}>
        <span>{error}</span>
      </div>
    </div>
  </div>
);

export default Error;
