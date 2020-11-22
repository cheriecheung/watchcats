import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import {
  CheckboxGroup,
  FieldLabel,
  FileDisplayField,
  ArrayFileUploader,
  RadioButton,
  RadioGroup,
  SelectField,
  TextField,
} from '../../../components/FormComponents';
import { TextButton } from '../../../components/UIComponents'
import { useTranslation } from 'react-i18next';
import { catBreedOptions, personalityOptions, medicineOptions } from '../../../constants';
import { catObj } from '../_defaultValues'

const color = '#252525';

function AboutCat({ setValue, watch, catFieldArray, catProps }) {

  const { t } = useTranslation();
  const { fields, append, remove } = catFieldArray;
  const cat = watch('cat')

  const { photoFields, handlePreview, catPhotoRemoved, removePhotoIndex, handleRemovePhoto } = catProps;

  const handleRemoveCat = (index) => {
    if (window.confirm('Click Ok to confirm to remove cat record')) {
      remove(index);
    }
  };

  useEffect(() => {
    // provide fail response
    if (catPhotoRemoved) {
      setValue(`cat[${removePhotoIndex}].photo`, null)
    }
  }, [catPhotoRemoved])

  return (
    <>
      {fields.map(({ id }, index) => {
        return (
          <div key={id}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h6 hidden={index === 0} style={{ color, fontWeight: 800 }}>
                And my #{index + 1} cat
              </h6>
              <TextButton
                hidden={index === 0}
                onClick={() => handleRemoveCat(index)}
                style={{ float: 'right', color: '#ffa195' }}
              >
                {t('owner_form.remove')}
              </TextButton>
            </div>

            <div>
              <br />
              {photoFields[index] ?
                <FileDisplayField
                  name={`cat[${index}].photo`}
                  fileName={photoFields[index]}
                  handleRemovePhoto={() => {
                    handleRemovePhoto(photoFields[index], index)
                    if (photoFields[index].includes('base64')) {
                      setValue(`cat[${index}].photo`, null)
                    }
                  }}
                />
                :
                <ArrayFileUploader
                  name={`cat[${index}].photo`}
                  fileType="image/x-png,image/jpeg"
                  setFileData={(data) => setValue(`cat[${index}].photo`, data)}
                  setDisplayPreview={(data) => handlePreview(data, index)}
                />
              }
            </div>

            <br />

            <Row>
              <Col md={6} className="mb-4">
                <FieldLabel>{t('owner_form.name')}</FieldLabel>
                <TextField name={`cat[${index}].name`} />
              </Col>
              <Col md={6} className="mb-4" style={{ marginBottom: 30 }}>
                <FieldLabel>{t('owner_form.age')}</FieldLabel>
                <TextField name={`cat[${index}].age`} type="number" />
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
            </Row>

            <hr hidden={cat && cat.length === 1} style={{ margin: '20px 0 0 0' }} />
          </div>
        );
      })}

      <TextButton
        hidden={cat && cat.length > 4}
        onClick={() => append(catObj)}
        style={{ color: '#5FBB96' }}
      >
        <i className="fas fa-plus mr-1" />
        {t('owner_form.add_cat')}
      </TextButton>

      <span hidden={cat && cat.length <= 4}>
        If you have 5 or more cats, perhaps you would want to consider having them stay at a pet
        hotel, so they can all be taken care of by full time staff!
      </span>
    </>
  );
}

export default AboutCat;