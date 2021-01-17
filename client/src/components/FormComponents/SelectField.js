import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';
import { getErrorProperties } from '../../utility'
import ErrorDisplay from './ErrorDisplay';

const bgColor = (opacity) => `rgba(255, 161, 149, ${opacity})`;
const bordercolor = (opacity) => `1px solid rgb(255, 161, 149, ${opacity})`;

const colourStyles = {
  container: base => ({
    ...base,
    flex: 1,
  }),

  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
          ? bgColor(0.5)
          : isFocused
            ? bgColor(0.2)
            : null,
      color: '#7f7f7f',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? data.color : bgColor(0.3)),
      },
    };
  },

  control: (base, { selectProps: { hasError } }) => ({
    ...base,
    // border: state.isFocused ? bordercolor(0.3) : bordercolor(0.4),
    //border: '1px solid #d9d9d9',
    border: `1px solid ${hasError ? '#E56E5A' : '#d9d9d9'}`,
    borderRadius: '10px',
    boxShadow: 'none',
    '&:hover': {
      // border: state.isFocused ? bordercolor(0.3) : bordercolor(0.4),
      // border: '1px solid #d9d9d9',
      cursor: 'pointer',
      border: '1px solid rgba(255, 161, 149, 0.4)',
      WebkitBoxShadow: '0 0 0 2px rgba(255, 161, 149, 0.15) !important',
      boxShadow: '0 0 0 2px rgba(255, 161, 149, 0.15) !important',
    },
  }),

  singleValue: (provided) => ({
    ...provided,
    color: '#7f7f7f',
  })
};

function SelectField({
  name,
  options,
  onChange,
}) {
  const { t, i18n } = useTranslation();
  const { language } = i18n || {}

  const updatedOptions = name.includes('Rate') ?
    options :
    options.map(({ value, label }) => ({ value, label: t(label) }))

  const { control, errors, setValue, watch } = useFormContext();
  const { hasError, message } = getErrorProperties(name, errors)

  const translateOptions = () => {
    if (!watch(name)) {
      setValue(name, { value: 'form.select', label: t('form.select') })
    }

    if (!name.includes('Rate')) {
      const value = watch(name).value;
      setValue(name, { value, label: t(value) })
    }
  }

  useEffect(() => {
    translateOptions();
  }, [language])

  useEffect(() => {
    translateOptions();
  }, [])

  return (
    <>
      <Controller
        hasError={hasError}
        control={control}
        as={Select}
        styles={colourStyles}
        name={name}
        options={updatedOptions}
        onChange={onChange}
        isSearchable={false}
      />
      <ErrorDisplay hidden={!hasError}>{message}</ErrorDisplay>
    </>
  );
}

export default SelectField

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

SelectField.defaultProps = {
  onChange: ([selected]) => selected,
}