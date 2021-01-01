import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getOwnerAccount, saveOwner, removeCatPhoto } from '../../../redux/account/actions';
import { catBreedOptions, personalityOptions } from '../../../constants/selectOptions'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import {
  cat_owner_default_values,
  catObj,
  oneDayObj,
  overnightObj,
} from '../_formConfig/_defaultValues'
import { cat_owner_schema } from '../_formConfig/_validationSchema'
import { formatDate, formatTime } from '../../../utility'
import LOADING from '../../../constants/loadingTypes'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function useCatOwner() {
  const id = cookies.get('shortId')
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.app);
  const { ownerData, catPhotoRemoved } = useSelector((state) => state.account);
  const { accountLoading } = useSelector((state) => state.loading)

  let isLoadingRemoveCatPhoto = accountLoading === LOADING.REMOVE_CAT_PHOTO
  let isLoadingSaveOwner = accountLoading === LOADING.SAVE_OWNER

  const [cleanedData, setCleanedData] = useState([])
  const [photoFields, setPhotoFields] = useState([])
  const [removePhotoIndex, setRemovePhotoIndex] = useState('')
  const [catBreeds, setCatBreeds] = useState([])

  const defaultValues = cat_owner_default_values;
  const resolver = yupResolver(cat_owner_schema)
  const methods = useForm({ defaultValues, resolver });
  const { control, reset, watch, setValue, errors } = methods;

  const oneDayFieldArray = useFieldArray({ control, name: 'bookingOneDay' });
  const bookingOneDay = watch('bookingOneDay');
  const oneDayFields = oneDayFieldArray.fields

  const overnightFieldArray = useFieldArray({ control, name: 'bookingOvernight' });
  const bookingOvernight = watch('bookingOvernight')
  const overnightFields = overnightFieldArray.fields

  let catFieldArray = useFieldArray({ control, name: 'cat' });
  const cat = watch('cat')
  let catFields = catFieldArray.fields

  useEffect(() => {
    dispatch(getOwnerAccount());
  }, []);

  useEffect(() => {
    if (ownerData) {
      const {
        aboutMe,
        bookingOneDay = [{ date: '', startTime: null, endTime: '' }],
        bookingOvernight = [{ startDAte: null, endDate: '' }],
        cat,
        catsDescription,
      } = ownerData;

      const cleanedCat = cat.map(({ breed, personality, ...rest }, index) => {

        // find()... no [0] cos returns object, not array
        const breedName = catBreedOptions.filter(({ value }) => value === breed)[0].label
        const personalityName = personalityOptions.filter(({ value }) => value === personality)[0].label

        return {
          ...rest,
          breed: { value: breed, label: t(breedName) },
          personality: { value: personality, label: personalityName },
        }
      })

      setCleanedData({
        aboutMe,
        bookingOneDay,
        bookingOvernight,
        cat: cleanedCat,
        catsDescription,
      })
    }
  }, [ownerData])

  useEffect(() => {
    console.log({ cleanedData })
    if (cleanedData && cleanedData.cat) {
      // Object.entries(cleanedData).map(([key, value]) => setValue(key, value))
      reset(cleanedData)

      const { cat } = cleanedData
      const allPhotoFields = cat.map(({ photo }, index) => photo);
      setPhotoFields(allPhotoFields);
    }
  }, [cleanedData]);

  useEffect(() => {
    // provide fail response
    if (catPhotoRemoved) {
      let updateFields = [...photoFields];
      updateFields[removePhotoIndex] = null;
      setPhotoFields(updateFields)

      setValue(`cat[${removePhotoIndex}].photo`, null)
    }
  }, [catPhotoRemoved])

  const handlePreview = (data, index) => {
    let updateFields = [...photoFields];
    updateFields[index] = data
    setPhotoFields(updateFields)
  }

  const handleRemovePhoto = (fileName, index) => {
    setRemovePhotoIndex(index);

    if (fileName.includes('base64')) {
      let updateFields = [...photoFields];
      updateFields[index] = null
      setPhotoFields(updateFields)

      setValue(`cat[${index}].photo`, null)
    } else {
      dispatch(removeCatPhoto(fileName, index))
    }
  }

  function onSubmit(data) {
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
        const formattedDate = formatDate(date);
        const formattedStartTime = formatTime(startTime);
        const formattedEndTime = formatTime(endTime);

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
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);

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

    const photos = watch('cat').map(({ photo }) => photo || {})

    dispatch(saveOwner(cleanedData, photos))
  };

  function resetForm() {
    reset(defaultValues)
  }

  function addCat() {
    catFieldArray.append(catObj)
  }

  function removeCat(index) {
    if (window.confirm('Click Ok to confirm to remove cat record')) {
      catFieldArray.remove(index);

      // let newCatFieldArray = [...catFields];
      // newCatFieldArray.splice(index, 1);

      // let updateFields = [...photoFields];
      // updateFields[index] = null;
      // setPhotoFields(updateFields)

      // try setValue
      // reset({ cat: newCatFieldArray })
    }
  }

  function addOneDay() {
    oneDayFieldArray.append(oneDayObj)
  }

  function removeOneDay(index) {
    oneDayFieldArray.remove(index);

    // let newOneDayFieldArray = [...oneDayFields];
    // newOneDayFieldArray.splice(index, 1);

    // try setValue
    // reset({ bookingOneDay: newOneDayFieldArray })
  }

  function addOvernight() {
    overnightFieldArray.append(overnightObj)
  }

  function removeOvernight(index) {
    overnightFieldArray.remove(index);

    // let newOvernightFieldArray = [...overnightFields];
    // newOvernightFieldArray.splice(index, 1);

    // try setValue
    // reset({ bookingOvernight: newOvernightFieldArray })
  }

  const catProps = {
    cat,
    catFields,
    addCat,
    removeCat,
    photoFields,
    handlePreview,
    handleRemovePhoto,
    catBreeds
  }

  const bookingOneDayProps = {
    bookingOneDay,
    oneDayFields,
    addOneDay,
    removeOneDay
  }

  const bookingOvernightProps = {
    bookingOvernight,
    overnightFields,
    addOvernight,
    removeOvernight
  }

  return {
    t,
    id,
    methods,
    FormProvider,
    onSubmit,
    resetForm,
    bookingOneDayProps,
    bookingOvernightProps,
    catProps,
    isLoadingRemoveCatPhoto,
    isLoadingSaveOwner
  }
}

export { useCatOwner };