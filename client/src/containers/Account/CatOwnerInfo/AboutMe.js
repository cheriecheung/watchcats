import React from 'react';
import { Row, Col } from 'reactstrap';
import { TextArea } from '../../../components/FormComponents';
import { useTranslation } from 'react-i18next';

function AboutMe() {
  const { t } = useTranslation();

  return (
    <Row>
      <Col md={6}>
        <p>
          To let cat sitters get an idea of where they will be cat sitting, you can upload pictures
          of your place.
        </p>
      </Col>
      <Col md={6}>
        <TextArea name="aboutMe" placeholder={t('owner_form.about_me_description')} />
      </Col>
    </Row>
  );
}

export default AboutMe;
