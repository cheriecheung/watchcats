import React from 'react';
import { Row, Col } from 'reactstrap';
// import { useLocation } from 'react-router-dom';
import { useFindCatSitter } from './viewModel';

import Search from './Search';
import Result from './Result'
import MapItem from './Map'


function FindCatSitter() {
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
    <div style={{ padding: '40px 30px 50px 30px' }}>
      <Search
        t={t}
        setLoading={setLoading}
        setZoom={setZoom}
        setCenter={setCenter}
      />

      <Row>
        <Col md={7} style={{ width: 1100 }}>
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
          />
        </Col>

        <Col md={5}>
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
        </Col>
      </Row>
    </div>
  );
}

export default FindCatSitter;
