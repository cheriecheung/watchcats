import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getSitterAccount, saveSitter } from '../../../redux/actions/accountActions';
import moment from 'moment';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { cat_sitter_default_values, cat_sitter_schema } from '../_formConfig';

import { DateUtils } from 'react-day-picker';

function useCatSitter() {
  const aboutSitterRef = useRef(null);
  const experienceRef = useRef(null);

  const { t } = useTranslation();
  const { id } = useParams();

  const dispatch = useDispatch();
  const { sitterData } = useSelector((state) => state.account);

  const [cleanedData, setCleanedData] = useState([])

  const defaultValues = cat_sitter_default_values
  const resolver = yupResolver(cat_sitter_schema)
  const methods = useForm({ defaultValues, resolver });
  const { watch, reset, errors } = methods;

  const selectedUnavailableDays = watch('unavailableDates') || [];

  useEffect(() => {
    if (id) {
      dispatch(getSitterAccount(id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (sitterData) {
      const {
        hourlyRate,
        nightlyRate,
        unavailableDates = [],
        ...rest
      } = sitterData;

      const cleaned = { ...rest }

      if (hourlyRate) {
        const hourlyRateOption = { value: hourlyRate, label: `€ ${hourlyRate},00` };
        cleaned.hourlyRate = hourlyRateOption;
      }

      if (nightlyRate) {
        const nightlyRateOption = { value: nightlyRate, label: `€ ${nightlyRate},00` };
        cleaned.nightlyRate = nightlyRateOption;
      }

      if (unavailableDates.length > 0) {
        const formattedDates = unavailableDates.map((item) => new Date(item));
        cleaned.unavailableDates = formattedDates;
      }

      setCleanedData(cleaned)
    }
  }, [sitterData])

  useEffect(() => {
    if (cleanedData) {
      reset(cleanedData)
    }
  }, [cleanedData])

  useEffect(() => {
    const errorsArr = Object.keys(errors);

    if (errorsArr.length > 0) {
      if (errorsArr[0] === 'aboutSitter') {
        window.scrollTo(0, aboutSitterRef.current.offsetTop - 20);
      }
      if (errorsArr[0] === 'experience') {
        window.scrollTo(0, experienceRef.current.offsetTop - 20);
      }
    }
  }, [errors])


  const onDayClick = (day, { selected }) => {
    const allDays = [...selectedUnavailableDays];
    if (selected) {
      const selectedIndex = allDays.findIndex((selectedDay) =>
        DateUtils.isSameDay(selectedDay, day)
      );
      allDays.splice(selectedIndex, 1);
    } else {
      allDays.push(day);
    }
    reset({ unavailableDates: allDays });
  };

  function onSubmit(data) {
    const { hourlyRate, nightlyRate, unavailableDates, ...rest } = data;
    const { value: hourlyRateValue } = hourlyRate || {};
    const { value: nightlyRateValue } = nightlyRate || {};

    const parsedDates = unavailableDates.map((date) => {
      const parsed = moment(date).format('YYYY-MM-DD');
      return parsed;
    });

    const cleanedData = {
      hourlyRate: parseInt(hourlyRateValue),
      nightlyRate: parseInt(nightlyRateValue),
      unavailableDates: parsedDates,
      ...rest,
    };

    dispatch(saveSitter(id, cleanedData));
  };

  function resetForm() {
    reset(defaultValues)
  }

  return {
    t,
    id,
    FormProvider,
    methods,
    selectedUnavailableDays,
    onDayClick,
    onSubmit,
    resetForm,
    aboutSitterRef,
    experienceRef
  }
}

export { useCatSitter };