import React from 'react';
import styled from 'styled-components'
import { NotFound, VerticalCard, WrapLayout } from '../../../components/UIComponents'

import Summary from './Summary';
import Reviews from '../components/Reviews';
import AboutMe from '../components/AboutMe';
import AboutCat from './AboutCat';
import Location from '../components/Location';
import Responsibilities from './Responsibilities';

import { useCatOwnerProfile } from '../viewModel';

const Section = styled.div`
  margin: 0 0 30px 0;
`;

function CatOwner() {
  const {
    t,
    returnedData,
    reviewListRef,
    scrollToRef,
    profileError
  } = useCatOwnerProfile();

  const {
    reviews,
    aboutMe,
    cat,
    catsDescription,
    coordinates,
    urlId
  } = returnedData || {}

  return (
    <>
      {profileError && <NotFound />}

      {!profileError && returnedData &&
        <WrapLayout variant="profile">
          <VerticalCard variant="profileDetails">

            {Array.isArray(reviews) &&
              reviews.length > 0 &&
              <>
                <Section>
                  <h5 ref={reviewListRef} style={{ marginBottom: 15 }}>
                    {t('owner_profile.feedback')} ({reviews.length})
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
              <h5>{t('owner_form.about_me')}</h5>
              <AboutMe aboutMe={aboutMe} />
            </Section>

            <hr />

            <Section>
              <h5>{t('owner_form.about_cat')}</h5>
              <AboutCat t={t} allCats={cat} />
            </Section>

            <hr />

            <Section>
              <h5>{t('owner_form.responsibilities')}</h5>
              <Responsibilities descriptions={catsDescription} />
            </Section>

            <hr />

            <Section>
              <h5>{t('owner_profile.location')}</h5>
              <Location coordinates={coordinates} urlId={urlId} />
            </Section>

          </VerticalCard>

          <Summary t={t} ownerInfo={returnedData} />
        </WrapLayout>
      }
    </>
  );
}

export default CatOwner;