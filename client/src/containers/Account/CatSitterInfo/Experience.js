import React from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, TextArea } from '../../../components/FormComponents';

function Experience() {
  const { t } = useTranslation();

  return (
    <>
      <p style={{ margin: '20px 0 30px 0' }}>{t('sitter_form.experience_description')}</p>
      {/* <Row> */}
      <div className="sitter-skills">
        <Checkbox name="hasCat">
          <span>{t('sitter_form.has_cat')}</span>
        </Checkbox>
        <Checkbox name="hasVolunteered">
          <span>{t('sitter_form.volunteer')}</span>
        </Checkbox>
        <Checkbox name="hasMedicationSkills">
          <span>{t('sitter_form.medication')}</span>
        </Checkbox>
        <Checkbox name="hasInjectionSkills">
          <span>{t('sitter_form.injection')}</span>
        </Checkbox>
        <Checkbox name="hasCertification">
          <span>{t('sitter_form.certificate')}</span>
        </Checkbox>
        <Checkbox name="hasGroomingSkills">
          <span>{t('sitter_form.grooming')}</span>
        </Checkbox>
      </div>

      {/* <Col md={12}>  */}
      <TextArea
        name="experience"
        placeholder="Tell cat owners about your service. What type of services can you offer as a cat sitter? Why should a cat sitter invite you to take care of their cats?"
      />
      {/* </Col> */}
      {/* </Row> */}
    </>
  );
}

export default Experience;
