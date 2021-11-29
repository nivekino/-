import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import PrivateRouterAdmin from './PrivateRouterAdmin';
import PrivateRouterUser from './PrivateRouterUser';
import PublicRouter from './PublicRouter';
import AdminRoutes from './AdminRoutes';
import UserRoutes from './UserRoutes';
import LoginScreen from '../components/login/LoginScreen';

const AppRouters = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <div className="bg-gray-50">
        <Switch>
          <PublicRouter
            exact
            path="/"
            component={LoginScreen}
            isAuteticated={user.logged}
          />

          <PrivateRouterAdmin
            path="/admin"
            component={AdminRoutes}
            isAuteticated={user}
          />
          <PrivateRouterUser
            path="/user"
            component={UserRoutes}
            isAuteticated={user}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouters;
