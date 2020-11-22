import React from 'react';
import styled from 'styled-components'
import { VerticalCard, WrapLayout } from '../../../components/UIComponents'

import Summary from './Summary';
import Reviews from '../Common/Reviews';
import AboutMe from '../Common/AboutMe';
import AboutCat from './AboutCat';
import Location from '../Common/Location';
import Responsibilities from './Responsibilities';

import { useCatOwnerProfile } from '../viewModel';

const Section = styled.div`
  margin: 30px 0;
`;

function CatOwner() {
  const { returnedData, reviewListRef, scrollToRef } = useCatOwnerProfile();

  return (
    <WrapLayout style={{ padding: '30px 60px', textAlign: 'left' }}>
      <VerticalCard style={{ flexBasis: '60%' }}>

        {returnedData &&
          returnedData.reviews &&
          returnedData.reviews.length > 0 &&
          <>
            <Section>
              <h5 ref={reviewListRef} style={{ paddingTop: 15, marginBottom: 15 }}>
                Reviews ({returnedData.reviews.length})
                   </h5>
              <Reviews reviews={returnedData.reviews} scrollToRef={scrollToRef} reviewListRef={reviewListRef} />
            </Section>
            <hr />
          </>
        }

        <Section>
          <h5>About</h5>
          <AboutMe aboutMe={returnedData.aboutMe} />
        </Section>

        <hr />

        <Section>
          <h5>About my cat</h5>
          <AboutCat allCats={returnedData.cat} />
        </Section>

        <hr />

        <Section>
          <h5>Responsibility</h5>
          <Responsibilities descriptions={returnedData.catsDescription} />
        </Section>

        <hr />

        <Section>
          <h5>Location</h5>
          <Location />
        </Section>

      </VerticalCard>

      <Summary ownerInfo={returnedData} />
    </WrapLayout>
  );
}

export default CatOwner;