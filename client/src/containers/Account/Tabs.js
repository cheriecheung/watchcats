import React, { useState } from 'react';
import { Row, Col, Label, FormGroup, Input, Button } from 'reactstrap';
import styled from 'styled-components';
import { Calendar, DatePicker, Modal, Input as AntInput } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

const Container = styled.div`
  text-align: left;
  margin: 50px 5%;
`;

const Section = styled.div`
  text-align: left;
  margin-bottom: 40px;
`;

const SettingsSection = styled.div`
  text-align: left;
  margin-bottom: 40px;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  padding: 15px 20px;
`;

function ProfileTabs() {
  const accountTabs = [
    { key: 'general', tab: 'General Info', content: <GeneralInfo /> },
    { key: 'sitter', tab: 'Cat sitter profile', content: <SitterProfile /> },
    { key: 'owner', tab: 'Cat owner profile', content: <OwnerProfile /> },
    { key: 'settings', tab: 'Settings', content: <Settings /> },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="settings" tabPosition="left">
        {accountTabs.map(({ key, tab, content }) => (
          <TabPane tab={tab} key={key}>
            {content}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}

function GeneralInfo() {
  return (
    <>
      <Container>
        <Section>
          <Row>
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
            <Col md={6}>
              {/* <img
                style={{
                  width: 200,
                  height: 200,
                  border: '1px solid #ced4da',
                  borderRadius: '50%',
                  position: 'absolute',
                  zIndex: -1,
                }}
              />
              <div style={{ position: 'absolute' }}>
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
      </Container>
    </>
  );
}

function SitterProfile() {
  return (
    <Container>
      <Section>
        <h5>About me</h5>

        <Row>
          <Col md={6}>
            <Input
              type="textarea"
              placeholder="Tell cat owners about yourself. Start with a little description of yourself - What do you do for a living? Why do you want to be a cat sitter?"
              rows="10"
              style={{ resize: 'none' }}
            />
          </Col>
          <Col md={6}>
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
          <Col md={6}>
            <Input
              type="textarea"
              placeholder="Tell cat owners about your service. What type of services can you offer as a cat sitter? Why should a cat sitter invite you to take care of their cats?"
              rows="10"
              style={{ resize: 'none', marginBottom: 20 }}
            />
          </Col>

          <Col Col md={6}>
            <label className="d-flex mb-4">
              <i class="fas fa-cat fa-2x mr-4" />
              <span style={{ flexBasis: '90%' }}>Owns / owned a cat</span>
              <input type="checkbox" />
            </label>
            <label className="d-flex mb-4">
              <i class="fas fa-pills fa-2x mr-4" />
              <span style={{ flexBasis: '90%' }}>
                Able to administer medication
              </span>
              <input type="checkbox" />
            </label>
            <label className="d-flex mb-4">
              <i class="fas fa-syringe fa-2x mr-4" />
              <span style={{ flexBasis: '90%' }}> Able do injections</span>
              <input type="checkbox" />
            </label>
            <label className="d-flex mb-4">
              <i class="fas fa-certificate fa-2x mr-4" />
              <span style={{ flexBasis: '90%' }}>
                Has pet sitting certification
              </span>
              <input type="checkbox" />
            </label>
            <label className="d-flex mb-4">
              <i class="fas fa-broom fa-2x mr-4" />
              <span style={{ flexBasis: '90%' }}> Has pet grooming skills</span>
              <input type="checkbox" />
            </label>
          </Col>
        </Row>
      </Section>

      <Section>
        <h5>Pricing</h5>
        <Row>
          <Col md={6}>
            <Label>One time visit</Label>
            <Input
              type="text"
              //value={details.newLpn}
              //onChange={handleInput}
            />
          </Col>
          <Col md={6}>
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
    </Container>
  );
}

function OwnerProfile() {
  return (
    <Container>
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
    </Container>
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
  const [modal, setModal] = useState({
    show: false,
    loading: false,
    title: '',
    content: '',
  });

  const handleOk = () => {
    setModal({ ...modal, loading: true });
    setTimeout(() => {
      setModal({ ...modal, show: false, loading: false });
    }, 2000);
  };

  const renderAddCard = () => (
    <Row style={{ textAlign: 'left' }}>
      <Col md={12} className="mb-3">
        <Label>Card number</Label>
        <Input type="text" prefix={<h4>haha</h4>} />
      </Col>
      <Col md={12} className="mb-3">
        <Label>name</Label>
        <Input type="text" />
      </Col>
      <Col md={8} className="mb-3">
        <Label>MM / YY</Label>
        <Input type="text" />
      </Col>
      <Col md={4} className="mb-3">
        <Label>CVC</Label>
        <Input type="text" />
      </Col>
    </Row>
  );

  return (
    <Container>
      <SettingsSection>
        <h5>Payment Method</h5>
        <Col style={{ paddingLeft: 0 }}>
          <button
            className="add-field-btn"
            style={{ width: 200 }}
            onClick={() =>
              setModal({
                ...modal,
                show: true,
                title: 'Add credit / debit card',
                content: renderAddCard(),
              })
            }
          >
            <i class="fas fa-plus mr-1" />
            Add credit / debit card
          </button>
        </Col>
        <Col style={{ paddingLeft: 0, marginTop: 10 }}>
          <button
            className="add-field-btn"
            style={{ width: 200 }}
            onClick={() =>
              setModal({
                ...modal,
                show: true,
                title: 'Add bank account',
                content: 'give us your bank account and money!',
              })
            }
          >
            <i class="fas fa-plus mr-1" />
            Add bank account
          </button>
        </Col>
        <Modal
          title={modal.title}
          visible={modal.show}
          onOk={handleOk}
          confirmLoading={modal.loading}
          onCancel={() => setModal({ ...modal, show: false })}
        >
          {modal.loading ? <h4>loading...</h4> : <p>{modal.content}</p>}
        </Modal>
      </SettingsSection>

      <SettingsSection>
        <h5>Change password</h5>
        <Row>
          <Col md={6} className="mb-3">
            <Label>Current password</Label>
            <AntInput.Password />
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Label>New password</Label>
            <AntInput.Password />
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Label>Repeat new password</Label>
            <AntInput.Password />
          </Col>
        </Row>
        <Button color="info" size="sm">
          Change password
        </Button>
      </SettingsSection>

      <SettingsSection>
        <h5>Change email</h5>
        <Row>
          <Col md={6} className="mb-3">
            <Label>New email</Label>
            <Input type="text" />
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Label>Confirm new email</Label>
            <Input type="text" />
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Label>Password</Label>
            <Input type="text" />
          </Col>
        </Row>
        <Button color="info" size="sm">
          Change email
        </Button>
        <span style={{ marginLeft: 10 }}>
          Your email address will not change until you confirm it via email.
        </span>
      </SettingsSection>

      <SettingsSection>
        <h5>Two-factor authentication</h5>
        <p>
          Protect your account with an extra layer of security. Once configured,
          you'll be required to enter both your password and an authentication
          code from your mobile phone in order to sign in
        </p>
      </SettingsSection>

      <SettingsSection>
        <h5>Delete account</h5>
        <Button color="danger" size="sm">
          Delete account
        </Button>
      </SettingsSection>
    </Container>
  );
}

export default ProfileTabs;
