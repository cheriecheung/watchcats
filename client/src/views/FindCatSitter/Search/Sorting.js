import React from 'react';
import { SelectField } from '../../../components/FormComponents';
import { sortingTypeOptions } from '../../../constants/selectOptions';

function Sorting() {
  return <SelectField name="sortBy" options={sortingTypeOptions} />;
}

export default Sorting;
