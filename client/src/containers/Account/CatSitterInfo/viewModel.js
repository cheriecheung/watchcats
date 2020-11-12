import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSitterAccount, saveSitter } from '../../../redux/actions/accountActions';
import moment from 'moment';

function useCatSitter() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { sitterData } = useSelector((state) => state.account);

  const [cleanedData, setCleanedData] = useState([])

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

  return {
    cleanedData,
    onSubmit
  }
}

export { useCatSitter };
