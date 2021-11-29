import React, { useEffect, useState, useContext } from 'react';
import CardFeeds from '../ui/CardFeeds';
import { AuthContext } from '../../auth/AuthContext';

const FavoritosScreen = () => {
  const [feeds, setFeeds] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`https://posts-pw2021.herokuapp.com/api/v1/post/fav`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.favorites.map((item) => {
          fetch(`https://posts-pw2021.herokuapp.com/api/v1/post/one/${item}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              let response = data;
              setFeeds((feeds) => feeds.concat(response));
            });
        });
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {feeds.map((feed) => (
        <CardFeeds
          title={feed.title}
          description={feed.description}
          likesCount={feed.likes.length}
          username={feed.user.username}
          image={feed.image}
          id={feed._id}
          comentariosArray={feed.comments}
          key={feed._id}
        />
      ))}
    </div>
  );
};

export default FavoritosScreen;
