import React from 'react';
import styled from 'styled-components'
import { VerticalCard, WrapLayout } from '../../../components/UIComponents'

import Summary from './Summary';
import Reviews from '../Common/Reviews';
import AboutMe from '../Common/AboutMe';
import Experience from './Experience';
import AvailabilityCalendar from './AvailabilityCalendar';
import Location from '../Common/Location';

import { useCatSitterProfile, useCatSitterSummary } from '../viewModel'

const Section = styled.div`
  margin: 50px 0;
`;

function CatSitter() {
  const { cleanedData, reviewListRef, scrollToRef, id } = useCatSitterProfile();
  const summaryProps = useCatSitterSummary();

  return (
    <WrapLayout style={{ padding: '30px 60px', textAlign: 'left' }}>
      <VerticalCard style={{ flexBasis: '60%' }}>
        {cleanedData &&
          cleanedData.reviews &&
          cleanedData.reviews.length > 0 &&
          <>
            <Section>
              <h5 ref={reviewListRef} style={{ paddingTop: 15, marginBottom: 15 }}>
                Reviews ({cleanedData.reviews.length})
              </h5>
              <Reviews reviews={cleanedData.reviews} crollToRef={scrollToRef} reviewListRef={reviewListRef} />
            </Section>
            <hr />
          </>
        }

        <Section>
          <h5>About</h5>
          <AboutMe aboutMe={cleanedData.aboutSitter} />
        </Section>

        <hr />

        <Section>
          <h5>Experience</h5>
          <Experience sitterInfo={cleanedData} />
        </Section>

        <hr />

        <Section>
          <h5>Availability</h5>
          <AvailabilityCalendar unavailableDates={cleanedData.unavailableDates} />
        </Section>

        <hr />

        <Section>
          <h5>Location</h5>
          <Location />
        </Section>
      </VerticalCard>

      <Summary summaryProps={summaryProps} sitterInfo={cleanedData} />
    </WrapLayout>
  );
}

export default CatSitter;