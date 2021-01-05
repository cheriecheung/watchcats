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

  console.log({ profileError })

  return (
    <>
      {profileError && <NotFound />}

      {!profileError && cleanedData &&
        <WrapLayout variant="profile">
          <VerticalCard variant="profileDetails">
            {reviews && reviews.length > 0 &&
              <>
                <Section style={{ margin: 0 }}>
                  <h5 ref={reviewListRef} style={{ paddingTop: 15, marginBottom: 15 }}>
                    {t('sitter_profile.feedback')} ({reviews.length})
                  </h5>
                  <Reviews
                    reviews={reviews}
                    scrollToRef={scrollToRef}
                    reviewListRef={reviewListRef}
                  />
                </Section>
                <hr />
              </>
            }

            <Section>
              <h5>{t('sitter_form.about_me')}</h5>
              <AboutMe aboutMe={aboutSitter} />
            </Section>

            <hr />

            <Section>
              <h5>{t('sitter_form.experience')}</h5>
              <Experience t={t} sitterInfo={cleanedData} />
            </Section>

            <hr />

            <Section>
              <h5>{t('sitter_form.availability')}</h5>
              <AvailabilityCalendar t={t} unavailableDates={unavailableDates} />
            </Section>

            <hr />

            <Section style={{ margin: 0 }}>
              <h5>{t('sitter_profile.location')}</h5>
              <Location coordinates={coordinates} urlId={urlId} />
            </Section>
          </VerticalCard>

          <Summary
            t={t}
            summaryProps={summaryProps}
            sitterInfo={cleanedData}
          />
        </WrapLayout>
      }
    </>
  );
}

export default CatSitter;