import React from 'react';
import { Image, ImageContainer, LinkButton } from '../../../components/UIComponents'
import {
  BackButton,
  ConversationInfoContainer,
  ConversationInfoLayer,
  MobileViewTabContainer,
  ScrollableSubLayer
} from '../styledComponents'

function ConversationInfo({
  t,
  info,
  backToConversation,
  mobileScreenView
}) {
  const { recipient } = info || {}
  const {
    firstName,
    lastName,
    profilePicture,
    urlId,
    sitter: hasSitterProfile,
    owner: hasOwnerProfile
  } = recipient || {}

  return (
    <ConversationInfoContainer isTranslateX={mobileScreenView === 'info'}>
      <ConversationInfoLayer>
        <ScrollableSubLayer>
          <MobileViewTabContainer>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <BackButton type="button" onClick={backToConversation}>
                <i className="fas fa-arrow-left" />
              </BackButton>
            </div>
          </MobileViewTabContainer>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 20,
              borderBottom: '1px solid #E8E8E8',
            }}
          >
            <ImageContainer>
              <Image url={profilePicture} />
            </ImageContainer>
            <h5 style={{ margin: '15px 0' }}>
              {firstName} {lastName && lastName.charAt(0)}
            </h5>

            {hasOwnerProfile &&
              <LinkButton
                to={`/profile/catowner/${urlId}`}
                variant="bordered"
                style={{ margin: '5px 0' }}
              >
                {t('chats.view_owner_profile')}
              </LinkButton>
            }
            {hasSitterProfile &&
              <LinkButton
                to={`/profile/catsitter/${urlId}`}
                variant="bordered"
                style={{ margin: '5px 0' }}
              >
                {t('chats.view_sitter_profile')}
              </LinkButton>
            }
          </div>
        </ScrollableSubLayer>
      </ConversationInfoLayer>
    </ConversationInfoContainer>
  );
}

export default ConversationInfo;
