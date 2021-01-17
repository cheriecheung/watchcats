import React from 'react';
import { Row, Col } from 'reactstrap';
import { FieldLabel, SelectField } from '../../../components/FormComponents';
import { hourlyRateOptions, nightlyRateOptions } from '../../../constants/selectOptions';
import styled from 'styled-components';
import { themeColor } from '../../../style/theme';

const Container = styled.div`
  display: flex;
  margin-bottom: 5px;
`

const Type = styled.span`
  margin-left: 10px;
  align-self: center;
`

function Pricing({ t, hourlyNetProfit, nightlyNetProfit }) {
  return (
    <Row>
      <Col md={6}>
        <FieldLabel>{t('sitter_form.one_day')}</FieldLabel>
        <Container>
          <SelectField name="hourlyRate" options={hourlyRateOptions} />
          <Type>{t('sitter_form.per_hour')}</Type>
        </Container>
        <span style={{ marginTop: 5, color: themeColor.peach }}>
          {t('sitter_form.you_make', { euros: hourlyNetProfit })}
        </span>
      </Col>

      <Col md={6}>
        <FieldLabel>{t('sitter_form.overnight')}</FieldLabel>
        <Container>
          <SelectField name="nightlyRate" options={nightlyRateOptions} />
          <Type>{t('sitter_form.per_night')}</Type>
        </Container>
        <span style={{ marginTop: 5, color: themeColor.peach }}>
          {t('sitter_form.you_make', { euros: nightlyNetProfit })}
        </span>
      </Col>
    </Row>
  );
}

export default Pricing;
