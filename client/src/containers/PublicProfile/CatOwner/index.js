import React from 'react';
import styled from 'styled-components'

import Summary from './Summary';
import Reviews from '../Common/Reviews';
import AboutMe from '../Common/AboutMe';
import AboutCat from './AboutCat';
import Location from '../Common/Location';
import Responsibilities from './Responsibilities';

import { useCatOwnerProfile } from '../viewModel';

const allReviews = [];
for (let i = 0; i < 7; i++) {
  allReviews.push({ id: i, name: `User ${i}` });
}

const ContentContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 700px) {
    flex-direction: column-reverse;
  }
`;


const SectionContainer = styled.div`
  margin: 50px 0;
`;

const DetailsContainer = styled.div`
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05);
  background: #fff;
  border-radius: 10px;
  padding: 10px 20px;
`;

function CatOwner() {
  const { returnedData, reviewListRef, scrollToRef } = useCatOwnerProfile();

  return (
    <div style={{ padding: '30px 60px' }}>
      <div style={{ textAlign: 'left' }}>
        <ContentContainer>
          <div style={{ flexBasis: '60%', marginBottom: 100 }}>
            <DetailsContainer>

              {returnedData &&
                returnedData.reviews &&
                returnedData.reviews.length > 0 &&
                <>
                  <SectionContainer>
                    <h5 ref={reviewListRef} style={{ paddingTop: 15, marginBottom: 15 }}>
                      Reviews ({returnedData.reviews.length})
                   </h5>
                    <Reviews reviews={returnedData.reviews} scrollToRef={scrollToRef} reviewListRef={reviewListRef} />
                  </SectionContainer>
                  <hr />
                </>
              }

              <SectionContainer>
                <h5>About</h5>
                <AboutMe aboutMe={returnedData.aboutMe} />
              </SectionContainer>

              <hr />

              <SectionContainer>
                <h5>About my cat</h5>
                <AboutCat allCats={returnedData.cat} />
              </SectionContainer>

              <hr />

              <SectionContainer>
                <h5>Responsibility</h5>
                <Responsibilities descriptions={returnedData.catsDescription} />
              </SectionContainer>

              <hr />

              <SectionContainer>
                <h5>Location</h5>
                <Location />
              </SectionContainer>

            </DetailsContainer>
          </div>

          <Summary ownerInfo={returnedData} />
        </ContentContainer>
      </div>
    </div>
  );
}

export default CatOwner;