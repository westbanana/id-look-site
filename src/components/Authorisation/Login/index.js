import React, { useEffect, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

import s from './style.module.scss';

import { ReactComponent as OpenEye } from '../../../assests/marks.svg';
import { ReactComponent as ClosedEye } from '../../../assests/closedEye.svg';
import { ReactComponent as Arrow } from '../../../assests/arrow.svg';
import { ReactComponent as Close } from '../../../assests/remove.svg';

const Login = ({
  setIsLogIn, setUserProfileData, getUserToken, getError,
}) => {
  const [userLogin, setUserLogin] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [userSurName, setUserSurName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userList, setUserList] = useState(0);
  const [passwordIsShowing, setPasswordIsShowing] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [isSignIn, setIsSignIn] = useState(false);
  const refIsLogInModal = useRef(null);
  useClickAway(refIsLogInModal, () => {
    setIsLogIn(false);
  });

  const createList = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json;charset=utf-8');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        name: 'Тест.',
        description: 'Тест.',
        language: 'uk',
      }),
      redirect: 'follow',
    };

    fetch('https://api.themoviedb.org/3/list?api_key=0575eac7d0a89edcf83d5418ad2aebed&session_id=9577a8eeacee9f458229ff5af1c5b31b2c2dd44f', requestOptions)
      .then(response => response.json())
      .then(result => setUserList(result.list_id))
      .catch(error => console.log('error', error));
  };

  const openSignInModal = () => {
    setIsSignIn(true);
    setUserToken('');
    createList();
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

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        login: `${userLogin}`,
        password: `${userPassword}`,
      }),
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
    localStorage.setItem('userList', userList);
    setPasswordIsShowing(false);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        name: userName,
        surname: userSurName,
        login: userLogin,
        password: userPassword,
        email: userEmail,
        avatar: `https://robohash.org/${Math.floor(Math.random() * 1000000) + 1}`,
        watchListId: userList,
      }),
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
            <Close
              className={s.closeModalIcon}
              onClick={() => setIsLogIn(false)}
            />
            <span className={s.modalName}>Авторизація</span>
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
            <Close
              className={s.closeModalIcon}
              onClick={() => setIsLogIn(false)}
            />
            <span className={s.modalName}>Реєстрація</span>
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
