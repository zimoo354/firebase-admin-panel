import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import ResetPassword from './components/Login/resetPassword';
import Dashboard from './views/home';
import Vehicles from './views/vehicles';
import FormVehicles from './views/vehicles/form';
import Users from './views/users';
import FormUsers from './views/users/form';
import Drivers from './views/drivers';
import FormDrivers from './views/drivers/form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/reset-password' component={ResetPassword} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/vehicles' component={Vehicles} />
          <Route exact path='/drivers' component={Drivers} />
          <Route exact path='/users' component={Users} />
          <Route exact path='/vehicles/form' component={FormVehicles} />
          <Route exact path='/vehicles/form/:id' component={FormVehicles} />
          <Route exact path='/drivers/form' component={FormDrivers} />
          <Route exact path='/drivers/form/:id' component={FormDrivers} />
          <Route exact path='/users/form' component={FormUsers} />
          <Route exact path='/users/form/:id' component={FormUsers} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
