import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

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

function ProfileStats({
  type = "sitter",
  totalReviews,
  totalCompletedBookings,
  totalRepeatedCustomers
}) {
  const { t } = useTranslation();
  const isProfilePage = window.location.pathname.includes('profile');

  return (
    <>
      <div style={{ marginRight: 10, visibility: totalReviews > 0 ? 'visible' : 'hidden' }}>
        {fiveStarDisplay(totalReviews)}
      </div>

      {isProfilePage ?
        <>
          {totalCompletedBookings > 0 &&
            <div style={{ color: '#00C68E', marginRight: 10 }}>
              <i className="far fa-calendar-alt mr-2" />
              <span>
                {totalCompletedBookings} {t('find_sitter.completed_bookings')}
              </span>
            </div>
          }

          {totalRepeatedCustomers > 0 &&
            <div style={{ color: '#00C68E' }}>
              <i className="fas fa-redo-alt mr-2" />
              <span>
                {totalRepeatedCustomers} {type === 'sitter' ? t('find_sitter.repeated_customers') : 'sitters\' repeated customer '}
              </span>
            </div>
          }
        </>
        :
        <>
          <div style={{ color: '#00C68E', marginRight: 10, visibility: totalCompletedBookings > 0 ? 'visible' : 'hidden' }}>
            <i className="far fa-calendar-alt mr-2" />
            <span>
              {totalCompletedBookings} {t('find_sitter.completed_bookings')}
            </span>
          </div>

          <div style={{ color: '#00C68E', visibility: totalRepeatedCustomers > 0 ? 'visible' : 'hidden' }}>
            <i className="fas fa-redo-alt mr-2" />
            <span>
              {totalRepeatedCustomers} {type === 'sitter' ? t('find_sitter.repeated_customers') : 'sitters\' repeated customer '}
            </span>
          </div>
        </>
      }
    </>
  )
}

export default ProfileStats

ProfileStats.propTypes = {
  type: PropTypes.string.isRequired,
  totalReviews: PropTypes.number.isRequired,
  totalCompletedBookings: PropTypes.number.isRequired,
  totalRepeatedCustomers: PropTypes.number.isRequired
};