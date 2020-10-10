import React from 'react';
import { Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { FieldLabel, TextField } from '../../../components/FormComponents';

function PersonalInfo() {
  const { t } = useTranslation();

  return (
    <>
      <p style={{ marginBottom: 30 }}>
        The personal data in the following section will be used for communication purpose when a cat
        sitting service is requested.
      </p>
      <Row>
        <Col md={6}>
          <FieldLabel>{t('general_info.first_name')}</FieldLabel>
          <TextField name="firstName" />
        </Col>
        <Col md={6}>
          <FieldLabel>{t('general_info.last_name')}</FieldLabel>
          <TextField name="lastName" />
        </Col>
        <Col md={6}>
          <FieldLabel>{t('general_info.phone')}</FieldLabel>
          <TextField name="phone" />
        </Col>
        <Col md={6}>
          <FieldLabel>{t('general_info.email')}</FieldLabel>
          <TextField name="email" disabled />
        </Col>
        <Col md={6}>
          <FieldLabel>{t('general_info.address')}</FieldLabel>
          <TextField name="address" />
        </Col>
        <Col md={6}>
          <FieldLabel>{t('general_info.postcode')}</FieldLabel>
          <TextField name="postcode" errorLabel="Invalid Dutch postcode" />
        </Col>
      </Row>
    </>
  );
}

export default PersonalInfo;
