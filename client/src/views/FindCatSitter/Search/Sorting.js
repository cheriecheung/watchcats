import React from 'react';
import { SelectField } from '../../../components/FormComponents';
import { sortingTypeOptions } from '../../../utility/constants';

function Sorting({ t }) {
  return <SelectField name="sortBy" options={sortingTypeOptions} />;
}

export default Sorting;
