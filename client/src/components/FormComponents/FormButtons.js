import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ContainedButton, TextButton, Spinner } from '../UIComponents'

function FormButtons({ onClick, isLoading }) {
  const { t } = useTranslation();

  const handleReset = (resetFunction) => {
    if (window.confirm('Click Ok to confirm to reset')) {
      resetFunction();
    }
  };

  return (
    <div className="float-right">
      {onClick &&
        <TextButton
          style={{ marginRight: 10 }}
          onClick={() => handleReset(onClick)}
        >
          {t('form.reset')}
        </TextButton>
      }

      <ContainedButton type="submit">
        {t('form.save')}
        {isLoading && <Spinner />}
      </ContainedButton>
    </div>
  );
}

export default FormButtons

FormButtons.propTypes = {
  onClick: PropTypes.func,
  isLoading: PropTypes.bool.isRequired
};

FormButtons.defaultProps = {
  onClick: undefined
};