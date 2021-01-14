import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { onGetGoogleUser } from '../../../../redux/authentication/actions';
import styled from 'styled-components';
import { LinkButton, ResponseDisplayTemplate, VerticalCard } from '../../../../components/UIComponents';
import { themeColor, themeLayout } from '../../../../style/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -20px auto 0 auto;
  width: 90%;
  height: ${themeLayout.contentHeight};
`

function GoogleLoginLoading() {
  const t = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetGoogleUser())
  }, [])

  return (
    <Container>
      <VerticalCard>
        <ResponseDisplayTemplate
          icon={<i className="fab fa-google fa-5x" style={{ color: themeColor.lightGrey }} />}
          title={t('login.loading')}
        />
      </VerticalCard>
    </Container>
  )
}

export default GoogleLoginLoading;