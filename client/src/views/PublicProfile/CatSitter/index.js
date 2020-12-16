import React from 'react';
import styled from 'styled-components'
import { NotFound, VerticalCard, WrapLayout } from '../../../components/UIComponents'

import Summary from './Summary';
import Reviews from '../components/Reviews';
import AboutMe from '../components/AboutMe';
import Experience from './Experience';
import AvailabilityCalendar from './AvailabilityCalendar';
import Location from '../components/Location';

import { useCatSitterProfile, useCatSitterSummary } from '../viewModel'

const Section = styled.div`
  margin: 50px 0;
`;

function CatSitter() {
  const {
    t,
    cleanedData,
    reviewListRef,
    scrollToRef,
    id,
    profileError
  } = useCatSitterProfile();
  const summaryProps = useCatSitterSummary();

  const {
    reviews,
    aboutSitter,
    unavailableDates,
    coordinates,
    urlId
  } = cleanedData || {}

  return (
    <>
      {profileError && <NotFound variant="profile" />}

      {!profileError && cleanedData &&
        <WrapLayout style={{ padding: '30px 60px', textAlign: 'left' }}>
          <VerticalCard style={{ flexBasis: '60%' }}>
            {reviews && reviews.length > 0 &&
              <>
                <Section>
                  <h5 ref={reviewListRef} style={{ paddingTop: 15, marginBottom: 15 }}>
                    Reviews ({reviews.length})
              </h5>
                  <Reviews reviews={reviews} crollToRef={scrollToRef} reviewListRef={reviewListRef} />
                </Section>
                <hr />
              </>
            }

            <Section>
              <h5>About</h5>
              <AboutMe aboutMe={aboutSitter} />
            </Section>

            <hr />

            <Section>
              <h5>Experience</h5>
              <Experience sitterInfo={cleanedData} />
            </Section>

            <hr />

            <Section>
              <h5>Availability</h5>
              <AvailabilityCalendar t={t} unavailableDates={unavailableDates} />
            </Section>

            <hr />

            <Section>
              <h5>Location</h5>
              <Location coordinates={coordinates} urlId={urlId} />
            </Section>
          </VerticalCard>

          <Summary t={t} summaryProps={summaryProps} sitterInfo={cleanedData} />
        </WrapLayout>
      }
    </>
  );
}

export default CatSitter;