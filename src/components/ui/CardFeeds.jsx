import React, { useContext, useState } from 'react';
import useForm from '../../hooks/useForm';
import { AuthContext } from '../../auth/AuthContext';

const CardFeeds = ({
  title,
  username,
  likesCount,
  description,
  image,
  comentariosArray,
  id,
}) => {
  const { user } = useContext(AuthContext);
  const [likes, setLikes] = useState(likesCount);
  const [comentarioUser, setComentarioUser] = useState(comentariosArray);
  const [{ comentario }, handleInputChange, reset] = useForm({
    comentario: '',
  });

  const handleClickLike = () => {
    fetch(`https://posts-pw2021.herokuapp.com/api/v1/post/like/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        setLikes(likes + 1);
      });
  };

  const handleClickFavourite = () => {
    fetch(`https://posts-pw2021.herokuapp.com/api/v1/post/fav/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
      });
  };

  const handleClickComment = () => {
    const obj = {
      description: comentario,
    };
    const liveComment = {
      description: comentario,
      user: {
        username: user.name,
      },
    };
    fetch(`https://posts-pw2021.herokuapp.com/api/v1/post/comment/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          alert(data.errors);
        } else {
          alert(data.message);
          setComentarioUser((comentarioUser) =>
            comentarioUser.concat(liveComment)
          );

          reset();
        }
      });
  };

  return (
    <div className="w-full p-4 md:w-10/12 lg:w-6/12">
      <div className="h-full overflow-hidden rounded-lg shadow-md">
        <img
          src={image}
          alt="imagen no fue encontrada"
          className="object-cover object-center w-full h-72"
        />
        <div className="px-6 pt-6 transition duration-300 ease-in">
          <h2 className="mb-1 text-base font-medium text-black-300">
            {title} - {username}
          </h2>
          <p className="mb-3 leading-relaxed">{description}</p>
        </div>
        <div className="flex flex-row items-center justify-between px-6 pb-4">
          <button
            onClick={handleClickLike}
            className="px-4 py-2 font-medium text-red-400 bg-white border-2 border-red-400 rounded hover:bg-red-400 hover:text-white"
          >
            Like {likes}
          </button>
          <button
            onClick={handleClickFavourite}
            className="px-4 py-2 font-medium text-blue-400 bg-white border-2 border-blue-400 rounded hover:bg-blue-400 hover:text-white"
          >
            Favoritos
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-auto px-3 py-3 mt-3 rounded shadow-md">
        <div className="flex flex-row items-center justify-center w-full">
          <input
            type="text"
            placeholder="Comentar"
            name="comentario"
            value={comentario}
            onChange={handleInputChange}
            className="w-10/12 px-3 bg-gray-100 rounded h-11 text-medium text-grey-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent "
          />
          <button
            onClick={handleClickComment}
            className="text-xl text-white bg-blue-600 rounded-full h-11 w-11"
          >
            &rarr;
          </button>
        </div>
        <div className="flex flex-col items-center justify-center w-full px-3 mt-8">
          {comentarioUser.map((comentario, index) => (
            <div
              className="flex flex-col items-center justify-center w-full h-auto p-3 mb-5 bg-gray-100 rounded"
              key={index}
            >
              <p className="text-base font-normal text-gray-800 ">
                {comentario.description}
              </p>
              <p className="self-end mt-1 text-sm italic font-normal text-gray-800">
                {comentario.user.username}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardFeeds;
