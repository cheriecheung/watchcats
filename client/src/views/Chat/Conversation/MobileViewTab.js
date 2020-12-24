import React from 'react';
import { Image } from '../../../components/UIComponents'
import { IconButton, MobileViewTabContainer } from '../styledComponents'
import defaultProfilePic from '../../../assets/images/default_profile_pic.jpg'

const { REACT_APP_API_DOMAIN } = process.env;

function MobileViewTab({
  recipientPicture,
  backToList,
  goToInfo,
  firstName,
  lastName
}) {
  const pictureUrl = recipientPicture ?
    `${REACT_APP_API_DOMAIN}/image/${recipientPicture}` : defaultProfilePic

  return (
    <MobileViewTabContainer>
      <div style={{ display: 'flex' }}>
        <IconButton type="button" onClick={backToList}>
          <i className="fas fa-arrow-left" />
        </IconButton>

        <div
          style={{
            margin: '0 10px',
            width: 40,
            height: 40,
            borderRadius: 10,
            alignSelf: 'center',
            overflow: 'hidden',
          }}
        >
          <Image url={pictureUrl} />
        </div>
        <h5 style={{ alignSelf: 'center' }}>{firstName} {lastName && lastName.charAt(0)}</h5>
      </div>

      <IconButton type="button" onClick={goToInfo}>
        <i className="fas fa-info-circle" />
      </IconButton>
    </MobileViewTabContainer>
  )
}

export default MobileViewTab