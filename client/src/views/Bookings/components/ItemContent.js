import React from 'react';
import {
  DateDisplay,
  Image,
  ImageContainer,
  TimeDisplay
} from '../../../components/UIComponents';
import { Field, FieldLabel, FieldItem } from '../styledComponents';
import defaultProfilePic from '../../../assets/images/default_profile_pic.jpg';

function ItemContent({ t, data, bookingType, imageContainerVariant }) {
  const {
    appointmentType,
    location,
    price,
    date,
    startTime,
    endTime,
    startDate,
    endDate,
    owner,
    sitter
  } = data || {};

  const reviewee = bookingType === 'sitting_jobs' ? owner : sitter;
  const { user } = reviewee || {}
  const { firstName, lastName, profilePicture } = user || {};

  const imgUrl = profilePicture ? `${process.env.REACT_APP_API_DOMAIN}/image/${profilePicture}` : defaultProfilePic

  return (
    <div style={{ display: 'flex', marginTop: 15, marginBottom: 15 }}>
      <ImageContainer variant={imageContainerVariant}>
        <Image url={imgUrl} />
      </ImageContainer>

      <div style={{ width: '80%', display: 'flex', flexDirection: 'column' }}>
        <Field style={{ marginBottom: 10 }}>
          <FieldLabel>{t('bookings.time')}</FieldLabel>
          {data && appointmentType === 'oneDay' ? (
            <FieldItem>
              <DateDisplay date={date} />
              <TimeDisplay startTime={startTime} endTime={endTime} />
            </FieldItem>
          ) : (
              <FieldItem>
                <DateDisplay date={startDate} />
                <div style={{ width: 10, height: 4, background: 'grey', margin: '0 10px', alignSelf: 'center' }} />
                <DateDisplay date={endDate} />
              </FieldItem>
            )}
        </Field>

        <Field>
          <FieldLabel>
            {bookingType === 'sitting_jobs' ? t('bookings.owner') : t('bookings.sitter')}
          </FieldLabel>
          <FieldItem>{firstName} {lastName && lastName.charAt(0)}</FieldItem>
        </Field>

        <Field>
          <FieldLabel>{t('bookings.location')}</FieldLabel>
          <FieldItem>{location}</FieldItem>
        </Field>

        <Field>
          <FieldLabel>{t('bookings.price')}</FieldLabel>
          <FieldItem>€ {price}, 00</FieldItem>
        </Field>
      </div>
    </div>
  )
}

export default ItemContent