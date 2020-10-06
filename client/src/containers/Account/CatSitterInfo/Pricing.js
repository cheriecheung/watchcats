import React from 'react';
import { Row, Col } from 'reactstrap';
import { FieldLabel, SelectField } from '../../../components/FormComponents';
import { useTranslation } from 'react-i18next';
import { priceOneDayOptions, priceOvernightOptions } from '../../../constants';

function Pricing() {
  const { t } = useTranslation();

  return (
    <Row>
      <Col md={6}>
        <FieldLabel>{t('sitter_form.one_day')}</FieldLabel>
        <SelectField name="priceOneDay" options={priceOneDayOptions} />
        <span>{t('sitter_form.per_hour')}</span>
      </Col>
      <Col md={6}>
        <FieldLabel>{t('sitter_form.overnight')}</FieldLabel>
        <SelectField name="priceOvernight" options={priceOvernightOptions} />
        <span>{t('sitter_form.per_night')}</span>
      </Col>
    </Row>
  );
}

export default Pricing;
