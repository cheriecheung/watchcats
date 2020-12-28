import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getPersonalInfo, postPersonalInfo, removeProfilePicture } from '../../../redux/account/actions';
import LOADING from '../../../constants/loadingTypes'

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { personal_default_values } from '../_formConfig/_defaultValues'
import { personal_schema } from '../_formConfig/_validationSchema'

function usePersonal() {
  const personalInfoRef = useRef(null);

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { data, profilePicRemoved } = useSelector((state) => state.account);
  const { accountLoading } = useSelector((state) => state.loading);

  let isLoadingRemoveProfilePicture = accountLoading === LOADING.REMOVE_PROFILE_PICTURE
  let isLoadingSubmit = accountLoading === LOADING.SAVE_PERSONAL_INFO

  const [photoField, setPhotoField] = useState()

  const defaultValues = personal_default_values;
  const resolver = yupResolver(personal_schema)
  const methods = useForm({ defaultValues, resolver });
  const { reset, setValue, errors } = methods;

  useEffect(() => {
    dispatch(getPersonalInfo());
  }, [])

  useEffect(() => {
    if (data) {
      const { profilePicture } = data;
      if (profilePicture) {
        setPhotoField(profilePicture);
      }

      reset(data);
    }
  }, [data])

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      window.scrollTo(0, personalInfoRef.current.offsetTop - 20);
    }
  }, [errors])

  useEffect(() => {
    if (profilePicRemoved) {
      setPhotoField(null)
      setValue(`profilePicture`, null)
    }
  }, [profilePicRemoved])

  function handlePreview(data) {
    setPhotoField(data)
  }

  function handleRemovePhoto(fileName) {
    if (fileName.includes('base64')) {
      setPhotoField(null)
      setValue("profilePicture", null)
    } else {
      dispatch(removeProfilePicture(fileName));
    }
  };

  function onSubmit(data) {
    const { profilePicture, ...rest } = data;
    dispatch(postPersonalInfo(rest, profilePicture.file));
  }

  return {
    t,
    data,
    FormProvider,
    methods,
    onSubmit,
    photoField,
    handlePreview,
    handleRemovePhoto,
    personalInfoRef,
    isLoadingRemoveProfilePicture,
    isLoadingSubmit
  };
}

export { usePersonal };
