import React from 'react';
import { Row, Col } from 'reactstrap';
import { TextArea } from '../../../components/FormComponents';

function Responsibilities({ t }) {

  return (
    <Row>
      <Col md={6}>
        <p>
          {t('owner_form.responsibilities_text')}
        </p>
      </Col>
      <Col md={6}>
        <TextArea name="catsDescription" />
      </Col>
    </Row>
  );
}

export default Responsibilities;
