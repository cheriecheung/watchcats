import React, { useEffect, useState } from 'react';

import './App.css';
import './style/formComponents.css';
import './style/uiComponents.css';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './components/Layout/Header';
import Layout from './components/Layout';
import Home from './containers/Home';
import About from './containers/About';
import VerifyEmail from './containers/VerifyEmail';
import Login from './containers/Login';
import Register from './containers/Login/Register';
import ForgotPassword from './containers/ForgotPassword'
import ResetPassword from './containers/ForgotPassword/ResetPassword';
import Loading from './containers/Login/Loading';

import Bookings from './containers/Bookings';
import Payment from './containers/Payment';
import WriteReview from './containers/WriteReview';

import Messages from './containers/Messages';
import Account from './containers/Account';
import FindCatSitter from './containers/FindCatSitter';
import { CatSitter, CatOwner } from './containers/PublicProfile';

import { useDispatch, useSelector } from 'react-redux';


function PrivateRoute({ component: Component, ...rest }) {
  const { isLoggedIn } = useSelector(state => state.authentication);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
      }
    />
  );
}

function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem('lang') || 'en');
  }, [i18n]);

  return (
    <div className="App">
      <BrowserRouter basename={'/'}>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/find" component={FindCatSitter} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/forgot_password" component={ForgotPassword} />
            <Route path="/reset_password/:token" component={ResetPassword} />
            <Route path="/activate/:token?" component={VerifyEmail} />
            <PrivateRoute path="/profile/catsitter/:id" component={CatSitter} />
            <PrivateRoute path="/profile/catowner/:id" component={CatOwner} />
            <PrivateRoute path="/bookings" component={Bookings} />
            <PrivateRoute path="/payment" component={Payment} />
            <PrivateRoute path="/writereivew/:id?" component={WriteReview} />
            <PrivateRoute path="/messages/:id?" component={Messages} />
            <PrivateRoute path="/account/:id?" component={Account} />
            <Route path="/loading" component={Loading} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
