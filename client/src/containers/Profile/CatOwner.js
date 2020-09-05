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
import { getOwnerProfile } from '../../_actions/accountActions';
import GoogleMap from '../FindSitter/GoogleMap';

const allReviews = [];
for (let i = 0; i < 7; i++) {
  allReviews.push({ id: i, name: `User ${i}` });
}

function CatOwner() {
  const { id } = useParams();
  const reviewListRef = useRef(null);
  const dispatch = useDispatch();
  const { data: ownerData } = useSelector((state) => state.account);

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  const [ownerInfo, setOwnerInfo] = useState({});

  useEffect(() => {
    if (id) {
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
              <p>about me</p>
            </SectionContainer>

            <hr />

            <SectionContainer>
              <h5>About my cat</h5>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
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
                    <span>Cat name here</span>
                  </InfoField>
                  <InfoField>
                    <FieldLabel>Age</FieldLabel>
                    <span>6</span>
                  </InfoField>

                  <InfoField>
                    <FieldLabel>Gender</FieldLabel>
                    <div>
                      <i className="fas fa-mars fa-2x icon-gender" />
                      <span>Male</span>
                    </div>
                  </InfoField>
                  <InfoField>
                    <FieldLabel>Medical needs</FieldLabel>
                    <div>
                      <i className="fas fa-times fa-2x icon-yes-no" />
                      <span>None</span>
                    </div>
                  </InfoField>

                  <InfoField>
                    <FieldLabel>Vaccinated</FieldLabel>
                    <div>
                      <i className="fas fa-check fa-2x icon-yes-no" />
                      <span>Yes</span>
                    </div>
                  </InfoField>
                  <InfoField>
                    <FieldLabel>Insured</FieldLabel>
                    <div>
                      <i className="fas fa-check fa-2x icon-yes-no" />
                      <span>Yes</span>
                    </div>
                  </InfoField>

                  <InfoField>
                    <FieldLabel>Breed</FieldLabel>
                    <span>British shorthair</span>
                  </InfoField>
                  <InfoField>
                    <FieldLabel>Personality</FieldLabel>
                    <span>Friendly and affectionate</span>
                  </InfoField>

                  <InfoField>
                    <FieldLabel>Favorite treat</FieldLabel>
                    <span>Shrimp</span>
                  </InfoField>
                </div>
              </div>
            </SectionContainer>

            <hr />

            <SectionContainer>
              <h5>Responsibility</h5>
              <p>take care of cats</p>
            </SectionContainer>

            <hr />

            <SectionContainer>
              <h5>Location</h5>
              <GoogleMap mapHeight="50vh" />
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
            <span style={{ display: 'flex' }}>
              <h5>11 Sep 2020, 11:00 ~ 12:45</h5>
            </span>
          </SummaryCard>
        </ContentContainer>
      </div>
    </div>
  );
}

export default CatOwner;
