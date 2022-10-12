// import React, { useEffect, useState } from 'react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import s from './style.module.scss';

import { ReactComponent as Spinner } from '../../assests/spinner.svg';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [userName, setUserName] = useState(userData.name);
  const [userSurname, setUserSurname] = useState(userData.surname);
  const [userEmail, setUserEmail] = useState(userData.email);
  const [userAvatar, setUserAvatar] = useState(userData.avatar);
  const getUser = () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('https://id-look-server.herokuapp.com/api/v1/users', requestOptions)
      .then(response => response.json())
      .then((result) => {
        setUserData(result.data);
        setUserAvatar(result.data.avatar);
      })
      .catch(error => console.log('error', error));
  };
  useEffect(() => {
    getUser();
  }, []);
  const updateUser = () => {
    setUserData({
      name: userName || userData.name,
      surname: userSurname || userData.surname,
      email: userEmail || userData.email,
      avatar: userAvatar,
    });

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      name: userName || userData.name,
      surname: userSurname || userData.surname,
      email: userEmail || userData.email,
      avatar: userAvatar,
    });

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://id-look-server.herokuapp.com/api/v1/users', requestOptions)
      .then(response => response.json())
      .then(result => setUserData(result.data))
      .catch(error => console.log('error', error));
  };
  return (
    <div className={s.mainContainer}>
      {localStorage.getItem('token') ? (
        <div className={s.userInfoContainer}>
          <div className={s.userInfo}>
            <div className={s.avatarContainer}>
              <div className={s.swapImageContainer}>
                <Spinner
                  className={s.spinnerIcon}
                  onClick={
                    () => setUserAvatar(`https://robohash.org/${Math.floor(Math.random() * 1000000) + 1}`)
                  }
                />
              </div>
              {userData ? <img alt="avatar" src={userAvatar} /> : (
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
            <Link
              to="/"
              className={`${s.submitButton} ${s.logOut}`}
            >
              <button
                type="button"
                className={s.logoutButton}
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('profileId');
                  localStorage.removeItem('userList');
                  setUserData({});
                }}
              >
                Вийти
              </button>
            </Link>
          </div>
        </div>
      ) : ''}
    </div>
  );
};

export default Profile;
