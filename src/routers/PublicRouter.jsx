import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRouter = ({ isAuteticated, component: Component, ...rest }) => {
  const lastPath = localStorage.getItem('lastPath');

  return (
    <div>
      <Route
        {...rest}
        component={(props) =>
          !isAuteticated ? <Component {...props} /> : <Redirect to={lastPath} />
        }
      />
    </div>
  );
};

export default PublicRouter;
