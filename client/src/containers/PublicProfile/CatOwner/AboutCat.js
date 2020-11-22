import React from 'react';
import { FieldContainer, FieldLabel } from '../../../components/FormComponents'
import { Image, ImageContainer } from '../../../components/UIComponents'
import { capitalize } from '../../../utility'
import defaultProfilePic from '../../../assets/images/default_profile_pic.jpg'

const { REACT_APP_API_DOMAIN } = process.env;

function AboutCat({ allCats }) {
  return (
    Array.isArray(allCats) &&
    allCats.length > 0 &&
    allCats.map((cat, index) => {
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
        favoriteTreat,
        photo
      } = cat;

      const pictureUrl = cat.photo ? `${REACT_APP_API_DOMAIN}/image/${cat.photo}` : defaultProfilePic

      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
          key={id}
        >
          <ImageContainer>
            <Image url={pictureUrl} />
          </ImageContainer>

          <div style={{ flexBasis: '70%', display: 'flex', flexWrap: 'wrap' }}>
            <FieldContainer>
              <FieldLabel>Name</FieldLabel>
              <span>{name}</span>
            </FieldContainer>
            <FieldContainer>
              <FieldLabel>Age</FieldLabel>
              <span>{age}</span>
            </FieldContainer>

            <FieldContainer>
              <FieldLabel>Gender</FieldLabel>
              <div>
                <i className="fas fa-mars fa-2x icon-gender profile" />
                <span>{gender === 'F' ? 'Female' : 'Male'}</span>
              </div>
            </FieldContainer>
            <FieldContainer>
              <FieldLabel>Medical needs</FieldLabel>
              <div>
                {Array.isArray(medicalNeeds) && medicalNeeds.length > 0 ? (
                  medicalNeeds.map((need) => (
                    <div key={need}>
                      <i className="fas fa-times fa-2x icon-yes-no profile" />
                      <span>{capitalize(need)}</span>
                    </div>
                  ))
                ) : (
                    <>
                      <i className="fas fa-times fa-2x icon-yes-no profile" />
                      <span>None</span>
                    </>
                  )}
              </div>
            </FieldContainer>

            <FieldContainer>
              <FieldLabel>Vaccinated</FieldLabel>
              {isVaccinated ? (
                <div>
                  <i className="fas fa-check fa-2x icon-yes-no profile" />
                  <span>Yes</span>
                </div>
              ) : (
                  <div>
                    <i className="fas fa-times fa-2x icon-yes-no profile" />
                    <span>No</span>
                  </div>
                )}
            </FieldContainer>
            <FieldContainer>
              <FieldLabel>Insured</FieldLabel>
              {isInsured ? (
                <div>
                  <i className="fas fa-check fa-2x icon-yes-no profile" />
                  <span>Yes</span>
                </div>
              ) : (
                  <div>
                    <i className="fas fa-times fa-2x icon-yes-no profile" />
                    <span>No</span>
                  </div>
                )}
            </FieldContainer>

            <FieldContainer>
              <FieldLabel>Breed</FieldLabel>
              {/* <span>{breed.label}</span> */}
            </FieldContainer>
            <FieldContainer>
              <FieldLabel>Personality</FieldLabel>
              {/* <span>{personality.label}</span> */}
            </FieldContainer>

            <FieldContainer>
              <FieldLabel>Favorite treat</FieldLabel>
              <span>{favoriteTreat}</span>
            </FieldContainer>
          </div>
        </div>
      );
    })
  );
}

export default AboutCat;
