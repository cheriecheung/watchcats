import React from 'react';
import { Image } from '../../../components/UIComponents'
import { IconButton, MobileViewTabContainer } from '../styledComponents'

function MobileViewTab({
  recipientPicture,
  backToList,
  goToInfo,
  firstName,
  lastName
}) {
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
          <Image url={recipientPicture} />
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