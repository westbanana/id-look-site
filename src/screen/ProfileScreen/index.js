import React, { useEffect, useState } from 'react';

import { ReactComponent as Spinner } from '../../assests/spinner.svg';

import s from './style.module.scss';

const Profile = () => {
  const [imageId, setImageId] = useState('');
  const testUser = {
    firstName: 'Alexandr',
    secondName: 'Foo',
    email: 'westbanana4@gmail.com',
    image: `https://robohash.org/${imageId}`,
  };

  const makeId = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random()
        * charactersLength));
    }
    return result;
  };

  useEffect(() => {
    setImageId(
      makeId(100),
    );
  }, []);

  const swapImage = () => {
    setImageId(
      makeId(100),
    );
  };

  return (
    <div className={s.mainContainer}>
      <div className={s.userInfo}>
        <div className={s.avatarContainer}>
          <div className={s.swapImageContainer}>
            <Spinner className={s.spinnerIcon} onClick={swapImage} />
          </div>
          {testUser.image ? <img alt="avatar" src={`${testUser.image}`} /> : (
            <span>
              {testUser.firstName[0]}
              {' '}
              {testUser.secondName[0]}
            </span>
          )}
        </div>
        <div className={s.userName}>
          <span>{`${testUser.firstName} ${testUser.secondName}`}</span>
        </div>
      </div>
      <div className={s.inputsContainer}>
        <div className={s.inputContainer}>
          <span>Ім&apos;я</span>
          <input placeholder={testUser.firstName} />
        </div>
        <div className={s.inputContainer}>
          <span>Прізвище</span>
          <input placeholder={testUser.secondName} />
        </div>
        <div className={s.inputContainer}>
          <span>Пошта</span>
          <input placeholder={testUser.email} />
        </div>
        <button type="button" className={s.submitButton}>
          Зберегти
        </button>
      </div>
    </div>
  );
};

export default Profile;
