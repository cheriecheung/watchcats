import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Row, Col, Label, FormGroup, Input } from 'reactstrap';
import styled from 'styled-components';
import { Calendar, DatePicker } from 'antd';

const Container = styled.div`
  text-align: left;
  margin: 50px 9%;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

function ProfileTabs() {
  const [key, setKey] = useState('owner');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="general" title="General Info">
        <Container>
          <GeneralInfo />
        </Container>
      </Tab>
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
      {/* <Tab eventKey="membership" title="Membership">
        <Container>
          <Membership />
        </Container>
      </Tab> */}
      <Tab eventKey="settings" title="Settings">
        <Container>
          <Settings />
        </Container>
      </Tab>
    </Tabs>
  );
}

function GeneralInfo() {
  return (
    <>
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
    </>
  );
}

function SitterProfile() {
  return (
    <>
      <Section>
        <h5>About me</h5>

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
        <i class="fas fa-plus fa-2x mr-1" />
        Add another time
      </Section>

      <Section>
        <h5>About my cat</h5>
        <Row>
          <Col md={6} className="mb-3">
            <Label>Name</Label>
            <Input type="text" />
          </Col>
          <Col md={6} className="mb-3">
            <Label>Age</Label>
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
          <Col md={6} className="mb-3">
            <Label>Pet Insurance</Label>
            <Input type="text" />
          </Col>
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
        </Row>
        <i class="fas fa-plus fa-2x mr-1" />
        Add another cat
      </Section>

      <Section>
        <h5>Description of cat(s)</h5>
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
        <h5>Payment Method</h5>
      </Section>
      <Section>
        <h5>Change password</h5>
      </Section>
      <Section>
        <h5>Two-factor authentication</h5>
        <p>
          Protect your account with an extra layer of security. Once configured,
          you'll be required to enter both your password and an authentication
          code from your mobile phone in order to sign in
        </p>
      </Section>
      <Section>
        <h5>Delete account</h5>
      </Section>
    </div>
  );
}

export default ProfileTabs;
