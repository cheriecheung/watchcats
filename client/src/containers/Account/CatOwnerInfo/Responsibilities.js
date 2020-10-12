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
          Explain the responsibilities of the cat sitter, e.g. what is expected of him / her when
          taking care of your cat(s)? What are some things to pay attention to?
      </p>
      </Col>
      <Col md={6}>
        <TextArea
          name="catsDescription"
          placeholder={t('owner_form.cat_description_text')}
        />
      </Col>
    </Row>
  );
}

export default Responsibilities;
