import React, { useState, useEffect, useRef } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { ContentContainer, SectionContainer } from '../../../components/ProfileComponents';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOwnerProfile } from '../../../redux/actions/profileActions';

import Summary from './Summary';
import Reviews from '../Common/Reviews';
import AboutMe from '../Common/AboutMe';
import AboutCat from './AboutCat';
import Location from '../Common/Location';
import Responsibilities from './Responsibilities';

const allReviews = [];
for (let i = 0; i < 7; i++) {
  allReviews.push({ id: i, name: `User ${i}` });
}

const allLocations = { id: 1, name: 'Cat Owner #1', lat: 52.3449, lng: 4.8766 };

function CatOwner() {
  const { id } = useParams();
  const reviewListRef = useRef(null);
  const dispatch = useDispatch();
  const { data: ownerData } = useSelector((state) => state.profile);

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  const [ownerInfo, setOwnerInfo] = useState({});

  useEffect(() => {
    if (id && dispatch) {
      dispatch(getOwnerProfile(id));

      // show 'does not exist' message if no profile with such id
      console.log({ id });
    }
  }, [id]);

  useEffect(() => {
    if (ownerData) {
      console.log({ ownerData });

      setOwnerInfo(ownerData);
    }
  }, [ownerData]);

  return (
    <div style={{ padding: '30px 60px' }}>
      <div style={{ textAlign: 'left' }}>
        <ContentContainer>
          <div style={{ flexBasis: '60%', marginBottom: 100 }}>
            {/* <ImageSlider /> */}

            <SectionContainer>
              <h5 ref={reviewListRef} style={{ paddingTop: 15, marginBottom: 15 }}>
                Reviews(10)
              </h5>
              <Reviews scrollToRef={scrollToRef} reviewListRef={reviewListRef} />
            </SectionContainer>

            <hr />

            <SectionContainer>
              <h5>About</h5>
              <AboutMe aboutMe={ownerInfo.aboutMe} />
            </SectionContainer>

            <hr />

            <SectionContainer>
              <h5>About my cat</h5>
              <AboutCat allCats={ownerInfo.cat} />
            </SectionContainer>

            <hr />

            <SectionContainer>
              <h5>Responsibility</h5>
              <Responsibilities descriptions={ownerInfo.catsDescription} />
            </SectionContainer>

            <hr />

            <SectionContainer>
              <h5>Location</h5>
              <Location />
            </SectionContainer>
          </div>

          <Summary ownerInfo={ownerInfo} />
        </ContentContainer>
      </div>
    </div>
  );
}

export default CatOwner;
