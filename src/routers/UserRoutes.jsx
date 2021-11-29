import React from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Switch, Route, Redirect } from 'react-router-dom';
import FavoritosScreen from '../components/favoritos/FavoritosScreen';
import FeedScreen from '../components/feed/FeedScreen';

const UserRouter = () => {
  return (
    <>
      <Navbar />
      <div className="mt-4">
        <Switch>
          <Route exact path="/user/favoritos" component={FavoritosScreen} />
          <Route exact path="/user/feed" component={FeedScreen} />
          <Redirect to="/user/feed" />
        </Switch>
      </div>
    </>
  );
};

export default UserRouter;
