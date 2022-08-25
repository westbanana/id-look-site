import React from 'react';

import s from './style.module.scss';

import { ReactComponent as SpinnerIco } from '../../assests/spinner.svg';

const Spinner = () => (
  <div className={s.spinnerContainer}>
    <SpinnerIco className={s.spinner} />
  </div>
);

export default Spinner;
