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
          <TextField name="firstName" maxLength={30} />
        </Col>
        <Col md={6}>
          <FieldLabel>{t('personal_info.last_name')}</FieldLabel>
          <TextField name="lastName" maxLength={30} />
        </Col>
        <Col md={6}>
          <FieldLabel>{t('personal_info.address')}</FieldLabel>
          <Tooltip content={t('personal_info.address_tooltip')} />
          <TextField name="address" maxLength={200} />
        </Col>
        <Col md={6}>
          <FieldLabel>{t('personal_info.postcode')}</FieldLabel>
          <Tooltip content={t('personal_info.postcode_tooltip')} />
          <TextField name="postcode" maxLength={6} />
        </Col>
      </Row>
    </>
  );
}

export default PersonalInfo;
