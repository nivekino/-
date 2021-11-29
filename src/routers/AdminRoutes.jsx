import React from 'react';
import { NavbarAdmin } from '../components/ui/NavbarAdmin';
import { Switch, Route, Redirect } from 'react-router-dom';
import ListScreen from '../components/admin/ListScreen';
import CreateScreen from '../components/admin/CreateScreen';
import UpdateScreen from '../components/admin/UpdateScreen';

const UserRouter = () => {
  return (
    <>
      <NavbarAdmin />
      <div className="mt-4">
        <Switch>
          <Route exact path="/admin/lista" component={ListScreen} />
          <Route exact path="/admin/crear" component={CreateScreen} />

            <Route exact path="/admin/update/:idpost" component={UpdateScreen} />
          <Redirect to="/admin/lista" />
        </Switch>
      </div>
    </>
  );
};

export default UserRouter;
