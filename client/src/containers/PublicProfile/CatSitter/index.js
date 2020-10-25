import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ContentContainer, SectionContainer } from '../../../components/ProfileComponents';
import { getSitterProfile } from '../../../redux/actions/profileActions';

import Summary from './Summary';
import ImageSlider from './ImageSlider';
import Reviews from '../Common/Reviews';
import AboutMe from '../Common/AboutMe';
import Experience from './Experience';
import AvailabilityCalendar from './AvailabilityCalendar';
import Location from '../Common/Location';

function CatSitter() {
  const { id } = useParams();
  const reviewListRef = useRef(null);

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  const dispatch = useDispatch();
  const { data: sitterData } = useSelector((state) => state.profile);

  const [sitterInfo, setSitterInfo] = useState({});

  useEffect(() => {
    if (id && dispatch) {
      dispatch(getSitterProfile(id));

      // show 'does not exist' message if no profile with such id
      console.log({ id });
    }
  }, [id, dispatch]);

  useEffect(() => {
    console.log({ sitterData });

    if (sitterData) {
      console.log({ sitterData });

      const allUnavailableDates = sitterData.unavailableDates
        ? sitterData.unavailableDates.map((item) => new Date(item))
        : [];

      setSitterInfo({
        ...sitterData,
        unavailableDates: allUnavailableDates,
      });
    }
  }, [sitterData]);

  return (
    <div style={{ padding: '30px 60px' }}>
      <div style={{ textAlign: 'left' }}>
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
              <AboutMe aboutMe={sitterInfo.aboutSitter} />
            </SectionContainer>

            <hr />

            <SectionContainer>
              <h5>Experience</h5>
              <Experience sitterInfo={sitterInfo} />
            </SectionContainer>

            <hr />

            <SectionContainer>
              <h5>Availability</h5>
              <AvailabilityCalendar unavailableDates={sitterInfo.unavailableDates} />
            </SectionContainer>

            <hr />

            <SectionContainer>
              <h5>Location</h5>
              <Location />
            </SectionContainer>
          </div>

          <Summary id={id} sitterInfo={sitterInfo} />
        </ContentContainer>
      </div>
    </div>
  );
}

export default CatSitter;
