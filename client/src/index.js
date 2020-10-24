import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'
import { Provider } from 'react-redux';
import configureStore from './_helpers/store';
import { setAccessToken } from './accessToken'

import i18n from './i18n/i18n';
import { I18nextProvider } from 'react-i18next';

async function checkLoggedIn() {
  console.log("checking logged in")
  let preloadedState

  try {
    const { data } = await axios.post(`/refresh_token`)
    console.log({ data });

    const { accessToken } = data;
    setAccessToken(accessToken)

    preloadedState = { authentication: { isLoggedIn: true } };
    return preloadedState;

  } catch (err) {
    console.log({ err })

    preloadedState = { authentication: { isLoggedIn: false } };
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
          <App />
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
