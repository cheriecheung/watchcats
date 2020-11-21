import React from 'react';
import { Row, Col } from 'reactstrap';
import { TextArea } from '../../../components/FormComponents';
import { useTranslation } from 'react-i18next';

function Responsibilities() {
  const { t } = useTranslation();

  return (
    <Row>
      <Col md={6}>
        <p>
          {t('owner_form.cat_description_text')}
        </p>
      </Col>
      <Col md={6}>
        <TextArea name="catsDescription" />
      </Col>
    </Row>
  );
}

export default Responsibilities;
