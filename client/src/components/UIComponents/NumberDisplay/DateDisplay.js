import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../../utility';
// import { useTranslation } from 'react-i18next';

function DateDisplay({ date }) {
  const formattedDate = formatDate(date, 'DD MMM YYYY').split(" ")

  return (
    <div style={{ display: 'flex' }}>
      <span style={{ fontSize: '2.5rem', lineHeight: '2.6rem', marginRight: 8 }}>
        {formattedDate[0]}
      </span>
      <div style={{ display: 'flex', flexDirection: ' column' }}>
        <span style={{ fontWeight: 'bold', lineHeight: '1.3rem' }}>
          {formattedDate[1].toUpperCase()}
        </span>
        <span style={{ lineHeight: '1.3rem' }}>
          {formattedDate[2]}
        </span>
      </div>
    </div>
  )
}

export default DateDisplay

DateDisplay.propTypes = {
  date: PropTypes.string.isRequired,
};