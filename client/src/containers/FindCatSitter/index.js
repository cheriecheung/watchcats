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
    flex-direction: column;
  }
`

const ResultContainer = styled.div`
  width: 1100px; 
  flex-basis: 56%;

  @media (max-width: 1185px) {
    width: 90vw;
    flex-basis: 57%;
  }

  @media (max-width: 1100px) {
    width: 95vw;
  }

  @media (max-width: 990px) {
    width: 75vw;
    margin-bottom: 50px;
    flex-basis: unset;
  }

  @media (max-width: 890px) {
    width: 100%; 
  }
`

function FindCatSitter() {
  const { screenWidth } = ScreenWidthListener();

  console.log({ outerWidth__: screenWidth })
  // const { googlePlaceAddress, startDate, endDate } = useLocation().state || {};

  const {
    t,
    loading,
    setLoading,
    totalResults,
    paginatedResults,
    results, // ???
    pagination,
    currentPage,
    onChangePage,
    zoom,
    setZoom,
    center,
    setCenter,
    setBounds,
    returnToPageOne,
    hoveredResultId,
    setHoveredResultId
  } = useFindCatSitter();

  return (
    <div style={{ padding: '40px 20px 50px 20px' }}>
      <Search
        t={t}
        setLoading={setLoading}
        setZoom={setZoom}
        setCenter={setCenter}
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
            setBounds={setBounds}
            returnToPageOne={returnToPageOne}
            results={results}
            loading={loading}
            setLoading={setLoading}
            hoveredResultId={hoveredResultId}
          />
        </div>
      </Container>
    </div>
  );
}

export default FindCatSitter;
