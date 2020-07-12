import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../_actions';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Login({ show, onHide }) {
  const { t, i18n } = useTranslation();
  const { register, handleSubmit, errors } = useForm();
  const [entry, setEntry] = useState('login');

  const loggedIn = useSelector((state) => state.authentication.loggedIn);

  console.log(loggedIn);

  const dispatch = useDispatch();

  const handleLogin = (data) => {
    dispatch(userActions.login(data.email, data.password));
  };

  const handleRegister = async (data) => {
    //   return registration(
    //     data.firstName,
    //     data.lastName,
    //     data.email,
    //     data.password
    //   )
    //     .then((token) => {
    //       if (!token) {
    //         console.log('no token');
    //         setErrorMsg('Incorrect email or password');
    //         return false;
    //       }
    //       console.log(token);
    //       // cookies.set("token", token);
    //       // window.location = "/account";
    //       return true;
    //     })
    //     .catch((err) => {
    //       console.log(err.response);
    //     });
  };

  const renderLogin = () => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4>{t('login.login')}</h4>
        <button
          type="button"
          onClick={() => setEntry('register')}
          style={{ background: 'none', border: 'none', outline: 'none' }}
        >
          {t('login.register')}
        </button>
      </div>

      <button type="button" className="form-control btn btn-info">
        Continue as DEMO USER
      </button>
      <button
        type="button"
        className="form-control btn btn-danger"
        onClick={() => {
          console.log(process.env.REACT_APP_API_DOMAIN);
          window.open(
            `${process.env.REACT_APP_API_DOMAIN}/auth/google/`,
            'GoogleLogin',
            'height=550,width=1000'
          );
        }}
      >
        Google
      </button>

      <div className="hr-label">
        <span>{t('login.or')}</span>
      </div>

      <form
        onSubmit={handleSubmit(handleLogin)}
        style={{ textAlign: 'left', display: 'grid', gridGap: 15 }}
      >
        <div>
          <b>{t('login.email')}</b>
          <input
            className="form-control"
            name="email"
            type="email"
            ref={register({
              validate: (value) => value !== '',
            })}
          />
          {errors.email && (
            <p style={{ color: 'red', margin: 0 }}>{t('login.no_empty')}</p>
          )}
        </div>
        <div>
          <b>{t('login.password')}</b>
          <input
            className="form-control"
            name="password"
            type="password"
            ref={register({
              validate: (value) => value !== '',
            })}
          />
          {errors.password && (
            <p style={{ color: 'red', margin: 0 }}>{t('login.no_empty')}</p>
          )}
        </div>
        <input
          type="submit"
          value={t('login.login')}
          style={{ float: 'right' }}
        />
        {/* {!isLoggedIn && (
          <span style={{ color: 'red' }}>Incorrect or email password</span>
        )} */}
      </form>
    </>
  );

  const renderRegister = () => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4>{t('login.register')}</h4>
        <button
          type="button"
          onClick={() => setEntry('login')}
          style={{ background: 'none', border: 'none', outline: 'none' }}
        >
          {t('login.login')}
        </button>
      </div>

      <button type="button" className="form-control btn btn-danger">
        Google
      </button>

      <div className="hr-label">
        <span>{t('login.or')}</span>
      </div>

      <form
        onSubmit={handleSubmit(handleRegister)}
        style={{ textAlign: 'left', display: 'grid', gridGap: 15 }}
      >
        <div>
          <b>{t('login.first_name')}</b>
          <input
            className="form-control"
            name="firstName"
            type="text"
            ref={register({
              pattern: /^[A-Z]+$/i,
              validate: (value) => value !== '',
            })}
          />
          {errors.firstName && errors.firstName.type === 'pattern' && (
            <p style={{ color: 'red', margin: 0 }}>
              {t('login.only_alphabet')}
            </p>
          )}
          {errors.firstName && errors.firstName.type === 'validate' && (
            <p style={{ color: 'red', margin: 0 }}>{t('login.no_empty')}</p>
          )}
        </div>

        <div>
          <b>{t('login.last_name')}</b>
          <input
            className="form-control"
            name="lastName"
            type="text"
            ref={register({
              pattern: /^[A-Z]+$/i,
              validate: (value) => value !== '',
            })}
          />
          {errors.lastName && errors.lastName.type === 'pattern' && (
            <p style={{ color: 'red', margin: 0 }}>
              {t('login.only_alphabet')}
            </p>
          )}
          {errors.lastName && errors.lastName.type === 'validate' && (
            <p style={{ color: 'red', margin: 0 }}>{t('login.no_empty')}</p>
          )}
        </div>

        <div>
          <b>{t('login.email')}</b>
          <input
            className="form-control"
            name="email"
            type="email"
            ref={register({
              validate: (value) => value !== '',
            })}
          />
          {errors.email && (
            <p style={{ color: 'red', margin: 0 }}>{t('login.no_empty')}</p>
          )}
        </div>

        <div>
          <b>{t('login.password')}</b>
          <input
            className="form-control"
            name="password"
            type="password"
            ref={register({
              validate: (value) => value !== '',
            })}
          />
          {errors.password && (
            <p style={{ color: 'red', margin: 0 }}>{t('login.no_empty')}</p>
          )}
        </div>
        <input
          type="submit"
          value={t('login.register')}
          style={{ float: 'right' }}
        />
      </form>
    </>
  );

  const renderForgotPassword = () => <h1>forgot password?</h1>;

  return (
    <div style={{ margin: 'auto', width: '30%' }}>
      <div style={{ display: 'grid', gridGap: 30 }}>
        {entry === 'login' && renderLogin()}
        {entry === 'register' && renderRegister()}
        {entry === 'forgot' && renderForgotPassword()}
      </div>
    </div>
  );
}

export default Login;
