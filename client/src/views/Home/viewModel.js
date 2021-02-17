import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { home_default_values as defaultValues } from './_formConfig/_defaultValues'
import { home_search_schema } from './_formConfig/_validationSchema'

function useHome() {
  const horizontalCatRef = useRef(null);
  const verticalCatRef = useRef(null)

  const { t } = useTranslation();
  const history = useHistory();

  const [center, setCenter] = useState('');
  const [zoom, setZoom] = useState('');

  const resolver = yupResolver(home_search_schema)
  const methods = useForm({ defaultValues, resolver });
  const { errors } = methods;

  function onSubmit(data) {
    const cleanedData = Object.entries(data).reduce((output, [key, value]) => {
      if (key && value) {
        output[key] = value;
      }
      return output
    }, {})

    console.log({ cleanedData })

    history.push({
      pathname: "/find",
      state: {
        ...cleanedData,
        center,
        zoom
      }
    });
  }

  return {
    t,
    FormProvider,
    methods,
    onSubmit,
    setCenter,
    setZoom,
    horizontalCatRef,
    verticalCatRef
  }
}

export { useHome }