import React from 'react'

import Requested from './containers/Requested'
import Successful from './containers/Successful'
import Unsuccessful from './containers/Unsuccessful'

import { useEmailVerification } from '../viewModel'

function EmailVerification() {
  const { t, activate } = useEmailVerification();

  const renderResponse = () => {
    switch (activate.payload) {
      case 'Activation failed':
        return <Unsuccessful t={t} />
      case 'Activation successful':
        return <Successful t={t} />
      case 'Email requested':
        return <Requested t={t} />
      default:
        break;
    }
  }

  return renderResponse();
}

export default EmailVerification;
