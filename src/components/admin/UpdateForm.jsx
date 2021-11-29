import React, { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import useForm from '../../hooks/useForm';
import { Redirect } from 'react-router-dom';

const UpdateForm = ({ descripcion, titulo, imagen, postId }) => {
  const { user } = useContext(AuthContext);
  const [{ postTitle, description, imageUrl }, handleInputChange, reset] =
    useForm({
      postTitle: descripcion,
      description: titulo,
      imageUrl: imagen,
    });

  const enviarForm = (e) => {
    e.preventDefault();

    if (postTitle === '' && description === '' && imageUrl === '') {
      alert('Ningun campo puede quedar vacio');
      return false;
    }

    const obj = {
      title: postTitle,
      description: description,
      image: imageUrl,
    };

    fetch(`https://posts-pw2021.herokuapp.com/api/v1/post/update/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        window.location = '/admin/lista';
      });
  };
  return (
    <div className="flex flex-col items-center justify-center h-auto px-5 py-8 bg-gray-100 rounded-lg shadow-lg w-12/12">
      <h2 className="mb-5 text-4xl font-medium text-blue-600">update post</h2>
      <form onSubmit={enviarForm}>
        <input
          className="w-11/12 h-10 px-2 mb-8 font-medium text-gray-900 border-gray-300 rounded lg:mb-5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          type="text"
          placeholder={titulo}
          name="postTitle"
          value={postTitle}
          onChange={handleInputChange}
        />

        <input
          className="w-11/12 h-10 px-2 mb-8 font-medium text-gray-900 border-gray-300 rounded lg:mb-5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          type="text"
          placeholder={descripcion}
          name="description"
          value={description}
          onChange={handleInputChange}
        />

        <input
          className="w-11/12 h-10 px-2 mb-8 font-medium text-gray-900 border-gray-300 rounded lg:mb-5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          type="text"
          placeholder="Image Url"
          name="imageUrl"
          value={imageUrl}
          onChange={handleInputChange}
        />

        <p className="w-11/12 mb-8 text-lg font-medium text-gray-800 lg:mb-5">
          Imagen anterior
        </p>
        <img
          className="object-cover w-40 h-40 mb-8 rounded-full"
          src={imagen}
          alt=""
        />
        <p className="w-11/12 mb-8 text-lg font-medium text-gray-800 lg:mb-5">
          Imagen preview
        </p>
        <img
          className="object-cover w-40 h-40 mb-8 rounded-full"
          src={imageUrl}
          alt=""
        />

        <button
          type="submit"
          className="w-11/12 font-semibold text-white bg-blue-600 h-11 rounded-md focus:outline-none focus:ring-2 hover:bg-blue-500"
        >
          Update post
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
