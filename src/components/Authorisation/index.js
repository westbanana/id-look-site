import React, { useRef } from 'react';
import { useClickAway } from 'react-use';

import s from './style.module.scss';

const Authorisation = ({ setIsLogIn }) => {
  const refIsLogInModal = useRef(null);
  useClickAway(refIsLogInModal, () => {
    setIsLogIn(false);
  });

  return (
    <div className={s.mainContainer}>
      <div className={s.authorisationContainer} ref={refIsLogInModal}>
        <div className={s.authorisation}>
          <span>Авторизація</span>
        </div>
        <div className={s.inputsBlock}>
          <div className={s.login}>
            <span>Логін</span>
            <input type="name" />
          </div>
          <div className={s.password}>
            <span>Пароль</span>
            <input type="password" />
          </div>
          <div className={s.buttonsContainer}>
            <button type="submit">Увійти</button>
            <button type="button">Зареєструватись</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authorisation;
