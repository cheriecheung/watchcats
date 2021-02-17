import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSittersInBounds, setInitialState } from '../../redux/find_cat_sitter/actions';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { find_cat_sitter_default_values as defaultValues } from './_formConfig/_defaultValues';
import { find_cat_sitter_schema } from './_formConfig/_validationSchema';

import moment from 'moment';
import { capitalize } from '../../utility';

const defaultMapCenter = { lat: 52.379189, lng: 4.899431 }
const pageSize = 10;

function useFindCatSitter() {
  const { t } = useTranslation();
  const {
    googlePlaceAddress,
    startDate,
    endDate,
    center: centerValue,
    zoom: zoomValue
  } = useLocation().state || {};

  const dispatch = useDispatch();
  const { totalResults, paginatedResults } = useSelector((state) => state.find_cat_sitter);
  // display error when returned failure

  // if get location has zoom and center, use them instead
  const [zoom, setZoom] = useState(12);
  const [center, setCenter] = useState(defaultMapCenter);
  const [bounds, setBounds] = useState({})

  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(true)
  const [hoveredResultId, setHoveredResultId] = useState('')

  const resolver = yupResolver(find_cat_sitter_schema)
  const methods = useForm({ defaultValues, resolver });
  const { handleSubmit, reset, setValue, watch, errors } = methods;

  const startDateValue = watch('startDate');
  const endDateValue = watch('endDate');
  const { value: sortByValue } = watch('sortBy') || {};

  const resultRef = useRef(null);
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  useEffect(() => {
    localStorage.setItem('mapSearch', 'enabled');

    return () => {
      dispatch(setInitialState())
    }
  }, [])

  useEffect(() => {
    if (paginatedResults) {
      // setLoading(false)
      setTimeout(() => {
        setLoading(false)
      }, 300)

      setPagination({
        from: currentPage * pageSize - pageSize + 1,
        to: (currentPage - 1) * pageSize + paginatedResults.length
      })
    }
  }, [paginatedResults])

  useEffect(() => {
    if (googlePlaceAddress) {
      setValue('googlePlaceAddress', googlePlaceAddress)

      setCenter(centerValue)
      setZoom(zoomValue)
    }
  }, [googlePlaceAddress])

  useEffect(() => {
    if (startDate && endDate) {
      setValue('startDate', startDate)
      setValue('endDate', endDate)

      setCenter(centerValue)
      setZoom(zoomValue)
    }
  }, [startDate, endDate])

  function getSortByName() {
    const sortByName = sortByValue.split(".")[1]
    const nameParts = sortByName.split('_');

    let sort;
    if (nameParts.length === 2) {
      sort = `${nameParts[0]}${capitalize(nameParts[1])}`
    }

    if (nameParts.length === 3) {
      sort = `${nameParts[0]}${capitalize(nameParts[1])}${capitalize(nameParts[2])}`
    }
    return { sort }
  }

  useEffect(() => {
    handleSubmit(() => {
      if (startDateValue && endDateValue && Object.keys(errors).length === 0) {
        setLoading(true);

        const { sort } = getSortByName();

        const queryParams = {
          ...bounds,
          page: 1,
          sort,
          startDate: startDateValue,
          endDate: endDateValue
        }

        dispatch(getSittersInBounds(queryParams))
      }
    })()

    // reset({
    //   ...defaultValues,
    //   startDate: startDateValue,
    //   endDate: endDateValue
    // })
  }, [startDateValue, endDateValue]);

  useEffect(() => {
    // console.log({ sortByValue })
    if (sortByValue) {
      setCurrentPage(1)
      dispatch(setInitialState())
      setLoading(true)

      const { sort } = getSortByName();

      dispatch(getSittersInBounds({ ...bounds, page: 1, sort }))

      // reset({
      //   ...defaultValues,
      //   sortBy: sortByValue
      // })
    }
  }, [sortByValue]);

  useEffect(() => {
    if (bounds && localStorage.getItem('mapSearch') === 'enabled') {
      onGetSitters();
    }
  }, [bounds, localStorage.getItem('mapSearch')])

  function onGetSitters() {
    dispatch(setInitialState())
    setLoading(true);

    const { sort } = getSortByName();

    // sortByValue remains default value even when changed to another
    const queryParams = {
      ...bounds,
      page: 1,
      sort,
    }

    if (startDateValue && endDateValue) {
      queryParams.startDate = moment(startDateValue).format('YYYY-MM-DD');
      queryParams.endDate = moment(endDateValue).format('YYYY-MM-DD');
    }

    dispatch(getSittersInBounds(queryParams))
    setCurrentPage(1)
  }

  function onChangePage(current) {
    // scrollToRef(resultRef);

    dispatch(setInitialState())

    const { sort } = getSortByName();
    dispatch(getSittersInBounds({ ...bounds, page: current, sort }))

    setCurrentPage(current)
    setLoading(true)
    // setResults([])
  }

  function resetZoom() {
    setZoom(12)
  }

  function resetSearch() {
    reset(defaultValues);
    setZoom(12)
  }

  const searchProps = {
    FormProvider,
    methods,
    resetSearch,
    defaultValues,
    setLoading,
    setZoom,
    setCenter,
  }

  return {
    t,
    loading,
    totalResults,
    paginatedResults,
    pagination,
    currentPage,
    onChangePage,
    hoveredResultId,
    setHoveredResultId,
    zoom,
    setZoom,
    center,
    searchProps,
    setBounds,
    onGetSitters,
    startDate,
    endDate,
    resultRef
  }
}

export { useFindCatSitter }