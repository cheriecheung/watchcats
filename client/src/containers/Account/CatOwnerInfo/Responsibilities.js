import React from 'react';
import { TextArea } from '../../../components/FormComponents';
import { useTranslation } from 'react-i18next';

function Responsibilities() {
  const { t } = useTranslation();

  return (
    <>
      <p>
        Explain the responsibilities of the cat sitter, e.g. what is expected of him / her when
        taking care of your cat(s)? What are some things to pay attention to?
      </p>
      <TextArea
        name="catsDescription"
        placeholder={t('owner_form.cat_description_text')}
        rows="5"
      />
    </>
  );
}

export default Responsibilities;
