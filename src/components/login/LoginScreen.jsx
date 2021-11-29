import React, { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';
import useForm from '../../hooks/useForm';

const LoginScreen = ({ history }) => {
  const { dispatch } = useContext(AuthContext);

  const [{ user, password }, handleInputChange] = useForm({
    user: '',
    password: '',
  });

  const handleLogin = (e) => {
    e.preventDefault();
    let lastPath = '/';
    const obj = {
      username: user,
      password: password,
    };

    fetch('https://posts-pw2021.herokuapp.com/api/v1/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          const { token, role } = data;

          dispatch({
            type: types.login,
            payload: {
              name: user,
              role: role,
              token: token,
            },
          });

          if (role == 'user') {
            lastPath = '/user/feed';
          history.replace(lastPath);
          } else {
            lastPath = '/admin/lista';
          history.replace(lastPath);
          }
        }
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
        <div class="hidden lg:block lg:w-1/2 bg-cover">
          <img
            src="https://i.pinimg.com/736x/37/74/de/3774de4b49da7084f6a4b56b87edf4fa.jpg"
            alt="splash"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-center text-gray-700">
            POSTS
          </h2>
          <p className="text-xl text-center text-gray-600">
            Bienvenido de nuevo {user}!
          </p>
          <p className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"></p>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b lg:w-1/4"></span>
            <p className="text-xs text-center text-gray-500 uppercase">
              ingresar con tu cuenta
            </p>
            <span className="w-1/5 border-b lg:w-1/4"></span>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Usuario
              </label>
              <input
                type="text"
                placeholder="Ingresa tu correo"
                name="user"
                value={user}
                onChange={handleInputChange}
                class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Contraseña
                </label>
              </div>
              <input
                type="password"
                placeholder=" Ingresa tu contraseña"
                name="password"
                value={password}
                onChange={handleInputChange}
                class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              />
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="w-full px-4 py-2 font-bold text-white bg-gray-700 rounded hover:bg-gray-600"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b md:w-1/4"></span>
            <span className="w-1/5 border-b md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
