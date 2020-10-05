import React from 'react';
import { FieldLabel, ImageContainer, InfoField } from '../../../components/ProfileComponents';

function AboutCat({ allCats }) {
  console.log({ allCats });
  return (
    Array.isArray(allCats) &&
    allCats.length > 0 &&
    allCats.map((cat) => {
      const {
        _id: id,
        name,
        age,
        gender,
        medicalNeeds,
        isVaccinated,
        isInsured,
        breed,
        personality,
        favouriteTreat,
      } = cat;

      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
          key={id}
        >
          <ImageContainer>
            <img
              src="https://i.pinimg.com/originals/f8/69/2b/f8692b4dde8249b26719f91e076aa8ab.jpg"
              alt="pic"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </ImageContainer>

          <div style={{ flexBasis: '70%', display: 'flex', flexWrap: 'wrap' }}>
            <InfoField>
              <FieldLabel>Name</FieldLabel>
              <span>{name}</span>
            </InfoField>
            <InfoField>
              <FieldLabel>Age</FieldLabel>
              <span>{age}</span>
            </InfoField>

            <InfoField>
              <FieldLabel>Gender</FieldLabel>
              <div>
                <i className="fas fa-mars fa-2x icon-gender" />
                <span>{gender === 'F' ? 'Female' : 'Male'}</span>
              </div>
            </InfoField>
            <InfoField>
              <FieldLabel>Medical needs</FieldLabel>
              <div>
                {Array.isArray(medicalNeeds) && medicalNeeds.length > 0 ? (
                  medicalNeeds.map((need) => (
                    <div key={need}>
                      <i className="fas fa-times fa-2x icon-yes-no" />
                      <span>{need}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <i className="fas fa-times fa-2x icon-yes-no" />
                    <span>None</span>
                  </>
                )}
              </div>
            </InfoField>

            <InfoField>
              <FieldLabel>Vaccinated</FieldLabel>
              {isVaccinated ? (
                <div>
                  <i className="fas fa-check fa-2x icon-yes-no" />
                  <span>Yes</span>
                </div>
              ) : (
                <div>
                  <i className="fas fa-times fa-2x icon-yes-no" />
                  <span>No</span>
                </div>
              )}
            </InfoField>
            <InfoField>
              <FieldLabel>Insured</FieldLabel>
              {isInsured ? (
                <div>
                  <i className="fas fa-check fa-2x icon-yes-no" />
                  <span>Yes</span>
                </div>
              ) : (
                <div>
                  <i className="fas fa-times fa-2x icon-yes-no" />
                  <span>No</span>
                </div>
              )}
            </InfoField>

            <InfoField>
              <FieldLabel>Breed</FieldLabel>
              <span>{breed.label}</span>
            </InfoField>
            <InfoField>
              <FieldLabel>Personality</FieldLabel>
              <span>{personality.label}</span>
            </InfoField>

            <InfoField>
              <FieldLabel>Favorite treat</FieldLabel>
              <span>{favouriteTreat}</span>
            </InfoField>
          </div>
        </div>
      );
    })
  );
}

export default AboutCat;
