import React from 'react'

function Google({ onGoogleLogin }) {
  return (
    <button
      type="button"
      className="form-control btn btn-danger"
      onClick={onGoogleLogin}
    >
      Google
    </button>
  )
}

export default Google