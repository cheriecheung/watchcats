import React from 'react';
import { useTranslation } from 'react-i18next';
import { ContainedButton, TextButton } from '../UIComponents'

export default function FormButtons({ onClick }) {
  const { t } = useTranslation();

  const handleReset = (resetFunction) => {
    if (window.confirm('Click Ok to confirm to reset')) {
      resetFunction();
    }
  };

  return (
    <div className="float-right">
      <TextButton onClick={() => handleReset(onClick)}>
        {t('form.reset')}
      </TextButton>

      <ContainedButton type="submit">
        {t('form.save')}
      </ContainedButton>
    </div>
  );
}
