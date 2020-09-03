import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Row, Col, Label, Input } from 'reactstrap';
import {
  FieldLabel,
  FormButtons,
  TextField,
  SectionContainer,
} from '../../components/FormComponents';
import { themeColor } from '../../style/theme';
import styled from 'styled-components';
import { getUser, sendUser } from '../../_actions/accountActions';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const SummarySection = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: left;
  margin-bottom: 40px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 40px 0px rgba(212, 170, 185, 0.2);
  background: rgba(255, 255, 255, 0.9);
`;

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  postcode: '',
  profileFacebook: '',
  profileInstagram: '',
  profileOther: '',
};

function GeneralInfo() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: userData } = useSelector((state) => state.account);

  const methods = useForm();
  const { register, handleSubmit, reset } = methods;

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (userData) {
      const {
        firstName,
        lastName,
        email,
        phone,
        address,
        postcode,
        profileFacebook,
        profileInstagram,
        profileOther,
      } = userData;

      reset({
        ...defaultValues,
        firstName,
        lastName,
        email,
        phone,
        address,
        postcode,
        profileFacebook,
        profileInstagram,
        profileOther,
      });
    }
  }, [userData]);

  const onSubmit = (data) => dispatch(sendUser(data));
  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  const color = themeColor.green;

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SummarySection>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flexBasis: '40%',
              }}
            >
              <span>Account creation date: </span>
              <span>10 August 2019</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flexBasis: '30%',
              }}
            >
              <span>Account status:</span>
              <span> Not verified</span>
            </div>
            <p>*To have your account verified, please submit a proof of address (see below)</p>
          </SummarySection>

          <SectionContainer>
            <h6 style={{ color, fontWeight: 800 }}>{t('general_info.profile_picture')}</h6>
            <p style={{ marginBottom: 50 }}>
              The personal data in the following section will be used for communication purpose when
              a cat sitting service is requested.
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
              <i className="fas fa-camera fa-3x"></i>
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
                  <span>Please choose a high quality picture of yourself:</span>
                  <ul style={{ padding: '0px 20px' }}>
                    <li>A well-lit photo with your face fully visible, and in focus</li>
                    <li>No filters, effects or stickers applied to the image</li>
                    <li>You’re alone in the picture</li>
                    <li>A colour photo</li>
                    <li>
                      Best image format JPG, JPEG, PNG. <br /> Minimum size 360 x 254 pixels
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </SectionContainer>

          <SectionContainer>
            <h6 style={{ color, fontWeight: 800 }}>{t('general_info.personal_info')}</h6>

            <Row>
              <Col md={6} className="mb-3">
                <FieldLabel>{t('general_info.first_name')}</FieldLabel>
                <TextField name="firstName" />
              </Col>
              <Col md={6} className="mb-3">
                <FieldLabel>{t('general_info.last_name')}</FieldLabel>
                <TextField name="lastName" />
              </Col>
              <Col md={6} className="mb-3">
                <FieldLabel>{t('general_info.phone')}</FieldLabel>
                <TextField name="phone" />
              </Col>
              <Col md={6} className="mb-3">
                <FieldLabel>{t('general_info.email')}</FieldLabel>
                <TextField name="email" />
              </Col>
              <Col md={6} className="mb-3">
                <FieldLabel>{t('general_info.address')}</FieldLabel>
                <TextField name="address" />
              </Col>
              <Col md={6}>
                <FieldLabel>{t('general_info.postcode')}</FieldLabel>
                <TextField name="postcode" />
              </Col>
            </Row>
          </SectionContainer>

          <SectionContainer>
            <h6 style={{ color, fontWeight: 800 }}>{t('general_info.social_media')}</h6>
            <Row className="social-media-input">
              <Col md={4} className="mb-3">
                <FieldLabel>{t('general_info.facebook')}</FieldLabel>
                <TextField
                  name="profileFacebook"
                  prefix={<i className="fab fa-facebook-square fa-lg mr-1" />}
                />
              </Col>
              <Col md={4} className="mb-3">
                <FieldLabel>{t('general_info.instagram')}</FieldLabel>
                <TextField
                  name="profileInstagram"
                  prefix={<i className="fab fa-instagram fa-lg mr-1" />}
                />
              </Col>
              <Col md={4}>
                <FieldLabel>{t('general_info.other')}</FieldLabel>
                <TextField name="profileOther" prefix={<i className="fas fa-user  mr-1" />} />
              </Col>
            </Row>
          </SectionContainer>

          <SectionContainer>
            <h6 style={{ color, fontWeight: 800 }}>{t('general_info.proof_address')}</h6>
            <Row>
              <Col md={6} className="mb-3">
                <p>
                  {t('general_info.proof_address_description1')}
                  {t('general_info.proof_address_description2')}
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

            <h6 style={{ color, fontWeight: 800 }}>Police check (optional)</h6>
            <Row>
              <Col md={6} className="mb-3">
                <p>
                  To increase legitimacy for your profile as a sitter and/or owner, you can upload a
                  copy of your latest police check.
                </p>
                <p>
                  After it has been approved, your sitter and/or owner profile will show that you
                  have been police checked.
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
          </SectionContainer>

          <FormButtons onClick={() => reset(defaultValues)} />
        </form>
      </FormProvider>
    </>
  );
}

export default GeneralInfo;
