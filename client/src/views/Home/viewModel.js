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
    // console.log({ data })

    const { googlePlaceAddress, startDate, endDate } = data

    // console.log({
    //   center,
    //   zoom,
    //   startDate,
    //   endDate
    // })
    history.push({
      pathname: "/find",
      state: {
        googlePlaceAddress,
        startDate,
        endDate,
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