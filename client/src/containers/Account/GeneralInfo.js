import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Row, Col, Label, Input } from 'reactstrap';
import {
  FieldLabel,
  FileUploader,
  FormButtons,
  TextField,
  SectionContainer,
  SectionTitle,
} from '../../components/FormComponents';
import styled from 'styled-components';
import { getUser, sendUser, sendProfilePic, sendAddressProof } from '../../_actions/accountActions';
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
  profilePic: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  postcode: '',
  addressProof: '',
  profileFacebook: '',
  profileInstagram: '',
  profileOther: '',
};

const uploadProfilePicId = 'upload-profile-pic';
const uploadAddressProofId = 'upload-address-proof';

const { REACT_APP_API_DOMAIN } = process.env;

function GeneralInfo({ activeKey }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: userData } = useSelector((state) => state.account);

  const methods = useForm();
  const { register, handleSubmit, reset, setValue, watch } = methods;

  const [profilePicURL, setProfilePicURL] = useState('');

  const [profilePicFileName, setProfilePicFileName] = useState('');
  const [profilePicPreview, setProfilePicPreview] = useState('');
  const [addressProofFileName, setAddressProofFileName] = useState('');

  useEffect(() => {
    if (activeKey === 'general') {
      console.log({ activeKey });
      dispatch(getUser());
    }
  }, [activeKey, dispatch]);

  useEffect(() => {
    console.log({ userData });

    if (userData) {
      const { profilePicURL: profilePicURLValue } = userData;
      setProfilePicURL(profilePicURLValue);

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

  const onSubmit = (data) => {
    dispatch(sendUser(data));

    if (data.profilePic) {
      dispatch(sendProfilePic(data.profilePic));
    }
    if (data.addressProof) {
      dispatch(sendAddressProof(data.addressProof));
    }
  };

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
            <SectionTitle>{t('general_info.profile_picture')}</SectionTitle>
            <p style={{ marginBottom: 30 }}>
              The personal data in the following section will be used for communication purpose when
              a cat sitting service is requested.
            </p>

            <Row>
              <Col md={6}>
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
              <Col md={6}>
                <div style={{ display: 'flex', flexDirection: 'column', wordWrap: 'break-word' }}>
                  <label htmlFor={uploadProfilePicId} className="upload-file-input form-control">
                    <i className="fas fa-upload" style={{ opacity: 0.4, marginRight: 10 }} />
                    <span>{t('owner_form.upload')}</span>
                  </label>
                  <FileUploader
                    name="profilePic"
                    id={uploadProfilePicId}
                    fileType="image/x-png,image/jpeg"
                    setFileData={(data) => setValue('profilePic', data)}
                    setDisplayFileName={(name) => setProfilePicFileName(name)}
                    setDisplayPreview={(imgUrl) => setProfilePicPreview(imgUrl)}
                  />
                  {profilePicPreview && (
                    <div style={{ overflow: 'hidden', width: 100, height: 100 }}>
                      <img
                        src={profilePicPreview}
                        alt="profile_picture"
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    </div>
                  )}
                  {profilePicURL && (
                    <>
                      <div style={{ overflow: 'hidden', width: 100, height: 100 }}>
                        <img
                          src={`${REACT_APP_API_DOMAIN}/user/profile-picture/${profilePicURL}`}
                          alt="profile_picture"
                          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                      </div>
                      <button
                        type="button"
                        style={{
                          color: 'red',
                          background: 'none',
                          border: 'none',
                          outline: 'none',
                        }}
                        onClick={() => console.log('delete image')}
                      >
                        Remove
                      </button>
                    </>
                  )}
                  {profilePicFileName !== '' && <p>{profilePicFileName}</p>}
                </div>

                {/* <img
                  style={{
                    width: 200,
                    height: 200,
                    border: '1px solid #ced4da',
                    borderRadius: '50%',
                    position: 'absolute',
                    //zIndex: -1,
                  }}
                />
                 <div style={{ position: 'absolute' }}>
                  <i className="fas fa-camera fa-3x"></i>
                  <p>Drop your image here or click to add one</p>
                </div> 
                <input
                  type="file"
                  style={{
                    border: '1px solid #ced4da',
                    borderRadius: '50%',
                    width: 200,
                    height: 200,
                    outline: 'none',
                  }}
                /> */}
              </Col>
            </Row>
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>{t('general_info.personal_info')}</SectionTitle>

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
            <SectionTitle>{t('general_info.proof_address')}</SectionTitle>
            <Row>
              <Col md={6} className="mb-3">
                <p>
                  {t('general_info.proof_address_description1')}
                  {t('general_info.proof_address_description2')}
                </p>
              </Col>
              <Col md={6} className="mb-3">
                <div style={{ display: 'flex', flexDirection: 'column', wordWrap: 'break-word' }}>
                  <label htmlFor={uploadAddressProofId} className="upload-file-input form-control">
                    <i className="fas fa-upload" style={{ opacity: 0.4, marginRight: 10 }} />
                    <span>{t('owner_form.upload')}</span>
                  </label>
                  <FileUploader
                    name="addressProof"
                    id={uploadAddressProofId}
                    fileType="image/x-png,image/jpeg"
                    setFileData={(data) => setValue('addressProof', data)}
                    setDisplayFileName={(name) => setAddressProofFileName(name)}
                  />
                  {addressProofFileName !== '' && <p>{addressProofFileName}</p>}
                </div>
              </Col>
            </Row>
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>{t('general_info.social_media')}</SectionTitle>
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

          <FormButtons onClick={() => reset(defaultValues)} />
        </form>
      </FormProvider>
    </>
  );
}

export default GeneralInfo;
