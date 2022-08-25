// import React, { useEffect, useState } from 'react';
import React, { useState } from 'react';

import s from './style.module.scss';

import { ReactComponent as Spinner } from '../../assests/spinner.svg';

const Profile = ({ userData, userToken, setUserData }) => {
  // const [dataUser, setDataUser] = useState(userData);
  const [userName, setUserName] = useState(userData.name);
  const [userSurname, setUserSurname] = useState(userData.surname);
  const [userEmail, setUserEmail] = useState(userData.email);
  const [imageId, setImageId] = useState('');
  // const makeId = (length) => {
  //   let result = '';
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   const charactersLength = characters.length;
  //   // eslint-disable-next-line no-plusplus
  //   for (let i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random()
  //       * charactersLength));
  //   }
  //   return result;
  // };
  //
  // useEffect(() => {
  //   setImageId(
  //     makeId(100),
  //   );
  // }, []);
  //
  // const swapImage = () => {
  //   setImageId(
  //     makeId(100),
  //   );

  console.log(userData);

  const updateUser = () => {
    setUserData({
      name: userName,
      surname: userSurname,
      email: userEmail,
      avatar: `https://robohash.org/${imageId}`,
    });

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${userToken}`);
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      name: userName,
      surname: userSurname,
      email: userEmail,
      avatar: `https://robohash.org/${imageId}`,
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

  console.log(Math.floor(Math.random() * 1000000) + 1);

  return (
    <div className={s.mainContainer}>
      <div>
        <div className={s.userInfo}>
          <div className={s.avatarContainer}>
            <div className={s.swapImageContainer}>
              <Spinner
                className={s.spinnerIcon}
                onClick={() => {
                  setImageId(Math.floor(Math.random() * 1000000) + 1);
                  updateUser();
                }}
              />
              { /* <Spinner className={s.spinnerIcon} /> */ }
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
            onClick={() => {
              updateUser();
            }}
          >
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
