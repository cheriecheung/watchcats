import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import Select from 'react-select';

const bgColor = (opacity) => `rgba(32, 115, 103, ${opacity})`;
const bordercolor = (opacity) => `1px solid rgb(255, 161, 149, ${opacity})`;

const colourStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    // console.log({ data, isDisabled, isFocused, isSelected });

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
    border: state.isFocused ? bordercolor(0.3) : bordercolor(0.4),
    borderRadius: '15px',
    // backgroundColor: 'rgba(45, 144, 116, 0.05) ',
    boxShadow: 'none',
    '&:hover': {
      border: state.isFocused ? bordercolor(0.3) : bordercolor(0.4),
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
