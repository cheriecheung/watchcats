import React, { useEffect, useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import { catBreedOptions, personalityOptions, medicineOptions } from '../../../constants';
import { catObj } from '../_defaultValues'
import { useDispatch, useSelector } from 'react-redux';
import { removeCatPhoto } from '../../../redux/actions/accountActions';

const color = '#252525';

function AboutCat({ setValue, watch, catFieldArray }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { catPhotoRemoved, ownerData } = useSelector((state) => state.account);

  const { fields, append, remove } = catFieldArray;

  const [photoFields, setPhotoFields] = useState([])
  const [removePhotoIndex, setRemovePhotoIndex] = useState('')

  useEffect(() => {
    if (ownerData) {
      const { cat } = ownerData
      const allPhotoFields = cat.map(({ photo }, index) => photo);

      setPhotoFields(allPhotoFields);
    }
  }, [ownerData]);

  const handleRemoveCat = (index) => {
    if (window.confirm('Click Ok to confirm to remove cat record')) {
      remove(index);
    }
  };

  const handlePreview = (data, index) => {
    let updateFields = [...photoFields];
    updateFields[index] = data
    setPhotoFields(updateFields)
  }

  useEffect(() => {
    // provide fail response
    if (catPhotoRemoved) {
      setValue(`cat[${removePhotoIndex}].photo`, null)

      let updateFields = [...photoFields];
      updateFields[removePhotoIndex] = null;
      setPhotoFields(updateFields)
    }
  }, [catPhotoRemoved])

  const handleRemovePhoto = (fileName, index) => {
    setRemovePhotoIndex(index);

    if (fileName.includes('base64')) {
      setValue(`cat[${index}].photo`, null)

      let updateFields = [...photoFields];
      updateFields[index] = null
      setPhotoFields(updateFields)
    } else {
      dispatch(removeCatPhoto(fileName, index))
    }
  }

  return (
    <>
      {fields.map(({ id }, index) => {
        return (
          <div
            key={id}
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

            <div>
              {/* <FieldLabel>{t('owner_form.pictures')}</FieldLabel> */}
              <br />
              {photoFields[index] ?
                <FileDisplayField
                  name={`cat[${index}].photo`}
                  fileName={photoFields[index]}
                  handleRemovePhoto={() => handleRemovePhoto(photoFields[index], index)}
                />
                :
                <ArrayFileUploader
                  name={`cat[${index}].photo`}
                  //id={`cat[${index}].photo`}
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
          color: '#5FBB96',
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