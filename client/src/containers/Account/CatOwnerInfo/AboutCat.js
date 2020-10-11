import React from 'react';
import { Row, Col } from 'reactstrap';
import {
  CheckboxGroup,
  FieldLabel,
  RadioButton,
  RadioGroup,
  SelectField,
  TextField,
} from '../../../components/FormComponents';
import { useTranslation } from 'react-i18next';
import { catBreedOptions, personalityOptions, medicineOptions } from '../../../constants';
import { catObj } from '../_defaultValues'

const color = '#252525';

function AboutCat({ watch, catFieldArray }) {
  const { t } = useTranslation();
  const { fields, append, remove } = catFieldArray;

  const handleRemoveCat = (index) => {
    if (window.confirm('Click Ok to confirm to remove cat record')) {
      remove(index);
    }
  };

  return (
    <>
      {fields.map((item, index) => {
        return (
          <div
            key={item.id}
            style={{
              background: index % 2 !== 0 ? 'rgba(168, 165, 165, 0.05)' : 'none',
              padding: '20px 20px 0 20px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h6 hidden={index === 0} style={{ color, fontWeight: 800 }}>
                And my #{index + 1} cat
              </h6>
              <button
                type="button"
                hidden={index === 0}
                onClick={() => handleRemoveCat(index)}
                style={{
                  marginBottom: 10,
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  float: 'right',
                  color: '#ffa195',
                }}
              >
                {t('owner_form.remove')}
              </button>
            </div>

            <Row>
              <Col md={6} className="mb-4">
                <FieldLabel>{t('owner_form.name')}</FieldLabel>
                <TextField name={`cat[${index}].name`} />
              </Col>
              <Col md={6} className="mb-4" style={{ marginBottom: 30 }}>
                <FieldLabel>{t('owner_form.age')}</FieldLabel>
                <TextField name={`cat[${index}].age`} />
              </Col>

              <Col md={6} className="mb-4">
                <FieldLabel>{t('owner_form.gender')}</FieldLabel>
                <br />
                <RadioGroup name={`cat[${index}].gender`}>
                  <RadioButton value="M">
                    <i className="fas fa-mars fa-2x icon-gender" />
                    <span>{t('owner_form.male')}</span>
                  </RadioButton>
                  <RadioButton value="F">
                    <i className="fas fa-venus fa-2x icon-gender" />
                    <span>{t('owner_form.female')}</span>
                  </RadioButton>
                </RadioGroup>
              </Col>
              <Col md={6} className="mb-4">
                <FieldLabel>{t('owner_form.medical_needs')}</FieldLabel>
                <br />
                <CheckboxGroup name={`cat[${index}].medicalNeeds`} options={medicineOptions} />
              </Col>

              <Col md={6} className="mb-4">
                <FieldLabel>{t('owner_form.vaccinated')}</FieldLabel>
                <br />
                <RadioGroup name={`cat[${index}].isVaccinated`}>
                  <RadioButton value={true}>
                    <i className="fas fa-check fa-2x icon-yes-no" />
                    <span>{t('owner_form.yes')}</span>
                  </RadioButton>
                  <RadioButton value={false}>
                    <i className="fas fa-times fa-2x icon-yes-no" />
                    <span>{t('owner_form.no')}</span>
                  </RadioButton>
                </RadioGroup>
              </Col>
              <Col md={6} className="mb-4">
                <FieldLabel>{t('owner_form.insured')}</FieldLabel>
                <br />
                <RadioGroup name={`cat[${index}].isInsured`}>
                  <RadioButton value={true}>
                    <i className="fas fa-check fa-2x icon-yes-no" />
                    <span>{t('owner_form.yes')}</span>
                  </RadioButton>
                  <RadioButton value={false}>
                    <i className="fas fa-times fa-2x icon-yes-no" />
                    <span>{t('owner_form.no')}</span>
                  </RadioButton>
                </RadioGroup>
              </Col>

              <Col md={6} className="mb-4">
                <FieldLabel>{t('owner_form.breed')}</FieldLabel>
                <SelectField name={`cat[${index}].breed`} options={catBreedOptions} />
              </Col>
              <Col md={6} className="mb-4">
                <FieldLabel>Personality that fits your cat the best</FieldLabel>
                <SelectField name={`cat[${index}].personality`} options={personalityOptions} />
              </Col>

              <Col md={6} className="mb-3">
                <FieldLabel>{t('owner_form.favourite_treat')}</FieldLabel>
                <TextField name={`cat[${index}].favouriteTreat`} />
              </Col>
              <Col md={6} className="mb-3">
                <FieldLabel>{t('owner_form.pictures')} (max. 3)</FieldLabel>
                <br />
                <label htmlFor="file-upload" className="upload-file-input form-control">
                  <i className="fas fa-upload" style={{ opacity: 0.4, marginRight: 10 }} />
                  <span>{t('owner_form.upload')}</span>
                </label>
                <input id="file-upload" type="file" />
              </Col>
            </Row>

            <hr hidden={watch('cat').length === 1} style={{ margin: '20px 0 0 0' }} />
          </div>
        );
      })}

      <button
        type="button"
        hidden={watch('cat').length > 4}
        className="add-field-btn"
        onClick={() => append(catObj)}
        style={{
          // background: '#ffecea',
          color: '#ffa195',
          outline: 'none',
          border: 'none',
          borderRadius: 15,
          padding: 20,
        }}
      >
        <i className="fas fa-plus mr-1" />
        {t('owner_form.add_cat')}
      </button>

      <span hidden={watch('cat').length <= 4}>
        If you have 5 or more cats, perhaps you would want to consider having them stay at a pet
        hotel, so they can all be taken care of by full time staff!
      </span>
    </>
  );
}

export default AboutCat;
