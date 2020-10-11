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
          To let cat owners get an idea of who's sitting their cats, you can upload pictures of
          yourself.
        </p>
      </Col>
      <Col md={6}>
        <TextArea name="aboutSitter" placeholder={t('sitter_form.about_me_description')} />
      </Col>
    </Row>
  );
}

export default AboutMe;
