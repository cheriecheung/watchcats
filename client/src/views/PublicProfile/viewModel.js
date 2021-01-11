import { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointmentTime, sendRequest } from '../../redux/bookings/actions';
import { getChatList, getChatConversation } from '../../redux/chat/actions';
import { clearError } from '../../redux/error/actions';
import { getOwnerProfile, getSitterProfile } from '../../redux/profile/actions';
import { calculateOneDayPrice, calculateOvernightPrice } from '../../utility';
import LOADING from '../../constants/loadingTypes'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function useCatOwnerProfile() {
  const { t } = useTranslation();

  const { id } = useParams();

  const dispatch = useDispatch();
  const { profileError } = useSelector((state) => state.error);
  const { data } = useSelector((state) => state.profile);

  const [returnedData, setReturnedData] = useState(null);

  const reviewListRef = useRef(null);
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  useEffect(() => {
    return () => {
      dispatch(clearError('profileError'))
    };
  }, [])

  useEffect(() => {
    if (id) {
      dispatch(getOwnerProfile(id));
      // show 'does not exist' message if no profile with such id
      console.log({ id });
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      setReturnedData(data);
    }
  }, [data]);

  return {
    t,
    returnedData,
    reviewListRef,
    scrollToRef,
    profileError
  }
}

function useCatSitterProfile() {
  const { t } = useTranslation();

  const { id } = useParams();

  const dispatch = useDispatch();
  const { profileError } = useSelector((state) => state.error);
  const { data } = useSelector((state) => state.profile);

  const [cleanedData, setCleanedData] = useState(null);

  const reviewListRef = useRef(null);
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  useEffect(() => {
    return () => {
      dispatch(clearError('profileError'))
    };
  }, [])

  useEffect(() => {
    if (id) {
      dispatch(getSitterProfile(id));
      // show 'does not exist' message if no profile with such id
      console.log({ id });
    }
  }, [id]);

  useEffect(() => {
    if (data && data.unavailableDates) {
      const { unavailableDates } = data;

      const convertedUnavailableDates = unavailableDates
        ? unavailableDates.map((item) => new Date(item))
        : [];

      setCleanedData({
        ...data,
        unavailableDates: convertedUnavailableDates,
      });
    }
  }, [data]);

  return {
    t,
    cleanedData,
    reviewListRef,
    scrollToRef,
    id,
    profileError
  }
}

function useCatSitterSummary() {
  const history = useHistory();

  const { id } = useParams();
  const urlId = cookies.get('urlId');
  const isViewingOwnProfile = id === urlId;

  const dispatch = useDispatch();
  // move to profile reducer
  const { profileActionStatus } = useSelector((state) => state.bookings);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (modalVisible) {
      dispatch(getAppointmentTime());
    }
  }, [modalVisible]);

  function onSendMessage() {
    dispatch(getChatList);
    dispatch(getChatConversation(id));
    history.push(`/messages/${id}`)
  };

  return {
    modalVisible,
    setModalVisible,
    onSendMessage,
    profileActionStatus,
    isViewingOwnProfile
  }
}

function useCreateAppointmentTime() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const defaultButtonStyle = {
    marginRight: 15,
    border: 'none',
    borderBottom: 'none',
    background: 'transparent',
    outline: 'none',
    color: '#666',
  };

  const clickedButtonStyle = {
    ...defaultButtonStyle,
    fontWeight: 'bold',
    color: '#ffa195',
    borderBottom: '2px solid #ffa195',
  };

  const [oneDayStyle, setOneDayStyle] = useState(defaultButtonStyle);
  const [overnightStyle, setOvernightStyle] = useState(defaultButtonStyle);

  const { bookingsError } = useSelector((state) => state.error);
  const { data } = useSelector((state) => state.profile);
  const { bookingsLoading } = useSelector((state) => state.loading);

  let isLoadingSendRequest = bookingsLoading === LOADING.SEND_BOOKING_REQUEST

  const [rate, setRate] = useState({});
  const [appointmentData, setAppointmentData] = useState({});

  const defaultValues = {
    type: 'oneDay',
    oneDay: { date: '', startTime: '', endTime: '' },
    overnight: { startDate: '', endDate: '' },
    price: 'To be calculated',
  };

  const methods = useForm({ defaultValues });
  const { register, setValue, reset, watch } = methods;

  const type = watch('type');
  const oneDayDate = watch('oneDay.date');
  const oneDayStartTime = watch('oneDay.startTime');
  const oneDayEndTime = watch('oneDay.endTime');
  const overnightStartDate = watch('overnight.startDate');
  const overnightEndDate = watch('overnight.endDate');
  const price = watch('price');

  useEffect(() => {
    if (data) {
      const { hourlyRate, nightlyRate } = data;
      setRate({ hourlyRate, nightlyRate })
    }
  }, [data])

  useEffect(() => {
    register({ name: 'price' });
  }, [register]);

  useEffect(() => {
    if (oneDayDate && oneDayStartTime && oneDayEndTime) {
      const priceValue = calculateOneDayPrice(oneDayStartTime, oneDayEndTime, rate.hourlyRate);

      if (typeof priceValue === 'number') {
        setValue('price', `€ ${priceValue}, 00`);
      } else {
        setValue('price', priceValue);
      }

      setAppointmentData({
        type,
        date: oneDayDate,
        startTime: oneDayStartTime,
        endTime: oneDayEndTime,
        price: priceValue,
      });
    }
  }, [oneDayStartTime, oneDayEndTime]);

  useEffect(() => {
    if (overnightStartDate && overnightEndDate) {
      const priceValue = calculateOvernightPrice(
        overnightStartDate,
        overnightEndDate,
        rate.nightlyRate
      );

      if (typeof priceValue === 'number') {
        setValue('price', `€ ${priceValue}, 00`);
      } else {
        setValue('price', priceValue);
      }

      setAppointmentData({
        type,
        startDate: overnightStartDate,
        endDate: overnightEndDate,
        price: priceValue,
      });
    }
  }, [overnightStartDate, overnightEndDate]);

  useEffect(() => {
    if (type === 'oneDay') {
      setOneDayStyle(clickedButtonStyle);
      setOvernightStyle(defaultButtonStyle);
    }

    if (type === 'overnight') {
      setOvernightStyle(clickedButtonStyle);
      setOneDayStyle(defaultButtonStyle);
    }
  }, [type]);

  function onSendRequest() {
    const body = {
      ...appointmentData,
      sitterId: id,
    };
    dispatch(sendRequest(body));
  };

  function resetForm() {
    reset(defaultValues);
  }

  return {
    FormProvider,
    methods,
    type,
    price,
    onSendRequest,
    resetForm,
    oneDayStyle,
    overnightStyle,
    bookingsError,
    isLoadingSendRequest
  }
}

function useSelectAppointmentTime() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { appointmentTime } = useSelector((state) => state.bookings);
  const { allOneDays = [], allOvernight = [] } = appointmentTime || {};

  const { bookingsLoading } = useSelector((state) => state.loading);
  let isLoadingSendRequest = bookingsLoading === LOADING.SEND_BOOKING_REQUEST

  const { bookingsError } = useSelector((state) => state.error);
  const { data } = useSelector((state) => state.profile);

  const [rate, setRate] = useState({});
  const [appointmentData, setAppointmentData] = useState({});

  useEffect(() => {
    if (data) {
      const { hourlyRate, nightlyRate } = data;
      setRate({ hourlyRate, nightlyRate })
    }
  }, [data])

  const [price, setPrice] = useState('To be calculated');

  const handleSelectTime = (e) => {
    const [type, index] = e.target.value.split('.');

    if (type === 'oneDay') {
      const date = allOneDays[index].date;
      const startTime = allOneDays[index].startTime;
      const endTime = allOneDays[index].endTime;

      const priceValue = calculateOneDayPrice(startTime, endTime, rate.hourlyRate);

      if (typeof priceValue === 'number') {
        setPrice(`€ ${priceValue}, 00`);
      } else {
        setPrice(priceValue);
      }

      setAppointmentData({ type, date, startTime, endTime, price: priceValue });
    }

    if (type === 'overnight') {
      const startDate = allOvernight[index].startDate;
      const endDate = allOvernight[index].endDate;

      const priceValue = calculateOvernightPrice(startDate, endDate, rate.nightlyRate);

      if (typeof priceValue === 'number') {
        setPrice(`€ ${priceValue}, 00`);
      } else {
        setPrice(priceValue);
      }

      setAppointmentData({ type, startDate, endDate, price: priceValue });
    }
  };

  function onSendRequest() {
    const body = {
      ...appointmentData,
      sitterId: id,
    };
    dispatch(sendRequest(body));
  };

  return {
    allOneDays,
    allOvernight,
    handleSelectTime,
    price,
    onSendRequest,
    bookingsError,
    isLoadingSendRequest
  }
}

export {
  useCatOwnerProfile,
  useCatSitterProfile,
  useCatSitterSummary,
  useCreateAppointmentTime,
  useSelectAppointmentTime
}