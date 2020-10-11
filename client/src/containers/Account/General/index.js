import React, { useEffect, useState, useRef } from 'react';
import { FormButtons, SectionContainer, SectionTitle } from '../../../components/FormComponents';
import { getUser, sendUser, sendProfilePic, sendAddressProof } from '../../../_actions/accountActions';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { general_default_values as defaultValues } from '../_defaultValues'
import { general_schema } from '../_validationSchema'

import ProfilePicture from './ProfilePicture';
import PersonalInfo from './PersonalInfo';
import AddressProof from './AddressProof';
import SocialMedia from './SocialMedia';

const resolver = yupResolver(general_schema)

function GeneralInfo({ activeKey }) {
  const personalInfoRef = useRef(null);

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { data: userData } = useSelector((state) => state.account);

  const methods = useForm({ defaultValues, resolver });
  const { handleSubmit, reset, setValue, errors } = methods;

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

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      window.scrollTo(0, personalInfoRef.current.offsetTop - 20);
    }
  }, [errors])

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

          <SectionContainer ref={personalInfoRef}>
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
