import React from 'react';
import { ContentContainer, SectionContainer } from '../../../components/ProfileComponents';

import Summary from './Summary';
import ImageSlider from './ImageSlider';
import Reviews from '../Common/Reviews';
import AboutMe from '../Common/AboutMe';
import Experience from './Experience';
import AvailabilityCalendar from './AvailabilityCalendar';
import Location from '../Common/Location';

import { useCatSitterProfile, useCatSitterSummary } from '../viewModel'

function CatSitter() {
  const { cleanedData, reviewListRef, scrollToRef, id } = useCatSitterProfile();
  const summaryProps = useCatSitterSummary();

  return (
    <div style={{ padding: '30px 60px', textAlign: 'left' }}>
      <ContentContainer>
        <div style={{ flexBasis: '60%', marginBottom: 100 }}>
          <ImageSlider />

          <SectionContainer>
            <h5 ref={reviewListRef} style={{ paddingTop: 15, marginBottom: 15 }}>
              Reviews(10)
              </h5>
            <Reviews scrollToRef={scrollToRef} reviewListRef={reviewListRef} />
          </SectionContainer>

          <hr />

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
        </div>

        <Summary summaryProps={summaryProps} sitterInfo={cleanedData} />
      </ContentContainer>
    </div>
  );
}

export default CatSitter;