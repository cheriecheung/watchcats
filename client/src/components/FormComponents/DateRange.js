import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '../FormComponents';

function DateRange({ style }) {
  const { t } = useTranslation();

  return (
    <div style={{ display: 'flex' }}>
      <div className="d-flex flex-column date-picker" style={{ flexBasis: '50%', ...style }}>
        <DatePicker name="startDate" placeholder={t('find_sitter.start_date')} />
      </div>
      <div style={{ display: 'flex', height: 40 }}>
        <i className="fas fa-arrow-right align-self-center ml-2 mr-2" />
      </div>
      <div className="d-flex flex-column date-picker" style={{ flexBasis: '50%', ...style }}>
        <DatePicker name="endDate" placeholder={t('find_sitter.end_date')} />
      </div>
    </div>
  );
}

export default DateRange;


DateRange.propTypes = {
  style: PropTypes.object,
};

DateRange.defaultProps = {
  style: undefined
}