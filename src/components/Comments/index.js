import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

import s from './style.module.scss';

import { ReactComponent as Like } from '../../assests/like.svg';

const Comments = ({ movieID, userData }) => {
  const [commentsList, setCommentsList] = useState([]);
  const [commentValue, setCommentValue] = useState('');

  const token = localStorage.getItem('token');

  const getMovieComments = () => {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'GET',
      headers,
      redirect: 'follow',
    };

    fetch(`https://id-look-server.herokuapp.com/api/v1/comments?movie_id=${movieID}&limit=10&offset=0`, requestOptions)
      .then(response => response.json())
      .then(result => setCommentsList(result.data))
      .catch(error => console.log('error', error));
  };

  const clearComment = () => {
    setCommentValue('');
  };

  const sendComment = () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        movieId: movieID,
        parentId: null,
        content: commentValue,
      }),
      redirect: 'follow',
    };

    fetch('https://id-look-server.herokuapp.com/api/v1/comments', requestOptions)
      .then(response => response.json())
      .then((result) => {
        setCommentsList([{
          id: result.data.id,
          userName: userData.name,
          userSurname: userData.surname,
          userAvatar: userData.avatar,
          movieId: movieID,
          parentId: null,
          content: commentValue,
          likes: 0,
        },
        ...commentsList,
        ]);
      })
      .catch(error => console.log('error', error));

    setCommentValue('');
  };

  useEffect(() => {
    getMovieComments();
  }, []);

  const likeComment = (commentId) => {
    setCommentsList(
      commentsList.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, alreadyLiked: true, likes: comment.likes + 1 };
        }
        return { ...comment };
      }),
    );
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
    };

    fetch(`https://id-look-server.herokuapp.com/api/v1/comments/${commentId}/like`, requestOptions)
      .catch(() => {
        setCommentsList([...commentsList]);
      });
  };
  // handleLikeCOMMENT
  const unlikeComment = (commentId) => {
    setCommentsList(
      commentsList.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, alreadyLiked: false, likes: comment.likes - 1 };
        }
        return { ...comment };
      }),
    );
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
    };

    fetch(`https://id-look-server.herokuapp.com/api/v1/comments/${commentId}/unlike`, requestOptions)
      .catch(() => {
        setCommentsList([...commentsList]);
      });
  };
  return (
    <div className={s.main}>
      <div
        className={s.inputContainer}
      >
        <TextareaAutosize
          value={commentValue}
          className={s.input}
          onChange={e => setCommentValue(e.target.value)}
          placeholder="Додати коментар..."
        />
        {commentValue && (
          <div className={s.buttonsContainer}>
            <span
              role="presentation"
              onClick={clearComment}
              className={s.cancelButton}
            >
              Скасувати
            </span>
            <span
              className={s.submitButton}
              role="presentation"
              onClick={sendComment}
            >
              Коментувати
            </span>
          </div>
        )}
      </div>
      <div
        className={s.commentsContainer}
      >
        {commentsList.length ? (
          commentsList.map(userComment => (
            <div
              key={userComment.id}
              className={s.userContainer}
            >
              <div className={s.userAvatar}>
                <img
                  src={userComment.userAvatar}
                  alt="userAvatar"
                />
              </div>
              <div className={s.userInfo}>
                <div className={s.userHeader}>
                  <Link
                    to={`/user/${userComment.userId}`}
                  >
                    <span>
                      {`${userComment.userName} ${userComment.userSurname}`}
                    </span>
                  </Link>
                </div>
                <div className={s.userComment}>
                  {userComment.content}
                </div>
                <div className={s.footerComment}>
                  <span
                    className={s.answer}
                  >
                    Відповісти
                  </span>
                  <Like
                    role="presentation"
                    className={`${userComment.alreadyLiked ? s.liked : s.unliked}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('click');
                      (userComment.alreadyLiked ? unlikeComment : likeComment)(userComment.id);
                    }}
                  />
                  <span>{`(${userComment.likes})`}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>Коментарі відсутні</h1>
        )}
      </div>
    </div>
  );
};
export default Comments;
