import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getPersonalInfo, postPersonalInfo, deletePicture } from '../../../redux/account/actions';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { general_default_values } from '../_formConfig/_defaultValues'
import { general_schema } from '../_formConfig/_validationSchema'

function useGeneral() {
  const personalInfoRef = useRef(null);

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { data, profilePicRemoved } = useSelector((state) => state.account);

  const [photoField, setPhotoField] = useState()

  const defaultValues = general_default_values;
  const resolver = yupResolver(general_schema)
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
      dispatch(deletePicture(fileName));
    }
  };

  function onSubmit(data) {
    const { profilePicture, ...rest } = data;
    dispatch(postPersonalInfo(rest, profilePicture.file));
  }

  function resetForm() {
    reset(defaultValues)
  }

  return {
    t,
    data,
    FormProvider,
    methods,
    onSubmit,
    resetForm,
    photoField,
    handlePreview,
    handleRemovePhoto,
    personalInfoRef
  };
}

export { useGeneral };
