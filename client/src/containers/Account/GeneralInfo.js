import React from 'react';
import { Row, Col, Label, Input } from 'reactstrap';
import { Input as AntInput } from 'antd';
import styled from 'styled-components';

const Section = styled.div`
  text-align: left;
  margin-bottom: 40px;
`;

const SummarySection = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: left;
  margin-bottom: 50px;
  padding: 15px 20px;
`;

function GeneralInfo() {
  return (
    <>
      <SummarySection>
        <span>Account creation date: 10 August 2019</span>
        <span>Account status: Not verified</span>
        <p>
          *To have your account verified, please submit a proof of address (see
          below)
        </p>
      </SummarySection>

      <Section>
        <h5>My profile</h5>
        <p style={{ marginBottom: 50 }}>
          The personal data in the following section will be used for
          communication purpose when a cat sitting service is requested.
        </p>
        <Row>
          <Col md={6} style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              style={{
                width: 200,
                height: 200,
                border: '1px solid #ced4da',
                borderRadius: '50%',
                position: 'absolute',
                zIndex: -1,
              }}
            />
            {/* <div style={{ position: 'absolute' }}>
              <i class="fas fa-camera fa-3x"></i>
              <p>Drop your image here or click to add one</p>
            </div> */}
            <Input
              type="file"
              style={{
                border: '1px solid #ced4da',
                borderRadius: '50%',
                width: 200,
                height: 200,
                opacity: 0,
                outline: 'none',
              }}
            />
          </Col>
          <Col md={6}>
            <Label>Profile picture</Label>

            <div style={{ fontSize: '0.80rem' }}>
              <span>Please choose a high quality picture of yourself: </span>
              <ul style={{ padding: '0px 20px' }}>
                <li>
                  A well-lit photo with your face fully visible, and in focus
                </li>
                <li>No filters, effects or stickers applied to the image</li>
                <li>You’re alone in the picture</li>
                <li>A colour photo</li>
                <li>
                  Best image format JPG, JPEG, PNG. <br /> Minimum size 360 x
                  254 pixels
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Section>
      <Section>
        <Row>
          <Col md={6} className="mb-3">
            <Label>First Name</Label>
            <Input
              type="text"
              //value={details.newLpn}
              //onChange={handleInput}
            />
          </Col>
          <Col md={6} className="mb-3">
            <Label>Last Name</Label>
            <Input type="text" />
          </Col>
          <Col md={6} className="mb-3">
            <Label>Mobile number</Label>
            <Input type="text" />
          </Col>
          <Col md={6} className="mb-3">
            <Label>Email</Label>
            <Input type="text" />
          </Col>
          <Col md={6}>
            <Label>Address 1</Label>
            <Input type="text" />
          </Col>
          <Col md={6}>
            <Label>Address 2</Label>
            <Input type="text" />
          </Col>
        </Row>
      </Section>

      <Section>
        <h5>Social media links</h5>
        <Row>
          <Col md={6} className="mb-3">
            <Label>Facebook profile</Label>
            <AntInput
              type="text"
              prefix={<i class="fab fa-facebook-square fa-lg mr-1" />}
            />
          </Col>
          <Col md={6} className="mb-3">
            <Label>Instagram profile</Label>
            <AntInput
              type="text"
              prefix={<i class="fab fa-instagram fa-lg mr-1" />}
            />
          </Col>
          <Col md={6}>
            <Label>Other profile</Label>
            <Input type="text" />
          </Col>
        </Row>
      </Section>

      <Section>
        <h5>Proof of Address</h5>
        <Row>
          <Col md={6} className="mb-3">
            <p>
              Before we can make your profile live we need proof of your
              address. We accept photo/scan of a physical letter or PDF copies
              of your digital statements within the past year. Read more on
              other documents we accept.
            </p>
          </Col>
          <Col md={6} className="mb-3">
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
    </>
  );
}

export default GeneralInfo;
