import React from 'react';
import { FieldContainer, FieldLabel } from '../../../components/FormComponents'
import { Image, ImageContainer, WrapLayout } from '../../../components/UIComponents'
import { capitalize } from '../../../utility'

function AboutCat({ t, allCats }) {
  return (
    Array.isArray(allCats) &&
    allCats.length > 0 &&
    allCats.map((cat, index) => {
      const {
        _id: id,
        name,
        age,
        gender,
        needsInjection,
        needsPill,
        isVaccinated,
        isInsured,
        breed,
        personality,
        favoriteTreat,
        photo
      } = cat;

      return (
        <WrapLayout
          key={id}
          variant="catInfo"
          style={{ marginBottom: index + 1 === allCats.length ? 0 : 30 }}
        >
          <ImageContainer>
            <Image url={photo} />
          </ImageContainer>

          <br />

          <div style={{ flexBasis: '70%', display: 'flex', flexWrap: 'wrap' }}>
            <FieldContainer>
              <FieldLabel>{t('owner_form.name')}</FieldLabel>
              <span>{name}</span>
            </FieldContainer>
            <FieldContainer>
              <FieldLabel>{t('owner_form.age')}</FieldLabel>
              <span>{age}</span>
            </FieldContainer>

            <FieldContainer>
              <FieldLabel>{t('owner_form.gender')}</FieldLabel>
              <div>
                <i className="fas fa-mars fa-2x icon-gender profile" />
                <span>
                  {gender === 'F' ?
                    t('owner_form.female') :
                    t('owner_form.male')
                  }
                </span>
              </div>
            </FieldContainer>
            <FieldContainer>
              <FieldLabel>{t('owner_form.medical_needs')}</FieldLabel>
              <div>
                {!needsInjection &&
                  !needsPill &&
                  <span>{t('owner_form.none')}</span>
                }

                {needsInjection &&
                  <>
                    <i className="fas fa-syringe fa-2x profile" />
                    <span>{t('owner_form.injection')}</span>
                  </>}

                {needsPill &&
                  <>
                    <i className="fas fa-pills fa-2x profile" />
                    <span>{t('owner_form.pill')}</span>
                  </>}
              </div>
            </FieldContainer>

            <FieldContainer>
              <FieldLabel>{t('owner_form.vaccinated')}</FieldLabel>
              {isVaccinated ? (
                <div>
                  <i className="fas fa-check fa-2x icon-yes-no profile" />
                  <span>{t('owner_form.yes')}</span>
                </div>
              ) : (
                  <div>
                    <i className="fas fa-times fa-2x icon-yes-no profile" />
                    <span>{t('owner_form.no')}</span>
                  </div>
                )}
            </FieldContainer>
            <FieldContainer>
              <FieldLabel>{t('owner_form.insured')}</FieldLabel>
              {isInsured ? (
                <div>
                  <i className="fas fa-check fa-2x icon-yes-no profile" />
                  <span>{t('owner_form.yes')}</span>
                </div>
              ) : (
                  <div>
                    <i className="fas fa-times fa-2x icon-yes-no profile" />
                    <span>{t('owner_form.no')}</span>
                  </div>
                )}
            </FieldContainer>

            <FieldContainer>
              <FieldLabel>{t('owner_form.breed')}</FieldLabel>
              {/* <span>{breed.label}</span> */}
            </FieldContainer>
            <FieldContainer>
              <FieldLabel>{t('owner_form.personality')}</FieldLabel>
              {/* <span>{personality.label}</span> */}
            </FieldContainer>

            <FieldContainer style={{ marginBottom: 0 }}>
              <FieldLabel>{t('owner_form.favourite_treat')}</FieldLabel>
              <span>{favoriteTreat}</span>
            </FieldContainer>
          </div>
        </WrapLayout>
      );
    })
  );
}

export default AboutCat;
