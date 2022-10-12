import React from 'react';

import s from './style.module.scss';

const Error = ({ message }) => {
  if (message) {
    return (
      <div className={s.main}>
        <div className={s.string} />
        <div className={s.descriptionContainer}>
          <div className={s.error}>
            <span>error</span>
          </div>
          <div className={s.description}>
            <span>{message}</span>
          </div>
        </div>
      </div>
    );
  }
  return ('');
};

export default Error;
