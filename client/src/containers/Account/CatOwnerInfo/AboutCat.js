import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import {
  CheckboxGroup,
  FieldLabel,
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
import { removeCatPhoto } from '../../../_actions/accountActions';
import { set } from 'date-fns/fp';

const color = '#252525';
const { REACT_APP_API_DOMAIN } = process.env;


function AboutCat({ setValue, watch, catFieldArray, getValues }) {
  const { t } = useTranslation();
  const { catPhotoRemoved, ownerData } = useSelector((state) => state.account);

  const { fields, append, remove } = catFieldArray;

  const [photoFields, setPhotoFields] = useState([])

  useEffect(() => {
    if (ownerData) {
      console.log({ watch: fields })

      const { cat } = ownerData
      const allPhotoFields = cat.map(({ photo }, index) => {

        if (photo) {
          setValue(`cat[${index}].photo`, { name: photo })
        }

        return photo
      });

      console.log({ allPhotoFields })
      setPhotoFields(allPhotoFields);
    }
  }, [ownerData]);


  const handleRemoveCat = (index) => {
    if (window.confirm('Click Ok to confirm to remove cat record')) {
      remove(index);
    }
  };

  useEffect(() => {
    if (catPhotoRemoved) {
      alert('reset cat field array photo field')
      // 1. pass index to payload in successcallback
      // 2. get index from successcallback. set value of cat[index] to empty string
      setValue('cat[0].photo', '')
    }
  }, [catPhotoRemoved])


  return (
    <>
      {fields.map((item, index) => {
        const { id, photo } = item;

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

              <Col md={6} className="mb-3">
                <FieldLabel>{t('owner_form.pictures')} (max. 3)</FieldLabel>
                <br />
                {/* {photo ? */}

                {photoFields[index] ?
                  <PictureDisplay fileName={photoFields[index]} index={index} photoFields={photoFields} setPhotoFields={setPhotoFields} setValue={setValue} name={`cat[${index}].photo`} />
                  :
                  <ArrayFileUploader
                    name={`cat[${index}].photo`}
                    id={`cat[${index}].photo`}
                    fileType="image/x-png,image/jpeg"
                    setFileData={(data) => setValue(`cat[${index}].photo`, data)}
                    setDisplayPreview={(previewData) => {
                      let updateFields = [...photoFields];
                      updateFields[index] = previewData
                      setPhotoFields(updateFields)
                    }}
                  />
                }

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

function PictureDisplay({ fileName = '', index, photoFields, setPhotoFields, setValue }) {
  const dispatch = useDispatch();

  const handleRemovePhoto = () => {
    if (fileName.includes('base64')) {
      setValue(`cat[${index}].photo`, null)

      let updateFields = [...photoFields];
      updateFields[index] = null
      setPhotoFields(updateFields)
    } else {
      dispatch(removeCatPhoto(fileName, index))
    }
  }

  const photoURL = fileName.includes('base64') ? fileName : `${REACT_APP_API_DOMAIN}/image/${fileName}`

  return (
    <>
      <div style={{ overflow: 'hidden', width: 100, height: 100 }}>
        <img
          src={photoURL}
          alt="profile_picture"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </div>
      <button
        type="button"
        style={{
          color: 'red',
          background: 'none',
          border: 'none',
          outline: 'none',
        }}
        onClick={handleRemovePhoto}
      >
        Remove
       </button>
    </>
  )
}