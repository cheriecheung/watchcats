import './App.css';
import './style/formComponents.css';
import './style/uiComponents.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-day-picker/lib/style.css';
import 'react-phone-input-2/lib/style.css'
import 'antd/dist/antd.css';

import React, { lazy, Suspense, useEffect } from 'react';
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
import { createGlobalStyle } from 'styled-components'

const Layout = lazy(() => import("./components/Layout"));
const NotFound = lazy(() => import("./components/UIComponents/ResponseDisplay/NotFound"));
const Home = lazy(() => import("./views/Home"));
const About = lazy(() => import("./views/About"));
const Account = lazy(() => import("./views/Account"));
const Chat = lazy(() => import("./views/Chat"));

const FindCatSitter = lazy(() => import("./views/FindCatSitter"));
const CatOwner = lazy(() => import("./views/PublicProfile/CatOwner"));
const CatSitter = lazy(() => import("./views/PublicProfile/CatSitter"));

const AccountActivation = lazy(() => import("./views/Authentication/AccountActivation"));
const GoogleLoginFailure = lazy(() => import("./views/Authentication/Login/containers/GoogleLoginFailure"));
const GoogleLoginLoading = lazy(() => import("./views/Authentication/Login/containers/GoogleLoginLoading"));
const Login = lazy(() => import("./views/Authentication/Login"));
const PasswordForgotten = lazy(() => import("./views/Authentication/PasswordForgotten"));
const PasswordReset = lazy(() => import("./views/Authentication/PasswordReset"));
const Register = lazy(() => import("./views/Authentication/Register"));

const Bookings = lazy(() => import("./views/Bookings"));
const Payment = lazy(() => import("./views/Payment"));
const WriteReview = lazy(() => import("./views/WriteReview"));

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
  const { toggleMobileMenu } = useSelector(state => state.app);

  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem('lang') || 'en');
  }, [i18n]);

  useEffect(() => {
    dispatch(getNotifications())
  }, []);

  return (
    <div className="App">
      <GlobalStyle
        toggleMobileMenu={toggleMobileMenu}
        isChatPage={pathname.includes('messages')}
      />
      {/* ScrollToTop */}
      <Suspense fallback={null}>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/find" component={FindCatSitter} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/google-login/failcallback" component={GoogleLoginFailure} />
            <Route path="/google-login/callback" component={GoogleLoginLoading} />
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
      </Suspense>
    </div>
  );
}

export default App;
