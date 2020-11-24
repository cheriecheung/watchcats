import React from 'react';
import { HorizontalCard, HorizontalDivider, Image, ImageContainer, LinkButton } from '../../../components/UIComponents';
import defaultProfilePic from '../../../assets/images/default_profile_pic.jpg'

const fiveStarDisplay = (number) => {
  return (
    <>
      <i className="fas fa-star icon-sort-review" />
      <i className="fas fa-star icon-sort-review" />
      <i className="fas fa-star icon-sort-review" />
      <i className="fas fa-star icon-sort-review" />
      <i className="fas fa-star icon-sort-review" />
      <span className="ml-1">
        {number} {number === 1 ? 'Review' : 'Reviews'}
      </span>
    </>
  );
};

function Card({ t, item, setHoveredResultId }) {

  const {
    urlId,
    firstName,
    lastName,
    profilePictureFileName,
    // distance,
    hourlyRate,
    nightlyRate,
    totalReviews,
    totalCompletedBookings,
    totalRepeatedCustomers,
    aboutSitter,
  } = item;

  const profilePicURL = profilePictureFileName ? `${process.env.REACT_APP_API_DOMAIN}/image/${profilePictureFileName}` : defaultProfilePic

  return (
    <HorizontalCard
      variant="findCatSitter"
      onMouseOver={() => setHoveredResultId(urlId)}
      onMouseLeave={() => setHoveredResultId('')}
    >
      <ImageContainer variant="findCatSitter">
        <Image url={profilePicURL} />
      </ImageContainer>

      <div style={{ flexBasis: '75%' }} >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <h5>{firstName} {lastName.charAt(0)}</h5>
          <div>
            <div>
              {/* <i className="fas fa-euro-sign icon-sort-price" /> */}
              <span>&euro;	{hourlyRate} / hour</span>
            </div>
            <div>
              {/* <i className="fas fa-euro-sign icon-sort-price" /> */}
              <span>&euro;	{nightlyRate} / night</span>
            </div>
          </div>
        </div>
        {/* <div className="mb-2">
          <span className="mr-2">Verified by: </span>
          <i className="fas fa-address-card icon-verified" />
          <i className="fas fa-home icon-verified" />
          <i className="fas fa-phone icon-verified" />
          <i className="fab fa-facebook-square icon-verified" />
        </div> */}

        <div style={{ marginTop: -15, marginRight: 10, visibility: totalReviews > 0 ? 'visible' : 'hidden' }}>
          {fiveStarDisplay(totalReviews)}
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{ color: '#00C68E', marginRight: 10, visibility: totalCompletedBookings > 0 ? 'visible' : 'hidden' }}>
            <i className="far fa-calendar-alt mr-2" />
            <span>
              {totalCompletedBookings} {t('find_sitter.completed_bookings')}
            </span>
          </div>

          <div style={{ color: '#00C68E', visibility: totalRepeatedCustomers > 0 ? 'visible' : 'hidden' }}>
            <i className="fas fa-redo-alt mr-2" />
            <span>
              {totalRepeatedCustomers} {t('find_sitter.repeated_customers')}
            </span>
          </div>
        </div>

        <HorizontalDivider />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '80%', height: '50px', overflow: 'hidden' }}>{aboutSitter.slice(0, 100).trim().replace(/("[^"]+"|\w+)$/, "...")}</div>

          <LinkButton to={`/profile/catsitter/${urlId}`} target="_blank" style={{ width: '17%' }}>
            {t('find_sitter.view_profile')}
          </LinkButton>
        </div>
      </div>
    </HorizontalCard>
  );
}

export default Card;
