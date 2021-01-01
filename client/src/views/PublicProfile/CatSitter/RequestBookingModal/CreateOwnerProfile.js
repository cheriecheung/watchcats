import React from 'react';
import { LinkButton } from '../../../../components/UIComponents'
import { themeColor } from '../../../../style/theme'

function CreateOwnerProfile({ t }) {
  return (
    <div style={{ margin: '20px 0' }}>
      <i className="fas fa-exclamation-circle fa-5x" style={{ color: themeColor.lightGrey }} />
      <br />
      <br />
      <h5>{t('sitter_profile.set_up_owner_profile')}</h5>
      <span>{t('sitter_profile.no_owner_profile')}</span>
      <span>
        &nbsp;
        {t('sitter_profile.create_owner_profile1')}
        <LinkButton to="/account" variant="colored">
          &nbsp;{t('sitter_profile.create_owner_profile2')}&nbsp;
        </LinkButton>
        {t('sitter_profile.create_owner_profile3')}
      </span>
    </div>
  );
}

export default CreateOwnerProfile;
