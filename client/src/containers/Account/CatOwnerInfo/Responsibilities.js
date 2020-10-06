import React from 'react';
import { TextArea } from '../../../components/FormComponents';
import { useTranslation } from 'react-i18next';

function Responsibilities() {
  const { t } = useTranslation();

  return (
    <TextArea name="catsDescription" placeholder={t('owner_form.cat_description_text')} rows="5" />
  );
}

export default Responsibilities;
