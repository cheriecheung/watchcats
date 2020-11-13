import React from 'react';
import { ContentContainer, SectionContainer } from '../../../components/ProfileComponents';
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
            {/* <ImageSlider /> */}

            <DetailsContainer>

              <SectionContainer style={{ marginTop: 0 }}>
                <h5 ref={reviewListRef} style={{ paddingTop: 15, marginBottom: 15 }}>
                  Reviews(10)
              </h5>
                <Reviews scrollToRef={scrollToRef} reviewListRef={reviewListRef} />
              </SectionContainer>

              <hr />

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