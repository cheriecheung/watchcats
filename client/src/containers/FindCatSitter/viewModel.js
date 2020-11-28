import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getSittersInBounds } from '../../redux/actions/findCatSitterActions';
import { useForm, FormProvider } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { sortingTypeOptions } from '../../constants';

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

  const defaultValues = {
    googlePlaceAddress: '',
    startDate: '',
    endDate: '',
    sortBy: sortingTypeOptions[0],
  };

  const methods = useForm({ defaultValues });
  const { reset, watch } = methods;

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
    console.log({ googlePlaceAddress, startDate, endDate })
  }, [googlePlaceAddress, startDate, endDate])

  useEffect(() => {
    // use yup
    if (startDateValue !== '' && endDateValue !== '') {
      if (new Date(startDateValue) > new Date(endDateValue)) {
        console.log('hey make sure your end date is after or equal to start date');
      } else {
        // setValue('sortBy', '');
        // setAddress('');
      }
    }
  }, [startDateValue, endDateValue]);

  useEffect(() => {
    if (sortByValue !== '') {
      // setValue('startDate', '');
      // setValue('endDate', '');
      // setAddress('');
      setCurrentPage(1)
      dispatch(getSittersInBounds({ ...bounds, page: 1, sort: sortByValue }))
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
    resetSearch
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