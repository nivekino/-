import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const Navbar = () => {
  const {
    user: { name },
    dispatch,
  } = useContext(AuthContext);
    const history = useHistory()

  const handleLogout = () => {

      localStorage.removeItem('lastPath');
    dispatch({
      type: types.logout,
      payload: {
        name: null,
      },
    });

    history.replace('/')
  };

  return (
    <nav className="flex flex-row items-center justify-around w-full h-16 px-4 bg-gray-50">
      <NavLink
        activeClassName="text-blue-600 font-semibold"
        className="text-base font-normal text-black"
        exact
        to="/user/favoritos"
      >
       Favoritos 
      </NavLink>

      <NavLink
        activeClassName="text-blue-600 font-semibold"
        className="text-base font-normal text-black"
        exact
        to="/user/feed"
      >
       Feed 
      </NavLink>

      <p className="text-base font-normal text-blue-600 font-name">{name}</p>
      <button
        type="button"
        className="px-6 py-3 font-semibold text-white bg-blue-600 rounded-md focus:outline-black"
        onClick={handleLogout}
      >
        Logout &rarr;
      </button>
    </nav>
  );
};
