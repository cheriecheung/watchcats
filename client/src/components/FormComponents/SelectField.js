import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import Select from 'react-select';

const colourStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    console.log({ data, isDisabled, isFocused, isSelected });
    const bgColor = (opacity) => `rgba(160, 223, 207, ${opacity})`;

    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? bgColor(0.6)
        : isFocused
        ? bgColor(0.2)
        : null,
      color: '#333333',

      ':active': {
        ...styles[':active'],
        backgroundColor:
          !isDisabled && (isSelected ? data.color : bgColor(0.4)),
      },
    };
  },

  control: (base, state) => ({
    ...base,
    border: state.isFocused ? '1px solid #a0dfcf' : '1px solid #ced4da',
    boxShadow: 'none',
    '&:hover': {
      border: state.isFocused ? '1px solid #a0dfcf' : '1px solid #ced4da',
    },
  }),
};

export default function SelectField({
  name,
  options,
  onChange = ([selected]) => selected,
  // defaultValue = { value: '', label: '' },
}) {
  const { control, errors } = useFormContext();

  return (
    <Controller
      control={control}
      as={Select}
      name={name}
      options={options}
      onChange={onChange}
      isSearchable={false}
      //defaultValue={defaultValue}
      styles={colourStyles}
    />
  );
}
