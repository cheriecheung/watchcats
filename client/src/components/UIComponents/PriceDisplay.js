import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function PriceDisplay({ rate, type }) {
  const { t } = useTranslation();

  return (
    <div>
      <div style={{ display: 'flex', height: 20 }}>
        <h6>&euro;</h6>
        <span
          style={{
            margin: '-8px 0 0 5px',
            fontSize: '1.6rem',
          }}
        >
          {rate}
        </span>
      </div>
      <span style={{ marginTop: '-5px', fontSize: '0.9rem' }}>
        {type === 'hourly' ? t('find_sitter.per_hour') : t('find_sitter.per_night')}
      </span>
    </div>
  )
}

export default PriceDisplay

PriceDisplay.propTypes = {
  type: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
};