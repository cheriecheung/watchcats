import React from 'react'
import { VerticalCard } from '../../../components/UIComponents'

import Successful from './containers/Successful'
import Unsuccessful from './containers/Unsuccessful'

import { useAuthentication, useEmailVerification } from '../viewModel'

function EmailVerification() {
  const { t, authenticationError } = useAuthentication();
  const { activate, unsuccessfulProps } = useEmailVerification();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
      <VerticalCard variant="authentication">
        {activate.payload === 'Activation successful' ?
          <Successful t={t} />
          :
          <Unsuccessful
            t={t}
            unsuccessfulProps={unsuccessfulProps}
          />
        }
      </VerticalCard>
    </div>
  );
}

export default EmailVerification;
