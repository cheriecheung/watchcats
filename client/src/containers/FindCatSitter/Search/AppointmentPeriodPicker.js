import React from 'react';
import { DatePicker } from '../../../components/FormComponents';
import { useTranslation } from 'react-i18next';

function AppointmentPeriodPicker() {
  const { t } = useTranslation();

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div className="d-flex flex-column date-picker" style={{ flexBasis: '45%' }}>
          <DatePicker name="startDate" placeholder={t('find_sitter.start_date')} />
        </div>
        <i className="fas fa-arrow-right align-self-center" />
        <div className="d-flex flex-column date-picker" style={{ flexBasis: '45%' }}>
          <DatePicker name="endDate" placeholder={t('find_sitter.end_date')} />
        </div>
      </div>
    </>
  );
}

export default AppointmentPeriodPicker;
