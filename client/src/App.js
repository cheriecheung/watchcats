import React, { useEffect } from 'react';
import {
  // BrowserRouter,
  Switch,
  Route,
  Redirect,
  useLocation
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Layout from './components/Layout';
import { NotFound } from './components/UIComponents'
import Home from './views/Home';
import About from './views/About';
import {
  AccountActivation,
  Login,
  PasswordForgotten,
  PasswordReset,
  Register
} from './views/Authentication';
import Bookings from './views/Bookings';
import Chat from './views/Chat';
import Payment from './views/Bookings/containers/Payment';
import WriteReview from './views/Bookings/containers/WriteReview';
import Account from './views/Account';
import FindCatSitter from './views/FindCatSitter';
import { CatSitter, CatOwner } from './views/PublicProfile';

import './App.css';
import './style/formComponents.css';
import './style/uiComponents.css';
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
    overflow: ${({ toggleMobileMenu, isChatPage }) => toggleMobileMenu || isChatPage ? 'hidden' : 'unset'};
  }

  body, .content {
    overflow: ${({ isChatPage }) => isChatPage ? 'hidden' : 'unset'}
  }
`

function PrivateRoute({ component: Component, ...rest }) {
  const { isLoggedIn } = useSelector(state => state.app);

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
  const location = useLocation();
  const { pathname } = location || {}

  const { language, toggleMobileMenu } = useSelector(state => state.app);

  // const { i18n } = useTranslation();

  // useEffect(() => {
  //   i18n.changeLanguage(localStorage.getItem('lang') || 'en');
  // }, [i18n]);

  return (
    <div className="App">
      <GlobalStyle
        toggleMobileMenu={toggleMobileMenu}
        isChatPage={pathname.includes('messages')}
      />

      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/find" component={FindCatSitter} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgot_password" component={PasswordForgotten} />
          <Route path="/reset_password/:token?" component={PasswordReset} />
          <Route path="/activate/:token?" component={AccountActivation} />
          <PrivateRoute path="/profile/catsitter/:id" component={CatSitter} />
          <PrivateRoute path="/profile/catowner/:id" component={CatOwner} />
          <PrivateRoute path="/bookings" component={Bookings} />
          <PrivateRoute path="/payment" component={Payment} />
          <PrivateRoute path="/writereivew/:bookingId?" component={WriteReview} />
          <PrivateRoute path="/messages/:id?" component={Chat} />
          <PrivateRoute path="/account/:id?" component={Account} />
          {/* <Route path="/loading" component={Loading} /> */}
          <Route path="*" component={NotFound} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
