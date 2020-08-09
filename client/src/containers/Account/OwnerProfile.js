import React from 'react';
import { Row, Col, Label, Input } from 'reactstrap';
import styled from 'styled-components';
import { DatePicker } from 'antd';

const Section = styled.div`
  text-align: left;
  margin-bottom: 40px;
`;

function OwnerProfile() {
  return (
    <>
      <Section>
        <h5>About me and my house</h5>

        <Row>
          <Col md={6} className="mb-3">
            <Input
              type="textarea"
              placeholder="Tell cat sitters about yourself. Start with a little description of yourself and your house - which neighbourhood do you live in? Why are you looking for a cat sitter?"
              rows="10"
              style={{ resize: 'none' }}
            />
          </Col>
          <Col md={6} className="mb-3">
            <p>
              To let cat sitters get an idea of where they will be cat sitting,
              you can upload pictures of your place.
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
      </Section>

      <Section>
        <h5>Cat sitting period</h5>
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
      </Section>

      <Section>
        <h5>About my cat</h5>
        <Row>
          <Col md={6} className="mb-3">
            <Label>Name</Label>
            <Input type="text" />
          </Col>
          <Col md={6} className="mb-3">
            <Label>Date of birth</Label>
            <Input type="text" />
          </Col>
          <Col md={6} className="mb-3">
            <Label>Gender</Label>
            <Input type="text" />
          </Col>
          <Col md={6} className="mb-3">
            <Label>Breed</Label>
            <Input type="text" />
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
            <Label>Favorite treat</Label>
            <Input type="text" />
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
      </Section>

      <Section>
        <h5>Description of my cat(s)</h5>
        <Input
          type="textarea"
          placeholder="Please write a description about your cat(s) - include their feeing, litter, playtime routine, and other needs. It is also important to include your vets details should the cat sitter needs to get hold if them."
          rows="5"
          style={{ resize: 'none' }}
        />
      </Section>
    </>
  );
}

export default OwnerProfile;
