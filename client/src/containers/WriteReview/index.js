import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Rate } from 'antd';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { SectionContainer, TextArea } from '../../components/FormComponents';

const Label = styled.label`
  font-size: 1.2rem;
  margin-right: 15px;
`;

const defaultValues = {
  profileAccuracy: 0,
  communication: 0,
  treatmentOfAnimals: 0,
  review: '',
};

function WriteReview() {
  const methods = useForm({ defaultValues });
  const { register, handleSubmit, watch, reset } = methods;

  const onSubmit = (data) => console.log(data);

  return (
    <div style={{ width: '70vw', margin: '20px auto 0 auto' }}>
      <SectionContainer>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'left' }}>
            <div>
              <h5>Rate & Review</h5>
              <br />
              <h6>Describe your experience</h6>
              <p>Your review will be public on the reviewee's public profile</p>
            </div>
            <TextArea name="review" rows={6} />

            <br />

            <div>
              <h6>Give your rating</h6>
              <Rate onChange={(value) => console.log({ value })} />
            </div>
            {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Label>Profile accuracy</Label>
          <span>
            Are the cat sitter's skills and service aligned with what being portrayed in his / her
            profile?
          </span>
          <Rate onChange={(value) => console.log({ value })} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Label>Communication</Label>
          <span>
            How clearly did the cat sitter communicate the appointment details and concerns?
          </span>
          <span></span>
          <Rate />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Label>Treatment of animals</Label>
          <span>How well did the cat sitter take care of your cat(s)?</span>
          <Rate />
        </div> */}
          </form>
        </FormProvider>
      </SectionContainer>
    </div>
  );
}

export default WriteReview;
