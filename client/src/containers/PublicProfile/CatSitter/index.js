import React from 'react';
import { ContentContainer, SectionContainer } from '../../../components/ProfileComponents';
import styled from 'styled-components'

import Summary from './Summary';
import Reviews from '../Common/Reviews';
import AboutMe from '../Common/AboutMe';
import Experience from './Experience';
import AvailabilityCalendar from './AvailabilityCalendar';
import Location from '../Common/Location';

import { useCatSitterProfile, useCatSitterSummary } from '../viewModel'

const DetailsContainer = styled.div`
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05);
  background: #fff;
  border-radius: 10px;
  padding: 10px 20px;
`;

function CatSitter() {
  const { cleanedData, reviewListRef, scrollToRef, id } = useCatSitterProfile();
  const summaryProps = useCatSitterSummary();

  console.log({ cleanedData })

  return (
    <div style={{ padding: '30px 60px' }}>
      <div style={{ textAlign: 'left' }}>
        <ContentContainer>
          <div style={{ flexBasis: '60%', marginBottom: 100 }}>
            <DetailsContainer>
              {cleanedData &&
                cleanedData.reviews &&
                cleanedData.reviews.length > 0 &&
                <>
                  <SectionContainer>
                    <h5 ref={reviewListRef} style={{ paddingTop: 15, marginBottom: 15 }}>
                      Reviews ({cleanedData.reviews.length})
              </h5>
                    <Reviews reviews={cleanedData.reviews} crollToRef={scrollToRef} reviewListRef={reviewListRef} />
                  </SectionContainer>
                  <hr />
                </>
              }

              <SectionContainer>
                <h5>About</h5>
                <AboutMe aboutMe={cleanedData.aboutSitter} />
              </SectionContainer>

              <hr />

              <SectionContainer>
                <h5>Experience</h5>
                <Experience sitterInfo={cleanedData} />
              </SectionContainer>

              <hr />

              <SectionContainer>
                <h5>Availability</h5>
                <AvailabilityCalendar unavailableDates={cleanedData.unavailableDates} />
              </SectionContainer>

              <hr />

              <SectionContainer>
                <h5>Location</h5>
                <Location />
              </SectionContainer>
            </DetailsContainer>
          </div>

          <Summary summaryProps={summaryProps} sitterInfo={cleanedData} />
        </ContentContainer>
      </div>
    </div>
  );
}

export default CatSitter;