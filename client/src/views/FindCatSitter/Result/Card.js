import React from 'react';
import { HorizontalCard, HorizontalDivider, Image, ImageContainer, LinkButton, ProfileStats } from '../../../components/UIComponents';
import defaultProfilePic from '../../../assets/images/default_profile_pic.jpg'
import { ContentContainer } from '../styledComponents'

function Card({ screenWidth, t, item, setHoveredResultId }) {
  const {
    urlId,
    firstName,
    lastName,
    profilePicture,
    // distance,
    hourlyRate,
    nightlyRate,
    totalReviews,
    totalCompletedBookings,
    totalRepeatedCustomers,
    aboutSitter,
  } = item;

  const profilePicURL = profilePicture ? `${process.env.REACT_APP_API_DOMAIN}/image/${profilePicture}` : defaultProfilePic

  const renderDescription = (wordCount) => (
    <>
      <HorizontalDivider />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '85%', height: '50px', overflow: 'hidden' }}>
          {aboutSitter.slice(0, wordCount).trim().replace(/("[^"]+"|\w+)$/, "...")}
        </div>

        <LinkButton to={`/profile/catsitter/${urlId}`}
          style={{
            width: '15%',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <i className="fas fa-search-plus"
            style={{
              fontSize: 20,
              alignSelf: 'center',
              color: '#7e7e7e'
            }}
          />
        </LinkButton>
      </div>
    </>
  )

  return (
    <HorizontalCard
      variant="findCatSitter"
      hover
      onMouseOver={() => setHoveredResultId(urlId)}
      onMouseLeave={() => setHoveredResultId('')}
    >
      <div style={{ display: 'flex' }}>
        <ImageContainer variant="findCatSitter">
          <Image url={profilePicURL} />
        </ImageContainer>

        <ContentContainer>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <h5>{firstName} {lastName && lastName.charAt(0)}</h5>

            <div style={{ float: 'right' }}>
              <span>&euro;	{hourlyRate} {t('find_sitter.per_hour')}</span>
              <br />
              <span>&euro;	{nightlyRate} {t('find_sitter.per_night')}</span>
            </div>
          </div>

          <ProfileStats
            totalReviews={totalReviews}
            totalCompletedBookings={totalCompletedBookings}
            totalRepeatedCustomers={totalRepeatedCustomers}
          />

          {screenWidth > 600 && renderDescription(110)}
        </ContentContainer>
      </div>

      {screenWidth < 600 && renderDescription(100)}
    </HorizontalCard>
  );
}

export default Card;
