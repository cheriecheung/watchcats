import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker as AntDatePicker } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import { getErrorProperties } from '../../utility'
import ErrorDisplay from './ErrorDisplay';

const Field = styled(AntDatePicker)`
  border: 1px solid ${({ error }) => error ? '#E56E5A' : '#d9d9d9'};
`

function DatePicker({ name, placeholder }) {
  const { t } = useTranslation();

  const { control, watch, setValue, errors } = useFormContext();
  const { hasError, message } = getErrorProperties(name, errors)

  const selectedDate = watch(name);

  const translatedPlaceholder = placeholder ? t(placeholder) : ''

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={() => (
          <Field
            error={hasError}
            placeholder={translatedPlaceholder}
            disabledDate={(current) => {
              return current && current < moment();
            }}
            onChange={(date, dateString) => setValue(name, dateString)}
            value={selectedDate ? moment(selectedDate, 'YYYY-MM-DD') : null}
          />
        )}
      />
      <ErrorDisplay hidden={!hasError}>{message}</ErrorDisplay>
    </>
  );
}

export default DatePicker

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

DatePicker.defaultProps = {
  placeholder: 'form.select'
}