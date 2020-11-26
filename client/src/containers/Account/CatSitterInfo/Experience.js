import React from 'react';
import { Checkbox, TextArea } from '../../../components/FormComponents';
import { CheckSquareIcon } from '../../../components/UIComponents'

function Experience({ t, experienceData }) {
  const {
    hasCat,
    hasCertification,
    hasGroomingSkills,
    hasInjectionSkills,
    hasMedicationSkills,
    hasVolunteered
  } = experienceData;

  return (
    <>
      <p style={{ margin: '20px 0 30px 0' }}>{t('sitter_form.experience_description')}</p>
      {/* <Row> */}
      <div className="sitter-skills">
        <Checkbox name="hasCat">
          <i className="fas fa-cat profile-data-icon" />
          <span style={{ alignSelf: 'center' }}>{t('sitter_form.has_cat')}</span>
          <CheckSquareIcon isShown={hasCat} />
        </Checkbox>
        <Checkbox name="hasVolunteered">
          <i className="fas fa-hand-holding-heart profile-data-icon" />
          <span style={{ alignSelf: 'center' }}>{t('sitter_form.volunteer')}</span>
          <CheckSquareIcon isShown={hasVolunteered} />
        </Checkbox>
        <Checkbox name="hasMedicationSkills">
          <i className="fas fa-pills profile-data-icon" />
          <span style={{ alignSelf: 'center' }}>{t('sitter_form.medication')}</span>
          <CheckSquareIcon isShown={hasMedicationSkills} />
        </Checkbox>
        <Checkbox name="hasInjectionSkills">
          <i className="fas fa-syringe profile-data-icon" />
          <span style={{ alignSelf: 'center' }}>{t('sitter_form.injection')}</span>
          <CheckSquareIcon isShown={hasInjectionSkills} />
        </Checkbox>
        <Checkbox name="hasCertification">
          <i className="fas fa-award profile-data-icon" />
          <span style={{ alignSelf: 'center' }}>{t('sitter_form.certificate')}</span>
          <CheckSquareIcon isShown={hasCertification} />
        </Checkbox>
        <Checkbox name="hasGroomingSkills">
          <i className="fas fa-cut profile-data-icon" />
          <span style={{ alignSelf: 'center' }}>{t('sitter_form.grooming')}</span>
          <CheckSquareIcon isShown={hasGroomingSkills} />
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
