import React from 'react';
import { DatePicker } from '../../../components/FormComponents';

function AppointmentPeriodPicker({ t }) {

  return (
    <div style={{ display: 'flex' }}>
      <div className="d-flex flex-column date-picker" style={{ flexBasis: '50%' }}>
        <DatePicker name="startDate" placeholder={t('find_sitter.start_date')} />
      </div>
      <i className="fas fa-arrow-right align-self-center ml-2 mr-2" />
      <div className="d-flex flex-column date-picker" style={{ flexBasis: '50%' }}>
        <DatePicker name="endDate" placeholder={t('find_sitter.end_date')} />
      </div>
    </div>
  );
}

export default AppointmentPeriodPicker;
