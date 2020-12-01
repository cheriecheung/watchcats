import React from 'react';
import { Row, Col } from 'reactstrap';
import { TextArea } from '../../../components/FormComponents';

function AboutMe({ t }) {

  return (
    <Row>
      <Col md={6}>
        <p>
          {t('owner_form.about_me_description')}
        </p>
      </Col>
      <Col md={6}>
        <TextArea name="aboutMe" />
      </Col>
    </Row>
  );
}

export default AboutMe;
