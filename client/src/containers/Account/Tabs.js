import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Row, Col, Label, FormGroup, Input } from 'reactstrap';
import styled from 'styled-components';
import { Calendar } from 'antd';

const Container = styled.div`
  text-align: left;
  margin: 50px 9%;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

function ProfileTabs() {
  const [key, setKey] = useState('sitter');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="sitter" title="Cat sitter profile">
        <Container>
          <SitterProfile />
        </Container>
      </Tab>
      <Tab eventKey="owner" title="Cat owner profile">
        <Container>
          <OwnerProfile />
        </Container>
      </Tab>
      <Tab eventKey="membership" title="Membership">
        <Container>
          <Membership />
        </Container>
      </Tab>
      <Tab eventKey="settings" title="Settings">
        <Container>
          <Settings />
        </Container>
      </Tab>
    </Tabs>
  );
}

function SitterProfile() {
  return (
    <>
      <Section>
        <h5>General Information</h5>
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
          <Col md={6} className="mb-3">
            <Label>Address 1</Label>
            <Input type="text" />
          </Col>
          <Col md={6} className="mb-3">
            <Label>Address 2</Label>
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
              other documents we vaccept.
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

      <Section>
        <h5>About You</h5>

        <Row>
          <Col md={6} className="mb-3">
            <Input
              type="textarea"
              placeholder="Tell cat owners about yourself. Start with a little description of yourself - What do you do for a living? Why do you want to be a cat sitter?"
              rows="10"
              style={{ resize: 'none' }}
            />
          </Col>
          <Col md={6} className="mb-3">
            <p>
              To let cat owners get an idea of who's sitting their cats, you can
              upload pictures of yourself.
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
        <h5>Experience</h5>

        <Row>
          <Col md={6} className="mb-3">
            <Input
              type="textarea"
              placeholder="Tell cat owners about your service. What type of services can you offer as a cat sitter? Why should a cat sitter invite you to take care of their cats?"
              rows="10"
              style={{ resize: 'none', marginBottom: 20 }}
            />
          </Col>

          <Col>
            <Row>
              <Col md={6} className="mb-3">
                <i class="fas fa-cat fa-2x mr-1" />
                <span>Owns / owned a cat</span>
                <Input type="checkbox" />
              </Col>
              <Col md={6} className="mb-3">
                <i class="fas fa-paw fa-2x mr-1" />
                <span> Working knowledge of cat behavior</span>
              </Col>
              <Col md={6} className="mb-3">
                <i class="fas fa-pills fa-2x mr-1" />
                <span> Able to administer medication</span>
              </Col>
              <Col md={6} className="mb-3">
                <i class="fas fa-syringe fa-2x mr-1" />
                <span> Able to do injections</span>
              </Col>
              <Col md={6} className="mb-3">
                <i class="fas fa-certificate fa-2x mr-1" />
                <span> Has pet sitting certification</span>
              </Col>
              <Col md={6} className="mb-3">
                <i class="fas fa-broom fa-2x mr-1" />
                <span> Has pet grooming skills</span>
              </Col>
            </Row>
          </Col>
        </Row>
      </Section>

      <Section>
        <h5>Pricing</h5>
        <Row>
          <Col md={6} className="mb-3">
            <Label>One time visit</Label>
            <Input
              type="text"
              //value={details.newLpn}
              //onChange={handleInput}
            />
          </Col>
          <Col md={6} className="mb-3">
            <Label>Overnight visit</Label>
            <Input type="text" />
            <span>Per night</span>
          </Col>
        </Row>
      </Section>

      <Section>
        <h5>Availability</h5>
        <Calendar fullscreen={false} />
      </Section>

      <Section>
        <h5>Emergency Contact</h5>
        <p>In case of an emergency, cat owners can contact the following:</p>
        <Row>
          <Col md={6} className="mb-3">
            <Label>Full name</Label>
            <Input type="text" />
          </Col>
          <Col md={6} className="mb-3">
            <Label>Mobile number</Label>
            <Input type="text" />
          </Col>
        </Row>
      </Section>
    </>
  );
}

function OwnerProfile() {
  return (
    <div>
      <h1>Cat owner profile</h1>
    </div>
  );
}

function Membership() {
  return (
    <div>
      <h1>Membership</h1>
    </div>
  );
}

function Settings() {
  return (
    <div>
      <Section>
        <h5>Two-factor authentication</h5>
      </Section>
    </div>
  );
}

export default ProfileTabs;
