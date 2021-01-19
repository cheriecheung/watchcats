import React from 'react';
// import { useLocation } from 'react-router-dom';
import { useFindCatSitter } from './viewModel';
import ScreenWidthListener from '../../components/Layout/ScreenWidthListener'

import Search from './Search';
import Result from './Result'
import MapItem from './Map'
import { MainContainer, Container, ResultContainer } from './styledComponents'

function FindCatSitter() {
  const { screenWidth } = ScreenWidthListener();
  // const { googlePlaceAddress, startDate, endDate } = useLocation().state || {};

  const {
    t,
    loading,
    totalResults,
    paginatedResults,
    pagination,
    currentPage,
    onChangePage,
    zoom,
    setZoom,
    center,
    hoveredResult,
    setHoveredResult,
    searchProps,
    onGetSitters
  } = useFindCatSitter();

  return (
    <MainContainer>
      <Search
        t={t}
        searchProps={searchProps}
      />

      <Container>
        <ResultContainer>
          <Result
            t={t}
            totalResults={totalResults}
            paginatedResults={paginatedResults}
            pagination={pagination}
            loading={loading}
            onChangePage={onChangePage}
            currentPage={currentPage}
            setHoveredResult={setHoveredResult}
            screenWidth={screenWidth}
          />
        </ResultContainer>

        <div style={{ flexBasis: '40%' }}>
          <MapItem
            t={t}
            zoom={zoom}
            setZoom={setZoom}
            center={center}
            results={paginatedResults}
            loading={loading}
            hoveredResult={hoveredResult}
            onGetSitters={onGetSitters}
          />
        </div>
      </Container>
    </MainContainer>
  );
}

export default FindCatSitter;
