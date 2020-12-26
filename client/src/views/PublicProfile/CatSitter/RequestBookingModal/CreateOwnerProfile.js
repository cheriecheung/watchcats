import React from 'react';
import { LinkButton } from '../../../../components/UIComponents'

function CreateOwnerProfile({ t }) {
  return (
    <div style={{ margin: '50px 0' }}>
      <h6>{t('sitter_profile.no_owner_profile')}</h6>
      <br />
      <h6>
        {t('sitter_profile.create_owner_profile1')}
        <LinkButton to="/account">
          {t('sitter_profile.create_owner_profile2')}
        </LinkButton>
        {t('sitter_profile.create_owner_profile3')}
      </h6>
    </div>
  );
}

export default CreateOwnerProfile;
