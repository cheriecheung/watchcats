import React from 'react';
import { Row, Col } from 'reactstrap';
import { FieldLabel, TextField } from '../../../components/FormComponents';
import { Tooltip } from '../../../components/UIComponents'

function PersonalInfo({ t }) {
  return (
    <>
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
          <FieldLabel>{t('general_info.address')}</FieldLabel>
          <Tooltip content={t('general_info.address_tooltip')}>
            <i className="fas fa-info-circle ml-2" />
          </Tooltip>
          <TextField name="address" />
        </Col>
        <Col md={6}>
          <FieldLabel>{t('general_info.postcode')}</FieldLabel>
          <Tooltip content={t('general_info.address')}>
            <i className="fas fa-info-circle ml-2" />
          </Tooltip>
          <TextField name="postcode" />
        </Col>
      </Row>
    </>
  );
}

export default PersonalInfo;
