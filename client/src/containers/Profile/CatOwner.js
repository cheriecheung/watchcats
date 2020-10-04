import React, { useState, useEffect, useRef } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {
  ContentContainer,
  FieldLabel,
  ImageContainer,
  InfoField,
  SectionContainer,
  SummaryCard,
} from '../../components/ProfileComponents';
import ThemeButton from '../../components/General/ThemeButton';
import { List } from 'antd';
import Review from './Review';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOwnerProfile } from '../../_actions/profileActions';
import GoogleMap from '../../components/GoogleMap';
import moment from 'moment';

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
              <p>{ownerInfo.aboutMe}</p>
            </SectionContainer>

            <hr />

            <SectionContainer>
              <h5>About my cat</h5>
              <AboutMyCats allCats={ownerInfo.cat} />
            </SectionContainer>

            <hr />

            <SectionContainer>
              <h5>Responsibility</h5>
              <p>{ownerInfo.catsDescription}</p>
            </SectionContainer>

            <hr />

            <SectionContainer>
              <h5>Location</h5>
              {/* <GoogleMap
                mapHeight="45vh"
                allLocations={allLocations}
                defaultCenter={{ lat: 52.3449, lng: 4.8766 }}
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
              {ownerInfo.firstName} {ownerInfo.lastName}
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

            <h6>Sitter needed:</h6>
            <AppointmentTime
              oneDay={ownerInfo.bookingOneDay}
              overnight={ownerInfo.bookingOvernight}
            />
          </SummaryCard>
        </ContentContainer>
      </div>
    </div>
  );
}

export default CatOwner;

function AboutMyCats({ allCats }) {
  console.log({ allCats });
  return (
    Array.isArray(allCats) &&
    allCats.length > 0 &&
    allCats.map((cat) => {
      const {
        _id: id,
        name,
        age,
        gender,
        medicalNeeds,
        isVaccinated,
        isInsured,
        breed,
        personality,
        favouriteTreat,
      } = cat;

      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
          key={id}
        >
          <ImageContainer>
            <img
              src="https://i.pinimg.com/originals/f8/69/2b/f8692b4dde8249b26719f91e076aa8ab.jpg"
              alt="pic"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </ImageContainer>

          <div style={{ flexBasis: '70%', display: 'flex', flexWrap: 'wrap' }}>
            <InfoField>
              <FieldLabel>Name</FieldLabel>
              <span>{name}</span>
            </InfoField>
            <InfoField>
              <FieldLabel>Age</FieldLabel>
              <span>{age}</span>
            </InfoField>

            <InfoField>
              <FieldLabel>Gender</FieldLabel>
              <div>
                <i className="fas fa-mars fa-2x icon-gender" />
                <span>{gender === 'F' ? 'Female' : 'Male'}</span>
              </div>
            </InfoField>
            <InfoField>
              <FieldLabel>Medical needs</FieldLabel>
              <div>
                {Array.isArray(medicalNeeds) && medicalNeeds.length > 0 ? (
                  medicalNeeds.map((need) => (
                    <div key={need}>
                      <i className="fas fa-times fa-2x icon-yes-no" />
                      <span>{need}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <i className="fas fa-times fa-2x icon-yes-no" />
                    <span>None</span>
                  </>
                )}
              </div>
            </InfoField>

            <InfoField>
              <FieldLabel>Vaccinated</FieldLabel>
              {isVaccinated ? (
                <div>
                  <i className="fas fa-check fa-2x icon-yes-no" />
                  <span>Yes</span>
                </div>
              ) : (
                <div>
                  <i className="fas fa-times fa-2x icon-yes-no" />
                  <span>No</span>
                </div>
              )}
            </InfoField>
            <InfoField>
              <FieldLabel>Insured</FieldLabel>
              {isInsured ? (
                <div>
                  <i className="fas fa-check fa-2x icon-yes-no" />
                  <span>Yes</span>
                </div>
              ) : (
                <div>
                  <i className="fas fa-times fa-2x icon-yes-no" />
                  <span>No</span>
                </div>
              )}
            </InfoField>

            <InfoField>
              <FieldLabel>Breed</FieldLabel>
              <span>{breed.label}</span>
            </InfoField>
            <InfoField>
              <FieldLabel>Personality</FieldLabel>
              <span>{personality.label}</span>
            </InfoField>

            <InfoField>
              <FieldLabel>Favorite treat</FieldLabel>
              <span>{favouriteTreat}</span>
            </InfoField>
          </div>
        </div>
      );
    })
  );
}

function AppointmentTime({ oneDay, overnight }) {
  return (
    <>
      {Array.isArray(oneDay) && oneDay.length > 0 && (
        <>
          <h6>One-day appointment: </h6>

          {oneDay.map(({ id, date, endTime, startTime }) => {
            const dateConverted = moment(date).format('DD MMM YYYY');
            const startTimeObj = moment(startTime).format('HH:mm');
            const endTimeObj = moment(endTime).format('HH:mm');

            return (
              <span style={{ display: 'flex' }} key={id}>
                <h5>
                  {dateConverted}, {startTimeObj} - {endTimeObj}
                </h5>
              </span>
            );
          })}
        </>
      )}

      {Array.isArray(overnight) && overnight.length > 0 && (
        <>
          <h6>Overnight appointment: </h6>

          {overnight.map(({ id, startDate, endDate }) => {
            const startDateConverted = moment(startDate, 'YYYY-MM-DD').format('DD MMM YYYY');
            const endDateConverted = moment(endDate, 'YYYY-MM-DD').format('DD MMM YYYY');

            return (
              <span style={{ display: 'flex' }} key={id}>
                <h5>
                  {startDateConverted} - {endDateConverted}
                </h5>
              </span>
            );
          })}
        </>
      )}
    </>
  );
}
