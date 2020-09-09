import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Rate } from 'antd';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { TextArea } from '../../components/FormComponents';

const Label = styled.label`
  margin-right: 15px;
`;

const defaultValues = {
  profileAccuracy: 0,
  communication: 0,
  treatmentOfAnimals: 0,
  review: '',
};

function ReviewModalContent() {
  const methods = useForm({ defaultValues });
  const { register, handleSubmit, watch, reset } = methods;

  const onSubmit = (data) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ textAlign: 'left' }}>
          <h5>Rate & Review</h5>
          <br />
          <h6>Describe your experience</h6>
          <p>Your review will be public on the cat sitter's profile</p>
        </div>
        <TextArea name="review" rows={6} />

        <div>
          <Label>Profile accuracy</Label>
          <Rate onChange={(value) => console.log({ value })} />
        </div>
        <div>
          <Label>Communication</Label>
          <Rate />
        </div>
        <div>
          <Label>Treatment of animals</Label>
          <Rate />
        </div>
      </form>
    </FormProvider>
  );
}

export default ReviewModalContent;
