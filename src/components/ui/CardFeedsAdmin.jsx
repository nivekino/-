import React, { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';

const CardFeedsAdmin = ({
  title,
  username,
  likesCount,
  description,
  image,
  id,
}) => {
  const { user } = useContext(AuthContext);

  const handleClickUpdate = () => {
    window.location = '/admin/update/' + id;
  };

  const handleClickHide = () => {
    fetch(`https://posts-pw2021.herokuapp.com/api/v1/post/toggle/${id}`, {
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

  return (
    <div className="w-full p-4 md:w-10/12 lg:w-6/12">
      <div className="h-full overflow-hidden rounded-lg shadow-md">
        <img
          src={image}
          alt="post-image"
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
            onClick={handleClickUpdate}
            className="px-4 py-2 font-medium text-gray-400 bg-white border-2 border-gray-400 rounded hover:bg-gray-400 hover:text-white"
          >
            Update
          </button>
          <button
            onClick={handleClickHide}
            className="px-4 py-2 font-medium text-gray-400 bg-white border-2 border-gray-400 rounded hover:bg-gray-400 hover:text-white"
          >
            Hide Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardFeedsAdmin;
