import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Container = styled.div`
  @media (max-width: 450px) {
    ${({ isResponsive }) => isResponsive && `
      & > div > span {
        font-size: 13px;
      }

      & > div > span {
        font-size: 13px;
      }

      & > div:first-child > i {
        font-size: 10px;
      }
    `}
  }
`

function ProfileStats({
  type,
  totalReviews,
  totalCompletedBookings,
  totalRepeatedCustomers,
  isResponsive
}) {
  const { t } = useTranslation();

  return (
    <Container isResponsive={isResponsive}>
      <div style={{ marginRight: 10, visibility: totalReviews > 0 ? 'visible' : 'hidden' }}>
        <i className="fas fa-star icon-sort-review" />
        <i className="fas fa-star icon-sort-review" />
        <i className="fas fa-star icon-sort-review" />
        <i className="fas fa-star icon-sort-review" />
        <i className="fas fa-star icon-sort-review" />
        <span className="ml-1">
          {totalReviews} {totalReviews === 1 ? 'Review' : 'Reviews'}
        </span>
      </div>

      {totalCompletedBookings === 0 &&
        <div style={{ color: '#00C68E' }}>
          <i className="fas fa-user-plus fa-xs mr-1" />
          {t('find_sitter.new_member')}
        </div>
      }

      <div style={{ color: '#00C68E', marginRight: 10, visibility: totalCompletedBookings > 0 ? 'visible' : 'hidden' }}>
        <i className="far fa-calendar-alt mr-2" />
        <span>
          {totalCompletedBookings} {t('find_sitter.total_completed_bookings')}
        </span>
      </div>

      {totalRepeatedCustomers > 0 &&
        <div style={{ color: '#00C68E' }}>
          <i className="fas fa-redo-alt mr-2" />
          <span>
            {totalRepeatedCustomers} {type === 'sitter' ? t('find_sitter.total_repeated_customers') : 'sitters\' repeated customer '}
          </span>
        </div>
      }
    </Container>
  )
}

export default ProfileStats;

ProfileStats.propTypes = {
  type: PropTypes.string,
  totalReviews: PropTypes.number.isRequired,
  totalCompletedBookings: PropTypes.number.isRequired,
  totalRepeatedCustomers: PropTypes.number.isRequired,
  isResponsive: PropTypes.bool
};

ProfileStats.defaultProps = {
  type: 'sitter',
  isResponsive: undefined
};