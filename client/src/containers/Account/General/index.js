import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FormButtons, SectionContainer, SectionTitle } from '../../../components/FormComponents';
import {
  getUser,
  sendUser,
  sendProfilePic,
  sendAddressProof,
} from '../../../_actions/accountActions';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import ProfilePicture from './ProfilePicture';
import PersonalInfo from './PersonalInfo';
import AddressProof from './AddressProof';
import SocialMedia from './SocialMedia';

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

function GeneralInfo({ activeKey }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: userData } = useSelector((state) => state.account);

  const methods = useForm();
  const { register, handleSubmit, reset, setValue, watch } = methods;

  const [profilePicURL, setProfilePicURL] = useState('');

  useEffect(() => {
    if (activeKey === 'general') {
      console.log({ activeKey });
      dispatch(getUser());
    }
  }, [activeKey, dispatch]);

  useEffect(() => {
    console.log({ userData });

    if (userData) {
      const { profilePictureFileName } = userData;
      if (profilePictureFileName) {
        setProfilePicURL(profilePictureFileName);
      }
      reset(userData);
    }
  }, [userData]);

  const onSubmit = (data) => {
    dispatch(sendUser(data));

    const { profilePic, addressProof } = data || {};

    if (profilePic) {
      dispatch(sendProfilePic(profilePic));
    }
    if (addressProof) {
      dispatch(sendAddressProof(addressProof));
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SectionContainer>
            <SectionTitle>{t('general_info.profile_picture')}</SectionTitle>

            <ProfilePicture setValue={setValue} profilePicURL={profilePicURL} />
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>{t('general_info.personal_info')}</SectionTitle>

            <PersonalInfo />
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>{t('general_info.proof_address')}</SectionTitle>
            <AddressProof setValue={setValue} />
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>{t('general_info.social_media')}</SectionTitle>
            <SocialMedia />
          </SectionContainer>

          <FormButtons onClick={() => reset(defaultValues)} />
        </form>
      </FormProvider>
    </>
  );
}

export default GeneralInfo;
