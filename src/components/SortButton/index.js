import React from 'react';

import s from './style.module.scss';

const SortButton = ({ arr, setSelectedSort }) => (
  <div className={s.sortList}>
    {arr.map(element => (
      <input
        readOnly
        className={s.sortTitle}
        value={element}
        onClick={e => setSelectedSort(e.target.value)}
      />
    ))}
  </div>
);

export default SortButton;
