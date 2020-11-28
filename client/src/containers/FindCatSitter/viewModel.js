import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSittersInBounds } from '../../redux/actions/findCatSitterActions';
import { sortingTypeOptions } from '../../constants';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { find_cat_sitter_default_values as defaultValues } from './_formConfig/_defaultValues';
import { find_cat_sitter_schema } from './_formConfig/_validationSchema'

const defaultMapCenter = { lat: 52.379189, lng: 4.899431 }
const pageSize = 10;

function useFindCatSitter() {
  const { t } = useTranslation();
  const { googlePlaceAddress, startDate, endDate } = useLocation().state || {};

  const dispatch = useDispatch();
  const { totalResults, paginatedResults } = useSelector((state) => state.find_cat_sitters);
  // display error when returned failure

  const [zoom, setZoom] = useState(12);
  const [center, setCenter] = useState(defaultMapCenter);
  const [bounds, setBounds] = useState({})

  const [results, setResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(true)
  const [hoveredResultId, setHoveredResultId] = useState('')

  const resolver = yupResolver(find_cat_sitter_schema)
  const methods = useForm({
    defaultValues,
    resolver,
    mode: 'onChange',
    reValidateMode: 'onChange'
  });
  const { handleSubmit, reset, setValue, watch, errors } = methods;

  const startDateValue = watch('startDate');
  const endDateValue = watch('endDate');
  const { value: sortByValue } = watch('sortBy') || {};

  function onGetSitters(bounds) {
    setLoading(true);
    setBounds({ ...bounds })

    // sortByValue remains default value even when changed to another
    dispatch(getSittersInBounds({ ...bounds, page: 1, sort: sortByValue }))
    setCurrentPage(1)
  }

  useEffect(() => {
    if (paginatedResults) {
      setResults(paginatedResults)
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
    if (googlePlaceAddress && startDate && endDate) {
      reset({ googlePlaceAddress })
      // google.maps.event.trigger(autocomplete, 'place_changed');
    }
  }, [googlePlaceAddress, startDate, endDate])

  useEffect(() => {
    handleSubmit(() => {
      // errors appears even when endDate is before startDate
      if (startDateValue && endDateValue && Object.keys(errors).length === 0) {
        console.log({ errors })
        const queryParams = {
          ...bounds,
          page: 1,
          sort: sortByValue,
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
    if (sortByValue) {
      setCurrentPage(1)
      dispatch(getSittersInBounds({ ...bounds, page: 1, sort: sortByValue }))

      // reset({
      //   ...defaultValues,
      //   sortBy: sortByValue
      // })
    }
  }, [sortByValue]);

  function onChangePage(current) {
    dispatch(getSittersInBounds({ ...bounds, page: current, sort: sortByValue }))
    setCurrentPage(current)
    setLoading(true)
    setResults([])
  }

  function resetZoom() {
    setZoom(12)
  }

  function onZoom() {
    setZoom(14)
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
    setCenter
  }

  return {
    t,
    loading,
    totalResults,
    paginatedResults,
    results,
    pagination,
    currentPage,
    onChangePage,
    hoveredResultId,
    setHoveredResultId,
    zoom,
    setZoom,
    center,
    searchProps,
    onGetSitters,
  }
}

export { useFindCatSitter }