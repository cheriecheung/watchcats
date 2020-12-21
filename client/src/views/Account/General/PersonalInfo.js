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
          <Tooltip content="Your address will not be shared with anyone in any manner">
            <i className="fas fa-info-circle ml-2" />
          </Tooltip>
          <TextField name="address" />
        </Col>
        <Col md={6}>
          <FieldLabel>{t('general_info.postcode')}</FieldLabel>
          <Tooltip content="Once submitted, your location will appear in the map on 'Find Cat Sitter' page">
            <i className="fas fa-info-circle ml-2" />
          </Tooltip>
          <TextField name="postcode" />
        </Col>
      </Row>
    </>
  );
}

export default PersonalInfo;
