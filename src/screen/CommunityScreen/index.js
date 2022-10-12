import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import s from './style.module.scss';

import SearchInput from '../../components/SearchInput';
import { ReactComponent as RemoveIcon } from '../../assests/remove.svg';
import { ReactComponent as ArrowIcon } from '../../assests/arrow.svg';

const CommunityScreen = () => {
  const [topUsersList, setTopUsersList] = useState([]);
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const topUsersLink = 'https://id-look-server.herokuapp.com/api/v1/users/top?offset=0&limit=10';
  const searchLink = value => `https://id-look-server.herokuapp.com/api/v1/users/search?template=${value}`;
  const userSubscriptionLink = 'https://id-look-server.herokuapp.com/api/v1/users/subscriptions';
  const getUserList = (link, cb) => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${link}`, requestOptions)
      .then(response => response.json())
      .then(result => cb(result.data))
      .catch(error => console.log('error', error));
  };

  const unsubscribe = (userId) => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };

    const changedList = userSubscriptions.filter(user => user.id !== userId);
    setUserSubscriptions(changedList);

    fetch(`https://id-look-server.herokuapp.com/api/v1/users/subscriptions/${userId}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  const subscribe = (userId, userData) => {
    setUserSubscriptions(list => [...list, userData]);
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`https://id-look-server.herokuapp.com/api/v1/users/subscriptions/${userId}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    getUserList(topUsersLink, setTopUsersList);
    getUserList(userSubscriptionLink, setUserSubscriptions);
  }, []);
  return (
    <div className={s.main}>
      <SearchInput
        itemsType="users"
        query={(setFoundItems, inputValue) => {
          getUserList(searchLink(inputValue), setFoundItems);
        }}
      />
      <div className={s.usersContainer}>
        <h1>{`Підписки: ${userSubscriptions?.length}`}</h1>
        {userSubscriptions ? (
          <div
            className={s.usersList}
          >
            {userSubscriptions.map(user => (
              <div
                className={s.userContainer}
                key={user.id}
              >
                <div
                  id={user.id}
                  role="presentation"
                  className={s.userAvatar}
                >
                  <img
                    className={s.modalUsersImage}
                    alt="moviePoster"
                    src={user.avatar}
                  />
                </div>
                <div className={s.userInfo}>
                  <span className={s.name}>
                    {`${user.name} ${user.surname}`}
                  </span>
                  <span
                    className={s.login}
                  >
                    {`@${user.login}`}
                  </span>
                </div>
                <RemoveIcon
                  onClick={() => unsubscribe(user.id)}
                  className={s.removeIcon}
                />
                <Link
                  to={`${localStorage.getItem('id') === user.id ? '/' : `/user/${user.id}`}`}
                >
                  <ArrowIcon
                    className={s.arrowIcon}
                  />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <span>Відсутні</span>
        )}
      </div>
      <div className={s.usersContainer}>
        <h1>Топ 10</h1>
        <div
          className={s.usersList}
        >
          {topUsersList.map(user => (
            <div
              className={s.userContainer}
              key={user.id}
            >
              <div
                id={user.id}
                role="presentation"
                className={s.userAvatar}
              >
                <img
                  className={s.modalUsersImage}
                  alt="moviePoster"
                  src={user.avatar}
                />
              </div>
              <div className={s.userInfo}>
                <span className={s.name}>
                  {`${user.name} ${user.surname}`}
                </span>
                <span
                  className={s.subscribersCount}
                >
                  {`Підписників: ${user.subscribersCount}`}
                </span>
                <span
                  className={s.login}
                >
                  {`@${user.login} ${user.id}`}
                </span>
              </div>
              {userSubscriptions.find(element => element.id === user.id) ? (
                <RemoveIcon
                  onClick={() => unsubscribe(user.id)}
                  className={s.removeIcon}
                />
              ) : (
                <RemoveIcon
                  onClick={() => {
                    subscribe(user.id, user);
                  }}
                  className={s.addIcon}
                />
              )}
              <Link
                to={`${localStorage.getItem('id') === user.id ? '/' : `/user/${user.id}`}`}
              >
                <ArrowIcon
                  className={s.arrowIcon}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityScreen;
