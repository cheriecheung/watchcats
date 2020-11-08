import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Row, Col } from 'reactstrap';
import { RateField, SectionContainer, TextArea } from '../../components/FormComponents';
import styled from 'styled-components';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { review_schema } from '../Account/_validationSchema';
import { submitReview } from '../../redux/actions/bookingActions';

const Label = styled.label`
  font-size: 1.2rem;
  margin-right: 15px;
`;

const defaultValues = {
  // profileAccuracy: 0,
  // communication: 0,
  // treatmentOfAnimals: 0,
  review: '',
  rating: 0
};

const resolver = yupResolver(review_schema)

function WriteReview() {
  const dispatch = useDispatch()
  const { bookingId } = useParams();

  const methods = useForm({ defaultValues, resolver });
  const { register, handleSubmit, watch, reset } = methods;

  const onSubmit = (data) => {
    dispatch(submitReview(bookingId, data))
  };

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
              <RateField name="rating" />
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

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit">Submit</button>
            </div>
          </form>
        </FormProvider>
      </SectionContainer>
    </div>
  );
}

export default WriteReview;
