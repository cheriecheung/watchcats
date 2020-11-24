import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getPersonalInfo, postPersonalInfo, deletePicture } from '../../../redux/actions/accountActions';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { general_default_values } from '../_defaultValues'
import { general_schema } from '../_validationSchema'

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
  }, [dispatch])

  useEffect(() => {
    if (data) {
      const { profilePictureFileName } = data;
      if (profilePictureFileName) {
        setPhotoField(profilePictureFileName);
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
      setValue(`profilePictureFileName`, null)
    }
  }, [profilePicRemoved])

  function handlePreview(data) {
    setPhotoField(data)
  }

  function handleRemovePhoto(fileName) {
    if (fileName.includes('base64')) {
      setPhotoField(null)
      setValue("profilePictureFileName", null)
    } else {
      dispatch(deletePicture(fileName));
    }
  };

  function onSubmit(data) {
    const { profilePictureFileName, ...rest } = data;
    dispatch(postPersonalInfo(rest, profilePictureFileName.file));
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
