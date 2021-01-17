import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ContainedButton, Spinner } from '../UIComponents'

function FormButtons({ isLoading }) {
  const { t } = useTranslation();

  return (
    <div className="float-right">
      <ContainedButton type="submit">
        {t('form.save')}
        {isLoading && <Spinner />}
      </ContainedButton>
    </div>
  );
}

export default FormButtons

FormButtons.propTypes = {
  isLoading: PropTypes.bool.isRequired
};