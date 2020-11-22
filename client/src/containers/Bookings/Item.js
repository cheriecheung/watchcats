import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { HorizontalCard, Image, ImageContainer } from '../../components/UIComponents'

const Field = styled.tr`
  display: flex;
`

const FieldLabel = styled.td`
  width: 30%;
  margin-bottom: 0;
  font-weight: bold;

  text-overflow: ellipsis;
  white-space: nowrap;
`

const FieldItem = styled.td`
  width: 65%;
`

const BrowseLink = styled(Link)`
  font-size: 25px;
  color: #ffa195;
`

const Item = ({ data, bookingType, renderActionButtons, status }) => {
  const { t } = useTranslation();

  useEffect(() => {
    console.log({ data });
  }, [data]);

  const { id, name, shortId, appointmentType, location, price } = data;
  const profileUrl =
    bookingType === 'sitting_jobs'
      ? `/profile/catowner/${shortId}`
      : `/profile/catsitter/${shortId}`;

  const formattedDate = (date) => moment(date).format('DD MMM YYYY');
  const formattedTime = (time) => moment(time).format('HH:mm');

  return (
    <HorizontalCard variant="bookings">
      <div style={{ display: 'inline-block', position: 'absolute', right: 0, marginTop: -10, marginRight: 15 }}>
        <BrowseLink>
          <i className="fas fa-user-circle fa-xs mr-2" />
        </BrowseLink>
        <BrowseLink>
          <i className="fas fa-envelope fa-xs" />
        </BrowseLink>
      </div>

      <div style={{ display: 'flex', marginTop: 15, marginBottom: 15 }}>
        <ImageContainer variant="bookings">
          <Image url="https://images.pexels.com/photos/569170/pexels-photo-569170.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
        </ImageContainer>

        <div style={{ width: '80%' }}>
          <Field>
            <FieldLabel>{bookingType === 'sitting_jobs' ? t('bookings.owner') : t('bookings.sitter')}</FieldLabel>
            <FieldItem>{name}</FieldItem>
          </Field>

          <Field>
            <FieldLabel>{t('bookings.location')}</FieldLabel>
            <FieldItem>{location}</FieldItem>
          </Field>

          <Field>
            <FieldLabel>{t('bookings.time')}</FieldLabel>
            {appointmentType === 'oneDay' ? (
              <FieldItem>
                {formattedDate(data.date)}, {formattedTime(data.startTime)} -
                {formattedTime(data.endTime)}
              </FieldItem>
            ) : (
                <FieldItem>
                  {formattedDate(data.startDate)} - {formattedDate(data.endDate)}
                </FieldItem>
              )}
          </Field>

          <Field>
            <FieldLabel>{t('bookings.price')}</FieldLabel>
            <FieldItem>€ {price}, 00</FieldItem>
          </Field>
        </div>
      </div>


      {status === 'requested' && renderActionButtons && renderActionButtons(id)}
      {status === 'confirmed' && renderActionButtons && renderActionButtons(id, data.hasPaid)}
      {status === 'completed' && renderActionButtons && renderActionButtons(id, data.hasWrittenReview)}
    </HorizontalCard>
  );
};

export default Item;
