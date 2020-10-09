import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import Select from 'react-select';

const bgColor = (opacity) => `rgba(255, 161, 149, ${opacity})`;
const bordercolor = (opacity) => `1px solid rgb(255, 161, 149, ${opacity})`;

const colourStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    // console.log({ data, isDisabled, isFocused, isSelected });

    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? bgColor(0.5)
        : isFocused
        ? bgColor(0.2)
        : null,
      color: '#494442',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? data.color : bgColor(0.3)),
      },
    };
  },

  control: (base, state) => ({
    ...base,
    // border: state.isFocused ? bordercolor(0.3) : bordercolor(0.4),
    border: '1px solid #d9d9d9',
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
};

export default function SelectField({
  name,
  options,
  onChange = ([selected]) => selected,
  placeholder,
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
      placeholder={placeholder}
    />
  );
}
