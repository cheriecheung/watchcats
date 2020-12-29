import React from 'react';
import { Row, Col } from 'reactstrap';
import { FieldLabel, TextField } from '../../../components/FormComponents';

function SocialMedia({ t }) {
  return (
    <Row className="social-media-input">
      <Col md={4} className="mb-3">
        <FieldLabel>{t('personal_info.facebook')}</FieldLabel>
        <TextField
          name="profileFacebook"
          prefix={<i className="fab fa-facebook-square fa-lg mr-1" />}
          maxLength={150}
        />
      </Col>
      <Col md={4} className="mb-3">
        <FieldLabel>{t('personal_info.instagram')}</FieldLabel>
        <TextField
          name="profileInstagram"
          prefix={<i className="fab fa-instagram fa-lg mr-1" />}
          maxLength={150}
        />
      </Col>
      <Col md={4}>
        <FieldLabel>{t('personal_info.other')}</FieldLabel>
        <TextField
          name="profileOther"
          prefix={<i className="fas fa-user  mr-1" />}
          maxLength={150}
        />
      </Col>
    </Row>
  );
}

export default SocialMedia;
