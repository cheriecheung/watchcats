import React from 'react';
import { Row, Col, Input } from 'reactstrap';
import { TextArea } from '../../../components/FormComponents';
import { useTranslation } from 'react-i18next';

function AboutMe() {
  const { t } = useTranslation();

  return (
    <Row>
      <Col md={6}>
        <TextArea name="aboutMe" placeholder={t('owner_form.about_me_description')} />
      </Col>
      <Col md={6}>
        <p>
          To let cat sitters get an idea of where they will be cat sitting, you can upload pictures
          of your place.
        </p>
        <Input
          type="file"
          style={{
            border: '1px solid #ced4da',
            padding: 5,
            borderRadius: '4px',
            marginBottom: 10,
          }}
        />
      </Col>
    </Row>
  );
}

export default AboutMe;
