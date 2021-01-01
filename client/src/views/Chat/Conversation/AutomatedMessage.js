import React from 'react';
import { formatDate, formatTime } from '../../../utility'
import { HorizontalCard } from '../../../components/UIComponents'
import {
  Field,
  FieldLabel,
  FieldItem,
  DefaultAutoMessageStyle,
  AlternateAutoMessageStyle
} from '../styledComponents'

function AutomatedMessage({ t, message, conversationInfo }) {
  const generateMessage = (data, user) => {
    switch (data) {
      case 'AUTOMATED_MESSAGE/BOOKING_REQUESTED':
        return (
          <DefaultAutoMessageStyle>
            { `A booking request is made by ${user}`}
          </DefaultAutoMessageStyle>
        )
      case 'AUTOMATED_MESSAGE/BOOKING_CONFIRMED':
        return (
          <AlternateAutoMessageStyle>
            <i className="fas fa-check fa-xs mr-2" />
            {`Booking is accepted by ${user}`}
          </AlternateAutoMessageStyle>
        )
      case 'AUTOMATED_MESSAGE/BOOKING_DECLINED':
        return `Booking has been declined by ${user}`
      case 'AUTOMATED_MESSAGE/BOOKING_COMPLETED':
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <AlternateAutoMessageStyle>
              <i className="fas fa-check-double fa-xs mr-2" />
              {`Booking is marked as completed by ${user}`}
            </AlternateAutoMessageStyle>

            <DefaultAutoMessageStyle
              style={{ display: 'inline-block', margin: '20px auto 10px auto' }}
            >
              <i className="fas fa-pencil-alt fa-xs mr-2" />
              Reminder - Leave a review
            </DefaultAutoMessageStyle>
          </div>
        )
      default:
        break;
    }
  }

  console.log({ message, conversationInfo })
  const { sender: currentUser } = conversationInfo || {}
  const { id: currentUserId } = currentUser

  const { booking, content, createdAt, sender } = message || {}
  const {
    type,
    date,
    startTime,
    endTime,
    startDate,
    endDate,
    location,
    price,
    owner,
    sitter
  } = booking || {}

  const actionMaker = content === 'AUTOMATED_MESSAGE/BOOKING_REQUESTED' ? owner : sitter
  const user = currentUserId === sender ? 'you' : actionMaker

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <span style={{ opacity: 0.6, fontSize: '0.8rem' }}>
          {formatDate(createdAt, 'DD MMM YYYY')}
        </span>
      </div>
      <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center' }}>
        {generateMessage(content, user)}
      </div>

      {content === 'AUTOMATED_MESSAGE/BOOKING_REQUESTED' &&
        <HorizontalCard variant="chat">
          <FieldLabel>Booking information</FieldLabel>

          <Field style={{ marginTop: 5 }}>
            <FieldLabel>{t('bookings.type')}</FieldLabel>
            <FieldItem>
              {type === 'oneDay' ?
                t('bookings.one_day_appointment') :
                t('bookings.overnight_appointment')
              }
            </FieldItem>
          </Field>

          <Field>
            <FieldLabel>{t('bookings.time')}</FieldLabel>
            {type === 'oneDay' ? (
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
            <FieldLabel>{t('bookings.location')}</FieldLabel>
            <FieldItem>{location}</FieldItem>
          </Field>

          <Field>
            <FieldLabel>{t('bookings.price')}</FieldLabel>
            <FieldItem>€ {price}, 00</FieldItem>
          </Field>
        </HorizontalCard>
      }
    </>
  );
}

export default AutomatedMessage