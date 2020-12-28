import React from 'react';
import { RateField, TextArea } from '../../../components/FormComponents';
import {
  ContainedButton,
  HorizontalCard,
  Modal,
  ModalSuccessDisplay
} from '../../../components/UIComponents'
import { MainContainer } from '../styledComponents'
import { useWriteReview } from '../viewModel'
import ItemContent from '../components/ItemContent'

function WriteReview() {
  const { t, FormProvider, methods, onSubmit, bookingInfo, showModal, closeModal } = useWriteReview();
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
