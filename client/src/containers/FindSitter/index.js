import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'reactstrap';
import GoogleMap from './GoogleMap';
import Search from './Search';
import ResultDisplay from './ResultDisplay';
import Profile from './Profile';
import styled from 'styled-components';

function FindSitter() {
  const { t, i18n } = useTranslation();
  const mapHeight = '80vh';

  return (
    <div style={{ padding: '0 40px' }}>
      <Profile />
    </div>
  );
}

export default FindSitter;
