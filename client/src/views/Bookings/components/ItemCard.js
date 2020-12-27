import React from 'react';
import { HorizontalCard } from '../../../components/UIComponents'
import { BrowseLink } from '../styledComponents'
import ItemContent from './ItemContent'

const Item = ({ t, data, bookingType, renderActionButtons, status }) => {

  const { id, urlId } = data;

  const profileUrl =
    bookingType === 'sitting_jobs'
      ? `/profile/catowner/${urlId}`
      : `/profile/catsitter/${urlId}`;

  const _renderActionButtons = () => {
    switch (status) {
      case 'requested':
        return renderActionButtons(id)
      case 'confirmed':
        return renderActionButtons(id, data.hasPaid)
      case 'completed':
        return renderActionButtons(data, data.hasWrittenReview)
      default:
        break;
    }
  }

  return (
    <HorizontalCard variant="bookings">
      <div style={{ display: 'inline-block', position: 'absolute', right: 0, marginTop: -10, marginRight: 15 }}>
        <BrowseLink to={profileUrl}>
          <i className="fas fa-user-circle fa-xs mr-2" />
        </BrowseLink>
        <BrowseLink>
          <i className="fas fa-envelope fa-xs" />
        </BrowseLink>
      </div>

      <ItemContent t={t} data={data} imageContainerVariant="bookings" />

      {renderActionButtons && _renderActionButtons()}
    </HorizontalCard>
  );
};

export default Item;
