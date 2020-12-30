import React from 'react';
import { DatePicker } from '../../../components/FormComponents';

function AppointmentPeriodPicker({ t, style }) {

  return (
    <div style={{ display: 'flex' }}>
      <div className="d-flex flex-column date-picker" style={{ flexBasis: '50%', ...style }}>
        <DatePicker name="startDate" />
      </div>
      <i className="fas fa-arrow-right align-self-center ml-2 mr-2" />
      <div className="d-flex flex-column date-picker" style={{ flexBasis: '50%', ...style }}>
        <DatePicker name="endDate" />
      </div>
    </div>
  );
}

export default AppointmentPeriodPicker;
