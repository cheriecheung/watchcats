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
  margin: 30px 0;
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
      {profileError && <NotFound variant="profile" />}

      {!profileError && returnedData &&
        <WrapLayout variant="profile">
          <VerticalCard variant="profileDetails">

            {reviews && reviews.length > 0 &&
              <>
                <Section>
                  <h5 ref={reviewListRef} style={{ paddingTop: 15, marginBottom: 15 }}>
                    Reviews ({reviews.length})
                   </h5>
                  <Reviews reviews={reviews} scrollToRef={scrollToRef} reviewListRef={reviewListRef} />
                </Section>
                <hr />
              </>
            }

            <Section>
              <h5>About</h5>
              <AboutMe aboutMe={aboutMe} />
            </Section>

            <hr />

            <Section>
              <h5>About my cat</h5>
              <AboutCat allCats={cat} />
            </Section>

            <hr />

            <Section>
              <h5>Responsibility</h5>
              <Responsibilities descriptions={catsDescription} />
            </Section>

            <hr />

            <Section>
              <h5>Location</h5>
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