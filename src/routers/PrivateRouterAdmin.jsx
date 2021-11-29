import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRouterAdmin = ({ isAuteticated, component: Component, ...rest }) => { 

  const lastPath = localStorage.getItem('lastPath');
      localStorage.setItem('lastPath', rest.location.pathname)

    return (
    <div>
      <Route
        {...rest}
        component={(props) =>
          isAuteticated.logged && isAuteticated.role==="admin" ? <Component {...props} /> : <Redirect to={lastPath} />
        }
      />
    </div>
  );
};

export default PrivateRouterAdmin;
