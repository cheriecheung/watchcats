import React from 'react';
import { RateField, TextArea } from '../../../components/FormComponents';
import { ContainedButton, HorizontalCard, Modal, SuccessDisplay } from '../../../components/UIComponents'
import { MainContainer } from '../components/styledComponents'
import { useWriteReview } from '../viewModel'
import ItemContent from '../components/ItemContent'

function WriteReview() {
  const { t, FormProvider, methods, onSubmit, booking: data, showModal, closeModal } = useWriteReview();
  const { handleSubmit } = methods;

  return (
    <MainContainer>
      <HorizontalCard style={{ width: '100%' }}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'left' }}>
            <div>
              <h5>Rate & Review</h5>
              <h6>Booking Information</h6>

              <ItemContent t={t} data={data} />

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
