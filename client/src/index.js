import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import { setAccessToken } from './utility/accessToken'

import i18n from './i18n/i18n';
import { I18nextProvider } from 'react-i18next';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const { REACT_APP_API_DOMAIN } = process.env;

async function checkLoggedIn() {
  let preloadedState;

  const refresh_token = cookies.get('refreshToken');
  if (!refresh_token) return;

  try {
    const { data } = await axios.post(
      `${REACT_APP_API_DOMAIN}/refresh-token`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${refresh_token}`,
        },
        withCredentials: true,
      }
    )

    const { accessToken } = data;
    setAccessToken(accessToken)

    preloadedState = { app: { isLoggedIn: true } };

    // history push
    return preloadedState;

  } catch (err) {
    console.log({ err_____: err })

    preloadedState = { app: { isLoggedIn: false } };
    return preloadedState;
  }
}

const renderApp = (preloadedState) => {
  const store = configureStore(preloadedState);
  window.state = store.getState;

  ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter basename={'/'}>
            <App />
          </BrowserRouter>
        </Provider>
      </React.StrictMode>
    </I18nextProvider>,
    document.getElementById('root')
  );
};

(async () => renderApp(await checkLoggedIn()))();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
