import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOwnerAccount, saveOwner, removeCatPhoto } from '../../../redux/actions/accountActions';
import moment from 'moment';
import { catBreedOptions, personalityOptions } from '../../../constants';

function useCatOwner() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { ownerData, ownerSaved, ownerCompleteSave } = useSelector((state) => state.account);
  const [cleanedData, setCleanedData] = useState([])

  useEffect(() => {
    if (id) {
      dispatch(getOwnerAccount(id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (ownerData) {
      const {
        aboutMe,
        bookingOneDay = [{ date: '', startTime: null, endTime: '' }],
        bookingOvernight = [{ startDAte: null, endDate: '' }],
        cat,
        catsDescription,
      } = ownerData;

      const catUpdated = cat.map(({ breed, personality, ...rest }, index) => {

        const breedName = catBreedOptions.filter(({ value }) => value === breed)[0].label
        const personalityName = personalityOptions.filter(({ value }) => value === personality)[0].label

        return {
          ...rest,
          breed: { value: breed, label: breedName },
          personality: { value: personality, label: personalityName },
        }
      })

      setCleanedData({
        aboutMe,
        bookingOneDay,
        bookingOvernight,
        cat: catUpdated,
        catsDescription,
      })
    }
  }, [ownerData])

  function onSubmit(data, photos) {
    const { cat, bookingOneDay, bookingOvernight, ...rest } = data;

    const cleanedCat = cat.map(({ breed, personality, ...restCat }) => {
      const { value: breedValue } = breed || {};
      const { value: personalityValue } = personality || {};

      return {
        breed: parseInt(breedValue),
        personality: parseInt(personalityValue),
        ...restCat
      }
    })

    let cleanedBookingOneDay;
    let cleanedBookingOvernight;

    if (bookingOneDay.length === 1 && (bookingOneDay[0].date === '' || bookingOneDay[0].endTime === '' || bookingOneDay.startTime === null)) {
      cleanedBookingOneDay = []
    } else {
      cleanedBookingOneDay = bookingOneDay.map(({ date, startTime, endTime }) => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        const formattedStartTime = moment(startTime).format('HH:mm');
        const formattedEndTime = moment(endTime).format('HH:mm');

        return {
          date: formattedDate,
          startTime: formattedStartTime,
          endTime: formattedEndTime
        }
      });
    }

    if (bookingOvernight.length === 1 && (bookingOvernight[0].endDate === '' || bookingOvernight.startDate === null)) {
      cleanedBookingOvernight = []
    } else {
      cleanedBookingOvernight = bookingOvernight.map(({ startDate, endDate }) => {
        const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
        const formattedEndDate = moment(endDate).format('YYYY-MM-DD');

        return {
          startDate: formattedStartDate,
          endDate: formattedEndDate
        }
      });
    }

    const cleanedData = {
      cat: cleanedCat,
      bookingOneDay: cleanedBookingOneDay,
      bookingOvernight: cleanedBookingOvernight,
      ...rest
    }

    dispatch(saveOwner(id, cleanedData, photos))
  };

  return {
    cleanedData,
    onSubmit
  }
}

function useCat() {
  const dispatch = useDispatch();

  const { cleanedData } = useCatOwner();
  const { catPhotoRemoved } = useSelector((state) => state.account);

  const [photoFields, setPhotoFields] = useState([])
  const [removePhotoIndex, setRemovePhotoIndex] = useState('')

  useEffect(() => {
    if (cleanedData && cleanedData.cat) {
      const { cat } = cleanedData
      const allPhotoFields = cat.map(({ photo }, index) => photo);

      setPhotoFields(allPhotoFields);
    }
  }, [cleanedData]);

  const handlePreview = (data, index) => {
    let updateFields = [...photoFields];
    updateFields[index] = data
    setPhotoFields(updateFields)
  }

  useEffect(() => {
    // provide fail response
    if (catPhotoRemoved) {
      let updateFields = [...photoFields];
      updateFields[removePhotoIndex] = null;
      setPhotoFields(updateFields)
    }
  }, [catPhotoRemoved])

  const handleRemovePhoto = (fileName, index) => {
    setRemovePhotoIndex(index);

    if (fileName.includes('base64')) {
      let updateFields = [...photoFields];
      updateFields[index] = null
      setPhotoFields(updateFields)
    } else {
      dispatch(removeCatPhoto(fileName, index))
    }
  }

  return {
    photoFields,
    handlePreview,
    catPhotoRemoved,
    removePhotoIndex,
    handleRemovePhoto
  }
}

export { useCatOwner, useCat };
