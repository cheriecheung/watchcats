import React, { useEffect } from 'react';
import {
  // BrowserRouter,
  Switch,
  Route,
  Redirect,
  useLocation
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from './redux/notifications/actions'

import Layout from './components/Layout';
import { GoogleLoginFailedDisplay, NotFound } from './components/UIComponents'
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
import Payment from './views/Payment';
import WriteReview from './views/WriteReview';
import Account from './views/Account';
import FindCatSitter from './views/FindCatSitter';
import { CatSitter, CatOwner } from './views/PublicProfile';

import './App.css';
import './style/formComponents.css';
import './style/uiComponents.css';
import { createGlobalStyle } from 'styled-components'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

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

  const dispatch = useDispatch();
  const { language, toggleMobileMenu } = useSelector(state => state.app);

  useEffect(() => {
    const hasLoggedIn = cookies.get('shortId');
    if (hasLoggedIn) {
      dispatch(getNotifications())
    }
  }, []);

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
          <Route path="/google-login/failcallback" component={GoogleLoginFailedDisplay} />
          <Route path="/register" component={Register} />
          <Route path="/forgot-password" component={PasswordForgotten} />
          <Route path="/reset-password" component={PasswordReset} />
          <Route path="/activate" component={AccountActivation} />
          <PrivateRoute path="/profile/catsitter/:id" component={CatSitter} />
          <PrivateRoute path="/profile/catowner/:id" component={CatOwner} />
          <PrivateRoute path="/bookings" component={Bookings} />
          <PrivateRoute path="/checkout" component={Payment} />
          <PrivateRoute path="/write-reivew" component={WriteReview} />
          <PrivateRoute path="/messages/:id?" component={Chat} />
          <PrivateRoute path="/account" component={Account} />
          {/* <Route path="/loading" component={Loading} /> */}
          <Route path="*" component={NotFound} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
