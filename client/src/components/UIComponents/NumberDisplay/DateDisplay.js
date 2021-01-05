import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function PriceDisplay({ splitString }) {
  const { t } = useTranslation();

  return (
    <div style={{ display: 'flex' }}>
      <span style={{ fontSize: '2.5rem', lineHeight: '2.6rem', marginRight: 8 }}>
        {splitString[0]}
      </span>
      <div style={{ display: 'flex', flexDirection: ' column' }}>
        <span style={{ fontWeight: 'bold', lineHeight: '1.3rem' }}>
          {splitString[1].toUpperCase()}
        </span>
        <span style={{ lineHeight: '1.3rem' }}>
          {splitString[2]}
        </span>
      </div>
    </div>
  )
}

export default PriceDisplay

PriceDisplay.propTypes = {
  splitString: PropTypes.string.isRequired,
};