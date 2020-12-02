import React from 'react';
import { Image, ImageContainer } from '../../../components/UIComponents'
import { Field, FieldLabel, FieldItem, } from './styledComponents'
import { formatDate, formatTime } from '../../../utility'

function ItemContent({ t, data }) {
  const {
    firstName,
    lastName,
    profilePictureFileName,
    appointmentType,
    location,
    price,
    bookingType,
    date,
    startTime,
    endTime,
    startDate,
    endDate
  } = data || {};

  const imgUrl = profilePictureFileName ? `${process.env.REACT_APP_API_DOMAIN}/image/${profilePictureFileName}` : 'https://images.pexels.com/photos/569170/pexels-photo-569170.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'

  return (
    <div style={{ display: 'flex', marginTop: 15, marginBottom: 15 }}>
      <ImageContainer>
        <Image url={imgUrl} />
      </ImageContainer>

      <div style={{ width: '80%', display: 'flex', flexDirection: 'column' }}>
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
          <FieldLabel>{t('bookings.time')}</FieldLabel>
          {data && appointmentType === 'oneDay' ? (
            <FieldItem>
              {formatDate(date, 'DD MMM YYYY')}, {formatTime(startTime)} -
              {formatTime(endTime)}
            </FieldItem>
          ) : (
              <FieldItem>
                {formatDate(startDate, 'DD MMM YYYY')} - {formatDate(endDate, 'DD MMM YYYY')}
              </FieldItem>
            )}
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