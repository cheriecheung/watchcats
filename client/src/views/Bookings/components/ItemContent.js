import React from 'react';
import { DateDisplay, Image, ImageContainer } from '../../../components/UIComponents'
import { Field, FieldLabel, FieldItem } from '../styledComponents'
import { formatDate, formatTime } from '../../../utility'
import defaultProfilePic from '../../../assets/images/default_profile_pic.jpg'

function ItemContent({ t, data, imageContainerVariant }) {
  const {
    firstName,
    lastName,
    profilePicture,
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

  const imgUrl = profilePicture ? `${process.env.REACT_APP_API_DOMAIN}/image/${profilePicture}` : defaultProfilePic

  const dateSplit = formatDate(date, 'DD MMM YYYY').split(" ")
  const startDateSplit = formatDate(startDate, 'DD MMM YYYY').split(" ")
  const endDateSplit = formatDate(endDate, 'DD MMM YYYY').split(" ")

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
              <DateDisplay splitString={dateSplit} />

              {/* {formatDate(date, 'DD MMM YYYY')}, {formatTime(startTime)} -
              {formatTime(endTime)} */}
            </FieldItem>
          ) : (
              <FieldItem>
                <DateDisplay splitString={startDateSplit} />
                <div style={{ width: 10, height: 4, background: 'grey', margin: '0 10px', alignSelf: 'center' }} />
                <DateDisplay splitString={endDateSplit} />
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