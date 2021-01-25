import React from 'react';
import PropTypes from 'prop-types';
import { formatTime } from '../../../utility';

function TimeDisplay({ startTime, endTime }) {
  const formattedStartTime = formatTime(startTime);
  const formattedEndTime = formatTime(endTime);

  return (
    <div style={{ marginLeft: 10 }}>
      <span style={{ lineHeight: '1.3rem' }}>
        {formattedStartTime}
      </span>
      <span style={{ margin: '0 5px', fontWeight: 'bold' }}>&#126;</span>
      <span style={{ lineHeight: '1.3rem' }}>
        {formattedEndTime}
      </span>
    </div>
  )
}

export default TimeDisplay;

TimeDisplay.propTypes = {
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired
};