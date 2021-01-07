import React from 'react';
import { RateField, TextArea } from '../../components/FormComponents';
import {
  ContainedButton,
  HorizontalCard,
  Modal,
  ModalSuccessDisplay
} from '../../components/UIComponents'
import { useWriteReview } from './viewModel'
import ItemContent from '../Bookings/components/ItemContent'
import styled from 'styled-components';

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

function WriteReview() {
  const {
    t,
    FormProvider,
    methods,
    onSubmit,
    bookingInfo,
    showModal,
    closeModal
  } = useWriteReview();
  const { handleSubmit } = methods;

  return (
    <MainContainer>
      <HorizontalCard style={{ width: '100%' }}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'left' }}>
            <div>
              <h5>{t('review.title')}</h5>
              <h6>{t('review.booking_information')}</h6>

              <ItemContent t={t} data={bookingInfo} />

              <hr />

              <br />
              <h6>{t('review.describe_experience')}</h6>
              <p>{t('review.reminder')}</p>
            </div>
            <TextArea name="review" rows={6} />

            <br />

            <div>
              <h6>{t('review.give_rating')}</h6>
              <RateField name="rating" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <ContainedButton type="submit">
                {t('form.submit')}
              </ContainedButton>
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
        <ModalSuccessDisplay message={t('success.review')} onClick={closeModal} />
      </Modal>
    </MainContainer>
  );
}

export default WriteReview;
