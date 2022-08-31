import React, { useEffect, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

import s from './style.module.scss';

import { ReactComponent as OpenEye } from '../../../assests/marks.svg';
import { ReactComponent as ClosedEye } from '../../../assests/closedEye.svg';
import { ReactComponent as Arrow } from '../../../assests/arrow.svg';

const Login = ({
  setIsLogIn, setUserProfileData, getUserToken, getError,
}) => {
  const [userLogin, setUserLogin] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [userSurName, setUserSurName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [passwordIsShowing, setPasswordIsShowing] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [isSignIn, setIsSignIn] = useState(false);
  const refIsLogInModal = useRef(null);
  useClickAway(refIsLogInModal, () => {
    setIsLogIn(false);
  });
  const openSignInModal = () => {
    setIsSignIn(true);
    setUserToken('');
  };
  useEffect(() => {
    localStorage.setItem('token', userToken);
    if (userToken) {
      const getUser = new Headers();
      getUser.append(
        'Authorization',
        `Bearer ${userToken}`,
      );

      const requestOptionsGetUser = {
        method: 'GET',
        headers: getUser,
        redirect: 'follow',
      };

      fetch('https://evening-basin-02735.herokuapp.com/api/v1/users', requestOptionsGetUser)
        .then(response => response.json())
        .then((result) => {
          setUserProfileData(result.data);
          if (result.error) {
            setIsLogIn(true);
          } else {
            setIsLogIn(false);
          }
        })
        .catch(error => console.log('error', error));
    }

    if (userToken) {
      getUserToken(userToken);
    }
  }, [userToken]);

  const logIn = () => {
    setPasswordIsShowing(false);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      login: `${userLogin}`,
      password: `${userPassword}`,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch('https://evening-basin-02735.herokuapp.com/api/v1/log-in', requestOptions)
      .then(response => response.json())
      .then((result) => {
        if (result.error) {
          getError(result.data.message);
          setTimeout(() => {
            getError('');
          }, 2950);
        } else {
          setUserToken(result.token);
        }
      })
      .catch(error => console.log('error', error));
  };

  const signIn = () => {
    setPasswordIsShowing(false);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      name: userName,
      surname: userSurName,
      login: userLogin,
      password: userPassword,
      email: userEmail,
      avatar: `https://robohash.org/${Math.floor(Math.random() * 1000000) + 1}`,
      watchListId: Math.floor(Math.random() * 1000000) + 1,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://evening-basin-02735.herokuapp.com/api/v1/sign-in', requestOptions)
      .then(response => response.json())
      .then((result) => {
        if (result.error) {
          getError(result.data.message);
          setTimeout(() => {
            getError('');
          }, 2950);
        } else {
          setUserToken(result.token);
        }
        if (!result.error) {
          setIsSignIn(false);
        }
      })
      .catch(error => console.log('error', error));
  };

  return (
    <div className={s.mainContainer}>
      {!isSignIn ? (
        <div className={s.authorisationContainer} ref={refIsLogInModal}>
          <div className={s.authorisation}>
            <span>Авторизація</span>
          </div>
          <div className={s.inputsBlock}>
            <div className={s.login}>
              <span>Логін</span>
              <input type="name" onChange={e => setUserLogin(e.target.value)} />
            </div>
            <div className={s.password}>
              <span>Пароль</span>
              <input type={passwordIsShowing ? 'name' : 'password'} onChange={e => setUserPassword(e.target.value)} />
              {passwordIsShowing
                ? (
                  <div className={s.eyeContainer}>
                    <OpenEye
                      className={s.eye}
                      onClick={() => setPasswordIsShowing(false)}
                    />
                  </div>
                )
                : (
                  <div className={s.eyeContainer}>
                    <ClosedEye
                      className={s.eye}
                      onClick={() => setPasswordIsShowing(true)}
                    />
                  </div>
                ) }
            </div>
            <div className={s.buttonsContainer}>
              <button type="submit" onClick={logIn}>Увійти</button>
              <button type="button" onClick={openSignInModal}>Зареєструватись</button>
            </div>
          </div>
        </div>
      ) : (
        <div className={s.authorisationContainer} ref={refIsLogInModal}>
          <div className={s.authorisation}>
            <Arrow
              className={s.backArrow}
              onClick={() => setIsSignIn(false)}
            />
            <span>Реєстрація</span>
          </div>
          <div className={s.inputsBlock}>
            <div className={s.login}>
              <span>Ім&apos;я</span>
              <input type="name" onChange={e => setUserName(e.target.value)} />
            </div>
            <div className={s.password}>
              <span>Прізвище</span>
              <input type="name" onChange={e => setUserSurName(e.target.value)} />
            </div>
            <div className={s.password}>
              <span>Логін</span>
              <input type="name" onChange={e => setUserLogin(e.target.value)} />
            </div>
            <div className={s.password}>
              <span>Пароль</span>
              <input type={passwordIsShowing ? 'name' : 'password'} onChange={e => setUserPassword(e.target.value)} />
              {passwordIsShowing
                ? (
                  <div className={s.eyeContainer}>
                    <OpenEye
                      className={s.eye}
                      onClick={() => setPasswordIsShowing(false)}
                    />
                  </div>
                )
                : (
                  <div className={s.eyeContainer}>
                    <ClosedEye
                      className={s.eye}
                      onClick={() => setPasswordIsShowing(true)}
                    />
                  </div>
                ) }
            </div>
            <div className={s.password}>
              <span>Пошта</span>
              <input type="name" onChange={e => setUserEmail(e.target.value)} />
            </div>
            <div className={s.buttonsContainerSignIn}>
              <button type="button" onClick={signIn}>Зареєструватись</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
