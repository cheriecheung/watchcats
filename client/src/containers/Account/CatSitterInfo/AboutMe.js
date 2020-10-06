import React from 'react';
import { Row, Col } from 'reactstrap';
import { TextArea } from '../../../components/FormComponents';
import { useTranslation } from 'react-i18next';

function AboutMe() {
  const { t } = useTranslation();

  return (
    <Row>
      <Col md={6}>
        <TextArea name="aboutSitter" placeholder={t('sitter_form.about_me_description')} />
      </Col>
      <Col md={6}>
        <p>
          To let cat owners get an idea of who's sitting their cats, you can upload pictures of
          yourself.
        </p>
        {/* <Controller
                  name="photos"
                  as={
                    <Input
                      type="file"
                      style={{
                        border: '1px solid #ced4da',
                        padding: 5,
                        borderRadius: '4px',
                        marginBottom: 10,
                      }}
                    />
                  }
                  control={control}
                /> */}
      </Col>
    </Row>
  );
}

export default AboutMe;
