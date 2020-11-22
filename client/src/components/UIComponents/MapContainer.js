import React from 'react'
import styled from 'styled-components';

const DefaultMapContainer = styled.div`
  height: 40vh;
`

const FindCatSitterMapContainer = styled.div`
  height: 80vh;
  top: 20px;
  bottom: 20px;
  position: sticky;
`

function MapContainer({ variant, children }) {
  switch (variant) {
    case 'findCatSitter':
      return <FindCatSitterMapContainer>{children}</FindCatSitterMapContainer>
    default:
      return <DefaultMapContainer>{children}</DefaultMapContainer>
  }
}

export default MapContainer