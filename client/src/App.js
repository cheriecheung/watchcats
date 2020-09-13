import React, { useEffect } from 'react';

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
import Loading from './containers/Login/Loading';
import Bookings from './containers/Bookings';
import WriteReview from './containers/WriteReview';
import Messages from './containers/Messages';
import Account from './containers/Account';
import FindSitter from './containers/FindSitter';
import { CatSitter, CatOwner } from './containers/Profile';
import { useSelector } from 'react-redux';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        cookies.get('userId') ? (
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
            <Route path="/find" component={FindSitter} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/activate/:token?" component={VerifyEmail} />
            <PrivateRoute path="/profile/catsitter/:id" component={CatSitter} />
            <PrivateRoute path="/profile/catowner/:id" component={CatOwner} />
            <PrivateRoute path="/bookings" component={Bookings} />
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
