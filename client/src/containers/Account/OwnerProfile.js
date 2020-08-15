import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Row, Col, Label, Input } from 'reactstrap';
import {
  FormButtons,
  SectionContainer,
  SelectField,
  TextArea,
  TextField,
} from '../../components/FormComponents';
import styled from 'styled-components';
import { DatePicker } from 'antd';

const defaultValues = {
  aboutMe: '',
  photos: [],
  sittingPeriod: [],
  cat: [
    {
      name: '',
      age: '',
      gender: '',
      breed: '',
      needsMedicine: '',
      persionality: '',
      favoriteTreat: '',
      pictures: [],
    },
  ],
  descriptionCats: '',
};

function OwnerProfile() {
  const methods = useForm();
  const { register, handleSubmit, reset } = methods;

  const sendData = (data) => {
    console.log(data);
  };
  const color = '#32765d';

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(sendData)}>
          <SectionContainer>
            <h6 style={{ color, fontWeight: 800 }}>About me and my house</h6>

            <Row>
              <Col md={6}>
                <TextArea
                  name="aboutMe"
                  placeholder="Tell cat sitters about yourself. Start with a little description of yourself and your house - which neighbourhood do you live in? Why are you looking for a cat sitter?"
                />
              </Col>
              <Col md={6}>
                <p>
                  To let cat sitters get an idea of where they will be cat
                  sitting, you can upload pictures of your place.
                </p>
                <Input
                  type="file"
                  style={{
                    border: '1px solid #ced4da',
                    padding: 5,
                    borderRadius: '4px',
                    marginBottom: 10,
                  }}
                />
              </Col>
            </Row>
          </SectionContainer>

          <SectionContainer>
            <h6 style={{ color, fontWeight: 800 }}>Cat sitting appointment</h6>

            <h6 style={{ color, marginTop: 30 }}>One time visit</h6>
            <Row>
              <Col md={6} className="mb-3">
                <div className="d-flex flex-column">
                  <Label>Date</Label>
                  <DatePicker
                    showTime
                    //onChange={onChange}
                    //onOk={onOk}
                  />
                </div>
              </Col>
              <Col md={6} className="mb-3">
                <div className="d-flex flex-column">
                  <Label>Time</Label>
                  <DatePicker
                    showTime
                    //onChange={onChange}
                    //onOk={onOk}
                  />
                </div>
              </Col>
            </Row>
            <button className="add-field-btn">
              <i class="fas fa-plus mr-1" />
              Add another time
            </button>

            <h6 style={{ color, marginTop: 30 }}>Overnight visit</h6>
            <Row>
              <Col md={6} className="mb-3">
                <div className="d-flex flex-column">
                  <Label>From</Label>
                  <DatePicker
                    showTime
                    //onChange={onChange}
                    //onOk={onOk}
                  />
                </div>
              </Col>
              <Col md={6} className="mb-3">
                <div className="d-flex flex-column">
                  <Label>To</Label>
                  <DatePicker
                    showTime
                    //onChange={onChange}
                    //onOk={onOk}
                  />
                </div>
              </Col>
            </Row>
            <button className="add-field-btn">
              <i class="fas fa-plus mr-1" />
              Add another time
            </button>
          </SectionContainer>

          <SectionContainer>
            <h6 style={{ color, fontWeight: 800 }}>About my cat</h6>
            <Row>
              <Col md={6} className="mb-3">
                <TextField name="name" title="Name" />
              </Col>
              <Col md={6} className="mb-3">
                <TextField name="age" title="Age" />
              </Col>
              <Col md={6} className="mb-3">
                <TextField name="gender" title="Gender" />
              </Col>
              <Col md={6} className="mb-3">
                <TextField name="breed" title="Breed" />
              </Col>
              {/* <Col md={6} className="mb-3">
              <Label>Pet Insurance</Label>
              <Input type="text" />
            </Col> */}
              <Col md={6} className="mb-3">
                <Label>Needs Medicine</Label>
                <Input type="select">
                  <option>None</option>
                  <option>Injection</option>
                  <option>Pill</option>
                </Input>
              </Col>
              <Col md={6} className="mb-3">
                <Label>Personality that fits your cat the best</Label>
                <Input type="select">
                  <option>Select</option>
                  <option>Shy and can be easily scared</option>
                  <option>Curious and hyper</option>
                  <option>Dominant and can be aggressive</option>
                  <option>Friendly and affectionate</option>
                  <option>Solitary and calm</option>
                </Input>
              </Col>
              <Col md={6} className="mb-3">
                <TextField name="favoriteTreat" title="Favorite treat" />
              </Col>
              <Col md={6} className="mb-3">
                <Label>Pictures of your cat (max. 3)</Label>
                <Input
                  type="file"
                  style={{
                    border: '1px solid #ced4da',
                    padding: 5,
                    borderRadius: '4px',
                    marginBottom: 10,
                  }}
                />
              </Col>
            </Row>
            <button className="add-field-btn">
              <i class="fas fa-plus mr-1" />
              Add another cat
            </button>
          </SectionContainer>

          <SectionContainer>
            <h6 style={{ color, fontWeight: 800 }}>Description of my cat(s)</h6>
            <Input
              type="textarea"
              placeholder="Please write a description about your cat(s) - include their feeing, litter, playtime routine, and other needs. It is also important to include your vets details should the cat sitter needs to get hold if them."
              rows="5"
              style={{ resize: 'none' }}
            />
          </SectionContainer>

          <FormButtons onClick={() => reset(defaultValues)} />
        </form>
      </FormProvider>
    </>
  );
}

export default OwnerProfile;
