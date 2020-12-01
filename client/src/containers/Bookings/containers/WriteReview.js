import React from 'react';
import { RateField, TextArea } from '../../../components/FormComponents';
import { ContainedButton, HorizontalCard, Modal, SuccessDisplay } from '../../../components/UIComponents'
import { useWriteReview } from '../viewModel'
import styled from 'styled-components'
import moment from 'moment';

const MainContainer = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  margin: 0 auto;
  padding: 40px 0 50px 0;

  @media (max-width: 850px) {
    padding: 150px 50px 50px 50px;
    width: unset;
  }

  @media (max-width: 500px) {
    padding: 150px 4vw 50px 4vw;
  }
`

const Field = styled.tr`
  display: flex;
`

const FieldLabel = styled.td`
  width: 28%;
  margin-bottom: 0;
  font-weight: bold;

  text-overflow: ellipsis;
  white-space: nowrap;
`

const FieldItem = styled.td`
`

const formattedDate = (date) => moment(date).format('DD MMM YYYY');
const formattedTime = (time) => moment(time).format('HH:mm');

function WriteReview() {
  const { t, FormProvider, methods, onSubmit, booking: data, showModal, closeModal } = useWriteReview();
  const { handleSubmit } = methods;

  const {
    id,
    firstName,
    lastName,
    shortId,
    bookingType,
    appointmentType,
    location,
    price
  } = data;

  return (
    <MainContainer>
      <HorizontalCard style={{ width: '100%' }}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'left' }}>
            <div>
              <h5>Rate & Review</h5>

              <h6>Booking Information</h6>
              <Field>
                <FieldLabel>
                  {bookingType === 'sitting_jobs' ? t('bookings.owner') : t('bookings.sitter')}
                </FieldLabel>
                <FieldItem>{firstName} {lastName.charAt(0)}</FieldItem>
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

              <hr />

              <br />
              <h6>Describe your experience</h6>
              <p>Your review will be public on the reviewee's public profile</p>
            </div>
            <TextArea name="review" rows={6} />

            <br />

            <div>
              <h6>Give your rating</h6>
              <RateField name="rating" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <ContainedButton type="submit">Submit</ContainedButton>
            </div>
          </form>
        </FormProvider>
      </HorizontalCard>

      <Modal
        centered
        visible={showModal}
        onCancel={closeModal}
        footer={null}
      >
        <SuccessDisplay message="You have successfully submitted a review. You will now be redirected back to the booking page." onClick={closeModal} />
      </Modal>
    </MainContainer>
  );
}

export default WriteReview;
