import React from 'react';
import { Row, Col } from 'reactstrap';
import { FieldLabel, TextField } from '../../../components/FormComponents';
import { Tooltip } from '../../../components/UIComponents'

function PersonalInfo({ t }) {
  return (
    <>
      <Row>
        <Col md={6}>
          <FieldLabel>{t('personal_info.first_name')}</FieldLabel>
          <TextField name="firstName" />
        </Col>
        <Col md={6}>
          <FieldLabel>{t('personal_info.last_name')}</FieldLabel>
          <TextField name="lastName" />
        </Col>
        <Col md={6}>
          <FieldLabel>{t('personal_info.address')}</FieldLabel>
          <Tooltip content={t('personal_info.address_tooltip')} />
          <TextField name="address" />
        </Col>
        <Col md={6}>
          <FieldLabel>{t('personal_info.postcode')}</FieldLabel>
          <Tooltip content={t('personal_info.postcode_tooltip')} />
          <TextField name="postcode" />
        </Col>
      </Row>
    </>
  );
}

export default PersonalInfo;
