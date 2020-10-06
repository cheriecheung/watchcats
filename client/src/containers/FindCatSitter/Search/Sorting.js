import React from 'react';
import { RadioGroup, RadioButton } from '../../../components/FormComponents';
import { useTranslation } from 'react-i18next';

function Sorting() {
  const { t } = useTranslation();

  return (
    <RadioGroup name="sortBy">
      <RadioButton value="reviews" style={{ marginRight: 5 }}>
        <i className="fas fa-star icon-sort-price" />
        <span>{t('find_sitter.reviews')}</span>
      </RadioButton>
      <RadioButton value="distance" style={{ marginRight: 5 }}>
        <i className="fas fa-map-marker-alt icon-sort-price" />
        <span>{t('find_sitter.distance')}</span>
      </RadioButton>
      <RadioButton value="price">
        <i className="fas fa-euro-sign icon-sort-price" />
        <span>{t('find_sitter.price')}</span>
      </RadioButton>
    </RadioGroup>
  );
}

export default Sorting;
