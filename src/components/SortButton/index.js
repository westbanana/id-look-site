import React from 'react';

import s from './style.module.scss';

const SortButton = ({ arr }) => (
  <div className={s.sortList}>
    {arr.map(e => <span className={s.sortTitle}>{e}</span>)}
  </div>
);
export default SortButton;
