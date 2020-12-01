import React from 'react';
import { Row, Col } from 'reactstrap';
import { FieldLabel, SelectField } from '../../../components/FormComponents';
import { hourlyRateOptions, nightlyRateOptions } from '../../../utility/constants';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`

const Type = styled.span`
  margin-left: 10px;
  align-self: center;
`

function Pricing({ t }) {
  return (
    <Row>
      <Col md={6}>
        <FieldLabel>{t('sitter_form.one_day')}</FieldLabel>
        <Container>
          <SelectField name="hourlyRate" options={hourlyRateOptions} />
          <Type>{t('sitter_form.per_hour')}</Type>
        </Container>
      </Col>
      <Col md={6}>
        <FieldLabel>{t('sitter_form.overnight')}</FieldLabel>
        <Container>
          <SelectField name="nightlyRate" options={nightlyRateOptions} />
          <Type>{t('sitter_form.per_night')}</Type>
        </Container>
      </Col>
    </Row>
  );
}

export default Pricing;
