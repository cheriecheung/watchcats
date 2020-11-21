import React from 'react'

function Google({ onGoogleLogin }) {
  return (
    <button
      type="button"
      className="form-control btn btn-danger mb-3"
      onClick={onGoogleLogin}
    >
      Google
    </button>
  )
}

export default Google