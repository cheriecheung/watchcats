import React from 'react'

function Image({ url }) {
  return (
    <img
      src={url}
      alt={url}
      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
    />
  )
}

export default Image;
