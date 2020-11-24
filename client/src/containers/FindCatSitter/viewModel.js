import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getSittersInBounds } from '../../redux/actions/findCatSitterActions';

const defaultMapCenter = { lat: 52.379189, lng: 4.899431 }
const pageSize = 10;

function useFindCatSitter() {
  const { t } = useTranslation();

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

  function onChangePage(current) {
    dispatch(getSittersInBounds(bounds, current))
    setCurrentPage(current)
    setLoading(true)
    setResults([])
  }

  function returnToPageOne() {
    setCurrentPage(1)
  }

  function resetZoom() {
    setZoom(12)
  }

  function onZoom() {
    setZoom(14)
  }

  return {
    t,
    loading,
    setLoading,
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
    setCenter,
    setBounds,
    returnToPageOne,
  }
}

export { useFindCatSitter }