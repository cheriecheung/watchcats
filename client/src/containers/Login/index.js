import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { login, registration } from '../../_actions/userActions';
import axios from 'axios';
import sha1 from 'js-sha1';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Login({ show, onHide }) {
  const { t, i18n } = useTranslation();
  const { register, handleSubmit, errors } = useForm();
  const [entry, setEntry] = useState('login');

  const auth = useSelector((state) => state.authentication);

  const dispatch = useDispatch();

  const handleLogin = (data) => {
    dispatch(login(data.email, data.password));
  };

  const handleRegister = (data) => {
    dispatch(
      registration(data.firstName, data.lastName, data.email, data.password)
    );
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

  const handleSetPassword = (e) => {
    // if password length is more than 8 and less than 12, run function
    if (e.target.value.length >= 8 && e.target.value.length <= 12) {
      const sha = sha1(e.target.value);
      console.log({ sha, value: e.target.value });
      const prefix = sha.substring(0, 5);
      const suffix = sha.substring(5, sha.length);

      axios
        .get(`https://api.pwnedpasswords.com/range/${prefix}`)
        .then(({ data }) => {
          //console.log(data);
          const hashes = data.split('\n');
          const breached = false;

          for (let i = 0; i < hashes.length; i++) {
            const hash = hashes[i];
            const hashSuffix = hash.split(':');

            if (hashSuffix[0] === suffix) {
              alert(`the password has been breached ${hashSuffix[1]} times`);
              console.log(hashSuffix[1]);
            }

            // if (!breached) {
            //   alert('password has not been breached');
            // }
          }
        })
        .catch((error) => console.log(error));
    }

    // split result on \n character
    // iternate over array
    // split each intance by ':'
    // comparasion to detect password found

    // ---- if password found in a breach -> based on amount of times being beached, show password strength
    // ---- if password has not been found, show highest password strength
  };

  const handleGoogleLogin = () => {
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/auth/googleOauth2`)
      .then(({ data: authenticationURI }) => {
        console.log(authenticationURI);
        // redirect in backend instead?
        window.open(authenticationURI, 'GoogleLogin', 'height=550,width=1000');
        // console.log(response);
      })
      .catch((error) => console.log(error.response));
  };

  const renderLogin = () => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4>{t('form.login')}</h4>
        <button
          type="button"
          onClick={() => setEntry('register')}
          style={{ background: 'none', border: 'none', outline: 'none' }}
        >
          {t('form.register')}
        </button>
      </div>

      <input type="password" onChange={handleSetPassword} />

      <button type="button" className="form-control btn btn-info">
        Continue as DEMO USER
      </button>
      <button
        type="button"
        className="form-control btn btn-danger"
        onClick={handleGoogleLogin}
        //onClick={() => {
        //  window.open(
        //    `${process.env.REACT_APP_API_DOMAIN}/auth/googleOauth2`,
        //    'GoogleLogin',
        //    'height=550,width=1000'
        //  );
        //}}
      >
        Google
      </button>

      <div className="hr-label">
        <span>{t('form.or')}</span>
      </div>

      <form
        onSubmit={handleSubmit(handleLogin)}
        style={{ textAlign: 'left', display: 'grid', gridGap: 15 }}
      >
        <div>
          <b>{t('form.email')}</b>
          <input
            className="form-control"
            name="email"
            type="email"
            ref={register({
              validate: (value) => value !== '',
            })}
          />
          {errors.email && (
            <p style={{ color: 'red', margin: 0 }}>{t('form.no_empty')}</p>
          )}
        </div>
        <div>
          <b>{t('form.password')}</b>
          <input
            className="form-control"
            name="password"
            type="password"
            ref={register({
              validate: (value) => value !== '',
            })}
          />
          {errors.password && (
            <p style={{ color: 'red', margin: 0 }}>{t('form.no_empty')}</p>
          )}
        </div>
        <input
          type="submit"
          value={t('form.login')}
          style={{ float: 'right' }}
        />
        {auth.errorMessage && (
          <span style={{ color: 'red' }}>{auth.errorMessage}</span>
        )}
      </form>
    </>
  );

  const renderRegister = () => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4>{t('form.register')}</h4>
        <button
          type="button"
          onClick={() => setEntry('login')}
          style={{ background: 'none', border: 'none', outline: 'none' }}
        >
          {t('form.login')}
        </button>
      </div>

      <button type="button" className="form-control btn btn-danger">
        Google
      </button>

      <div className="hr-label">
        <span>{t('form.or')}</span>
      </div>

      <form
        onSubmit={handleSubmit(handleRegister)}
        style={{ textAlign: 'left', display: 'grid', gridGap: 15 }}
      >
        <div>
          <b>{t('form.first_name')}</b>
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
            <p style={{ color: 'red', margin: 0 }}>{t('form.only_alphabet')}</p>
          )}
          {errors.firstName && errors.firstName.type === 'validate' && (
            <p style={{ color: 'red', margin: 0 }}>{t('form.no_empty')}</p>
          )}
        </div>

        <div>
          <b>{t('form.last_name')}</b>
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
            <p style={{ color: 'red', margin: 0 }}>{t('form.only_alphabet')}</p>
          )}
          {errors.lastName && errors.lastName.type === 'validate' && (
            <p style={{ color: 'red', margin: 0 }}>{t('form.no_empty')}</p>
          )}
        </div>

        <div>
          <b>{t('form.email')}</b>
          <input
            className="form-control"
            name="email"
            type="email"
            ref={register({
              validate: (value) => value !== '',
            })}
          />
          {errors.email && (
            <p style={{ color: 'red', margin: 0 }}>{t('form.no_empty')}</p>
          )}
        </div>

        <div>
          <b>{t('form.password')}</b>
          <input
            className="form-control"
            name="password"
            type="password"
            ref={register({
              validate: (value) => value !== '',
            })}
          />
          {errors.password && (
            <p style={{ color: 'red', margin: 0 }}>{t('form.no_empty')}</p>
          )}
        </div>
        <input
          type="submit"
          value={t('form.register')}
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
