import React from 'react';
import { SelectField } from '../../../components/FormComponents';
import { useTranslation } from 'react-i18next';
import { sortingTypeOptions } from '../../../constants';

function Sorting() {
  const { t } = useTranslation();

  return <SelectField name="sortBy" placeholder="Sort by" options={sortingTypeOptions} />;
}

export default Sorting;
