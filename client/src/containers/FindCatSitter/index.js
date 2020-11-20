import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'reactstrap';
import GoogleMap from '../../components/Google/GoogleMap'
import Search from './Search';
import Result from './Result';
import styled from 'styled-components';
import { List } from 'antd';
// import { useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { useFindCatSitter } from './viewModel';

const mapHeight = '80vh';

const MapContainer = styled.div`
  background: lightblue;
  height: ${mapHeight};
  top: 20px;
  bottom: 20px;
  position: sticky;
`

const MapLoadingDisplay = styled.div`
  display: flex;
  justify-content: center;
  background: rgba(255, 255, 255, 0.7); 
  position: absolute; 
  z-index: 5;
  width: 100%;
  height: 100%;
`

const LoadingSpin = styled(Spin)`
  align-self: center;
`

const pageSize = 25;

function FindCatSitter() {
  // const { googlePlaceAddress, startDate, endDate } = useLocation().state || {};

  const { t } = useTranslation();

  const {
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
    <div style={{ padding: '0 30px 50px 30px' }}>
      {/* <Search
        setLoading={setLoading}
        setZoom={setZoom}
        setCenter={setCenter}
      /> */}

      {/* create display when none is found in bounds */}
      <Row>
        <Col md={7} style={{ width: 1100 }}>
          {totalResults && paginatedResults ?
            <p
              // ref={resultsRef}
              style={{ textAlign: 'left', marginBottom: 20 }}>
              Showing {pagination.from} - {pagination.to} of {totalResults} matches!
            </p>
            :
            []
          }
          {totalResults && totalResults === 0 ?
            <p
              // ref={resultsRef}
              style={{ textAlign: 'left', marginBottom: 20 }}>
              0 matches found
            </p>
            : []
          }
          <List
            itemLayout="vertical"
            size="large"
            loading={loading}
            pagination={{
              onChange: (current) => { onChangePage(current) },
              total: totalResults,
              pageSize,
              current: currentPage
            }}
            dataSource={results}
            renderItem={(item) =>
              <Result
                item={item}
                setHoveredResultId={setHoveredResultId}
              />
            }
          />
        </Col>

        <Col md={5}>
          <MapContainer>
            <MapLoadingDisplay style={{ visibility: loading ? 'visible' : 'hidden' }}>
              <LoadingSpin size="large" />
            </MapLoadingDisplay>
            <GoogleMap
              zoom={zoom}
              setZoom={setZoom}
              center={center}
              setBounds={setBounds}
              returnToPageOne={returnToPageOne}
              results={results}
              setLoading={setLoading}
              hoveredResultId={hoveredResultId}
            />
          </MapContainer>
        </Col>
      </Row>
    </div>
  );
}

export default FindCatSitter;
