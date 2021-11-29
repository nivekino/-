import React, { useEffect, useState, useContext } from 'react';
import CardFeeds from '../ui/CardFeeds';
import { AuthContext } from '../../auth/AuthContext';

const FeedScreen = () => {
  const [feeds, setFeeds] = useState([]);
  const [page, setPage] = useState(0);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(
      `https://posts-pw2021.herokuapp.com/api/v1/post/all?limit=10&page=${page}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        let response = data.data;
        setFeeds((feeds) => feeds.concat(response));
      });
  }, [page]);

  const handleFeedClick = () => {
    setPage(page + 1);
  };

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

      <button
        className="w-auto py-2 px-2 mb-8 font-medium text-blue-400 bg-white border-2 border-blue-400 rounded hover:bg-blue-400 hover:text-white"
        onClick={handleFeedClick}
      >
        Cargar mas publicaciones
      </button>
    </div>
  );
};

export default FeedScreen;
