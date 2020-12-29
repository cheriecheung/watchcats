import React from 'react';
import { useTranslation } from 'react-i18next';

function PasswordCriteriaList() {
  const { t } = useTranslation();

  return (
    <div style={{ textAlign: 'left' }}>
      <span>{t('settings.password_criteria1')}:</span>
      <ul style={{ paddingLeft: 15 }}>
        <li>{t('settings.password_criteria2')}</li>
        <li>{t('settings.password_criteria3')}</li>
        <li>{t('settings.password_criteria4')}</li>
      </ul>
    </div>
  )
}

export default PasswordCriteriaList;
