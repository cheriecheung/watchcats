import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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

function GoogleLoginFailure() {
  const { t } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push('/login');
    }, 5000)
  }, [])

  return (
    <Container>
      <VerticalCard>
        <ResponseDisplayTemplate
          icon={<i className="far fa-grin-beam-sweat fa-5x" style={{ color: themeColor.lightGrey }} />}
          title={t('api_error.google_login_failed')}
          text={
            <>
              <span>{t('api_error.google_login1')}</span>
              <h5 style={{ margin: '15px 0' }}>{t('form.or')}</h5>
              <span>{t('api_error.google_login2')}</span>
              <br />
              <span>{t('api_error.google_login3')}</span>
              <br />
              <br />
              <span>{t('api_error.google_login_redirect')}</span>
            </>
          }
        />
      </VerticalCard>
    </Container>
  )
}

export default GoogleLoginFailure;