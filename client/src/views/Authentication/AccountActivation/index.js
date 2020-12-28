import React from 'react'
import { Spinner, VerticalCard } from '../../../components/UIComponents'

import Successful from './containers/Successful'
import Unsuccessful from './containers/Unsuccessful'

import { useAuthentication, useAccountActivation } from '../viewModel'

function AccountActivation() {
  const { t, authError } = useAuthentication();
  const { activationStatus, unsuccessfulProps } = useAccountActivation();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
      {activationStatus ?
        <VerticalCard variant="authentication" style={{ textAlign: 'center' }}>
          {activationStatus === 'success' && <Successful t={t} />}
          {activationStatus === 'failed' && <Unsuccessful t={t} unsuccessfulProps={unsuccessfulProps} />}
        </VerticalCard>
        :
        <Spinner />
      }
    </div>
  );
}

export default AccountActivation;
