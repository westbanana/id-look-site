// import React, { useEffect, useState } from 'react';
import React, { useState } from 'react';

import s from './style.module.scss';

import { ReactComponent as Spinner } from '../../assests/spinner.svg';
import { ReactComponent as ProfileIcon } from '../../assests/profile.svg';
import Login from '../../components/Authorisation/Login';

const Profile = ({
  userData, userToken, setUserData, getUserToken,
}) => {
  const [userName, setUserName] = useState(userData.name);
  const [userSurname, setUserSurname] = useState(userData.surname);
  const [userEmail, setUserEmail] = useState(userData.email);
  const [userAvatar, setUserAvatar] = useState(userData.avatar);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const updateUser = () => {
    setUserData({
      name: userName || userData.name,
      surname: userSurname || userData.surname,
      email: userEmail || userData.email,
      avatar: `https://robohash.org/${userAvatar}`,
    });

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${userToken}`);
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      name: userName || userData.name,
      surname: userSurname || userData.surname,
      email: userEmail || userData.email,
      avatar: `https://robohash.org/${userAvatar}`,
    });

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://evening-basin-02735.herokuapp.com/api/v1/users', requestOptions)
      .then(response => response.json())
      .then(result => setUserData(result.data))
      .catch(error => console.log('error', error));
  };

  const swapImage = () => {
    setUserAvatar(Math.floor(Math.random() * 1000000) + 1);
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${userToken}`);
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      avatar: `https://robohash.org/${userAvatar}`,
    });

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://evening-basin-02735.herokuapp.com/api/v1/users', requestOptions)
      .then(response => response.json())
      .then(result => setUserData(result.data))
      .catch(error => console.log('error', error));
  };
  return (
    <div className={s.mainContainer}>
      {userData.name !== undefined ? (
        <div className={s.userInfoContainer}>
          <div className={s.userInfo}>
            <div className={s.avatarContainer}>
              <div className={s.swapImageContainer}>
                <Spinner
                  className={s.spinnerIcon}
                  onClick={swapImage}
                />
              </div>
              {userData ? <img alt="avatar" src={userData.avatar} /> : (
                <span>
                  {userData.name[0]}
                  {' '}
                  {userData.surname[0]}
                </span>
              )}
            </div>
            <div className={s.userName}>
              <span>{`${userData.name} ${userData.surname}`}</span>
            </div>
          </div>
          <div className={s.inputsContainer}>
            <div className={`${s.inputContainer} ${s.first}`}>
              <span>Ім&apos;я</span>
              <input
                placeholder={userData.name}
                onChange={e => setUserName(e.target.value)}
              />
            </div>
            <div className={`${s.inputContainer} ${s.second}`}>
              <span>Прізвище</span>
              <input placeholder={userData.surname} onChange={e => setUserSurname(e.target.value)} />
            </div>
            <div className={`${s.inputContainer} ${s.third}`}>
              <span>Пошта</span>
              <input placeholder={userData.email} onChange={e => setUserEmail(e.target.value)} />
            </div>
            <button
              type="button"
              className={s.submitButton}
              onClick={updateUser}
            >
              Зберегти
            </button>
            <button
              type="button"
              className={s.submitButton}
              onClick={() => {
                localStorage.removeItem('token');
                setUserData({});
              }}
            >
              Вийти
            </button>
          </div>
        </div>
      ) : (
        <div>
          {isModalOpen
            ? (
              <Login
                setIsLogIn={setIsModalOpen}
                setUserProfileData={setUserData}
                getUserToken={getUserToken}
              />
            )
            : (
              <div className={s.authorization}>
                <ProfileIcon className={s.profileIcon} />
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className={s.loginButton}
                >
                  увійти
                </button>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default Profile;
