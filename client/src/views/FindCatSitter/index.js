import React from 'react';
// import { useLocation } from 'react-router-dom';
import { useFindCatSitter } from './viewModel';
import ScreenWidthListener from '../../components/Layout/ScreenWidthListener'

import styled from 'styled-components'

import Search from './Search';
import Result from './Result'
import MapItem from './Map'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 990px) {
    flex-direction: column-reverse;
  }
`

const ResultContainer = styled.div`
  width: 1100px; 
  flex-basis: 57%;

  @media (max-width: 1185px) {
    width: 90vw;
    margin-top: 40px;
  }

  @media (max-width: 1100px) {
    width: 95vw;
  }

  @media (max-width: 990px) {
    width: 100%;
    flex-basis: unset;
  }

  @media (max-width: 890px) {
    width: 100%; 
  }
`
const MainContainer = styled.div`
  padding: 40px 0 50px 0;
  width: 1100px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  @media (max-width: 1220px) {
    padding: 40px 100px 50px 100px;
    width: unset;
  }
  
  @media (max-width: 1090px) {
    padding: 40px 50px 50px 50px;
  }

  @media (max-width: 890px) {
    padding: 40px 50px 50px 50px;
  }

  @media (max-width: 500px) {
    padding: 40px 4vw 50px 4vw;
  }
`

function FindCatSitter() {
  const { screenWidth } = ScreenWidthListener();
  // const { googlePlaceAddress, startDate, endDate } = useLocation().state || {};

  const {
    t,
    loading,
    totalResults,
    paginatedResults,
    results, // ???
    pagination,
    currentPage,
    onChangePage,
    zoom,
    setZoom,
    center,
    hoveredResultId,
    setHoveredResultId,
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
            results={results}
            pagination={pagination}
            loading={loading}
            onChangePage={onChangePage}
            currentPage={currentPage}
            setHoveredResultId={setHoveredResultId}
            screenWidth={screenWidth}
          />
        </ResultContainer>

        <div style={{ flexBasis: '40%' }}>
          <MapItem
            t={t}
            zoom={zoom}
            setZoom={setZoom}
            center={center}
            results={results}
            loading={loading}
            hoveredResultId={hoveredResultId}
            onGetSitters={onGetSitters}
          />
        </div>
      </Container>
    </MainContainer>
  );
}

export default FindCatSitter;
