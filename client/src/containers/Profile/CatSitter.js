import React, { useState, useEffect, useRef } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { List } from 'antd';
import Review from './Review';
import {
  ContentContainer,
  ImageContainer,
  SectionContainer,
  SummaryCard,
} from '../../components/ProfileComponents';
import ThemeButton from '../../components/General/ThemeButton';
import DayPicker from 'react-day-picker';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSitterProfile } from '../../_actions/accountActions';
import { getChatContacts, getChatConversation } from '../../_actions/chatActions';
import { getAppointmentTime, sendBookingRequest } from '../../_actions/bookingActions';
import GoogleMap from '../../components/GoogleMap';
import moment from 'moment';
import RequestModal from './RequestModal';

const allReviews = [];
for (let i = 0; i < 23; i++) {
  allReviews.push({ id: i, name: `User ${i}` });
}

const allLocations = { id: 1, name: 'Cat Owner #1', lat: 52.3449, lng: 4.8766 };

function CatSitter() {
  const { id } = useParams();
  const reviewListRef = useRef(null);
  const dispatch = useDispatch();
  const { data: sitterData } = useSelector((state) => state.account);
  const { error: errorType } = useSelector((state) => state.booking);

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  const [sitterInfo, setSitterInfo] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log({ errorType });
  }, [errorType]);

  useEffect(() => {
    if (id) {
      dispatch(getSitterProfile(id));

      // show 'does not exist' message if no profile with such id
      console.log({ id });
    }
  }, [id]);

  useEffect(() => {
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

  useEffect(() => {
    if (modalVisible) {
      dispatch(getAppointmentTime());
    }
  }, [modalVisible]);

  const handleSendMessage = () => {
    dispatch(getChatContacts);
    dispatch(getChatConversation);
  };

  const handleSendRequest = () => {
    const bookingDetails = {
      sitterId: id,
      location: 'Amsterdam Zuid',
      time: { startDate: moment('12-12-2020'), endDate: moment('12-12-2020') },
      price: 26,
    };

    dispatch(sendBookingRequest(bookingDetails));
  };

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
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  onChange: () => scrollToRef(reviewListRef),
                  pageSize: 3,
                }}
                dataSource={allReviews}
                renderItem={({ name }) => <Review name={name} />}
              />
            </SectionContainer>

            <hr />

            <SectionContainer>
              <h5>About</h5>
              <p>{sitterInfo.aboutSitter}</p>
            </SectionContainer>

            <hr />

            <SectionContainer>
              <h5>Experience</h5>
              <p>{sitterInfo.experience}</p>
            </SectionContainer>

            {sitterInfo.hasCat && <h5>Owns / owned a cat</h5>}
            {sitterInfo.hasVolunteered && <h5>Has done volunteer work</h5>}
            {sitterInfo.hasMedicationSkills && <h5>Able to administer medication</h5>}
            {sitterInfo.hasInjectionSkills && <h5>Able to do injections</h5>}
            {sitterInfo.hasCertification && <h5>Has pet sitting certification</h5>}
            {sitterInfo.hasGroomingSkills && <h5>Has pet grooming skills</h5>}

            <hr />

            <SectionContainer>
              <h5>Availability</h5>
              <AvailabilityCalendar unavailableDates={sitterInfo.unavailableDates} />
            </SectionContainer>

            <hr />

            <SectionContainer>
              <h5>Location</h5>
              {/* <GoogleMap
                mapHeight="45vh"
                allLocations={allLocations}
                defaultCenter={{ lat: 52.3667, lng: 4.8945 }}
              /> */}
            </SectionContainer>
          </div>

          <SummaryCard
            style={{
              flexBasis: '35%',
              maxHeight: 400,
              position: 'sticky',
              top: 20,
            }}
          >
            <h4>
              {sitterInfo.firstName} {sitterInfo.lastName}
            </h4>
            <ImageContainer>
              <img
                src="https://images.pexels.com/photos/569170/pexels-photo-569170.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="pic"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </ImageContainer>

            <hr />
            <h6>Verified</h6>
            <hr />

            <span style={{ display: 'flex' }}>
              <h5>€ {sitterInfo.priceOneTime} </h5>per day
            </span>

            <span style={{ display: 'flex' }}>
              <h5>€ {sitterInfo.priceOvernight}</h5> per night
            </span>

            <ThemeButton onClick={handleSendMessage}>Send message</ThemeButton>
            <ThemeButton onClick={() => setModalVisible(true)}>Send request</ThemeButton>

            <RequestModal
              modalVisible={modalVisible}
              closeModal={() => setModalVisible(false)}
              error={errorType}
              // appointmentTime={appointmentTime}
              handleSendRequest={handleSendRequest}
            />
          </SummaryCard>
        </ContentContainer>
      </div>
    </div>
  );
}

function AvailabilityCalendar({ unavailableDates }) {
  return (
    <>
      <DayPicker disabledDays={{ before: new Date() }} selectedDays={unavailableDates} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div className="calendar-available-date-box" />
        <span>Available</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginLeft: 50,
        }}
      >
        <div className="calendar-unavailable-date-box" />
        <span>Unavailable</span>
      </div>
    </>
  );
}

function ImageSlider() {
  return (
    <Carousel interval={null} className="m-0">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.pinimg.com/originals/e0/3b/e0/e03be0d9ea0f716eb57f9dfe3e27c4c6.jpg"
          height="400"
          alt="First slide"
          style={{ objectFit: 'contain' }}
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          height="400"
          src="https://cdn.sortra.com/wp-content/uploads/2016/11/pumpkin-the-cat000.jpg"
          alt="Third slide"
          style={{ objectFit: 'contain' }}
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          height="400"
          src="https://image.freepik.com/free-photo/cute-golden-british-shorthair-cat-floor_43518-12.jpg"
          alt="Third slide"
          style={{ objectFit: 'contain' }}
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CatSitter;
