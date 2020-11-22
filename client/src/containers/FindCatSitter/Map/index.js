import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import { Maps } from '../../../components/Google'

const mapHeight = '80vh';

const Container = styled.div`
background: lightblue;
height: ${mapHeight};
top: 20px;
bottom: 20px;
position: sticky;
`

const LoadingBox = styled.div`
display: flex;
justify-content: center;
background: rgba(255, 255, 255, 0.7); 
position: absolute; 
z-index: 5;
width: 100%;
height: 100%;
`

const LoadingSpin = styled(Spin)`
  color: red !important;
  align-self: center;
`

function MapItem({
  loading,
  setLoading,
  zoom,
  setZoom,
  center,
  setBounds,
  returnToPageOne,
  results,
  hoveredResultId
}) {
  return (
    <Container>
      <LoadingBox style={{ visibility: loading ? 'visible' : 'hidden' }}>
        <LoadingSpin size="large" />
      </LoadingBox>
      <Maps
        zoom={zoom}
        setZoom={setZoom}
        center={center}
        setBounds={setBounds}
        returnToPageOne={returnToPageOne}
        results={results}
        setLoading={setLoading}
        hoveredResultId={hoveredResultId}
      />
    </Container>
  )
}

export default MapItem