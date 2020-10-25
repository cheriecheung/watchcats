import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { registration } from '../../redux/actions/userActions';
import { yupResolver } from '@hookform/resolvers/yup';
import { register_schema } from '../Account/_validationSchema'
import { Link } from 'react-router-dom';

import axios from 'axios';
import sha1 from 'js-sha1';

const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}

const resolver = yupResolver(register_schema)

function Register() {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch()

    const methods = useForm({ defaultValues, resolver });
    const { handleSubmit, reset, setValue, errors, watch, register } = methods;

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

    const handleRegister = (data) => {
        const { firstName, lastName, email, password } = data;
        dispatch(registration(firstName, lastName, email, password));
    };

    return (
        <div style={{ width: '30vw', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h4>{t('register.register')}</h4>
                <Link
                    to="/login"
                    style={{ background: 'none', border: 'none', outline: 'none' }}
                >
                    {t('login.login')}
                </Link>
            </div>

            <button type="button" className="form-control btn btn-danger">
                Google
              </button>

            <div className="hr-label">
                <span>{t('form.or')}</span>
            </div>


            <FormProvider {...methods}>
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
            </FormProvider>
        </div>
    )
}

export default Register;