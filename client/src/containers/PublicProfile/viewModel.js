import { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOwnerProfile, getSitterProfile } from '../../redux/actions/profileActions';
import { getAppointmentTime, sendRequest } from '../../redux/actions/bookingActions';
import { getChatContacts, getChatConversation } from '../../redux/actions/chatActions';

function useCatOwnerProfile() {
  const { t } = useTranslation();

  const { id } = useParams();

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.profile);
  const [returnedData, setReturnedData] = useState({});

  const reviewListRef = useRef(null);
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

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
    scrollToRef
  }
}

function useCatSitterProfile() {
  const { t } = useTranslation();

  const { id } = useParams();

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.profile);
  const [cleanedData, setCleanedData] = useState({});

  const reviewListRef = useRef(null);
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

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
    id
  }
}

function useCatSitterSummary() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { error, appointmentTime } = useSelector((state) => state.bookings);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (modalVisible) {
      dispatch(getAppointmentTime());
    }
  }, [modalVisible]);

  function onSendMessage() {
    dispatch(getChatContacts);
    dispatch(getChatConversation);
  };

  function onSendRequest(data) {
    const body = {
      ...data,
      sitterId: id,
    };
    dispatch(sendRequest(body));
  };

  return {
    modalVisible,
    setModalVisible,
    onSendMessage,
    onSendRequest,
    error,
    appointmentTime
  }
}

export {
  useCatOwnerProfile,
  useCatSitterProfile,
  useCatSitterSummary,
}
