import React from 'react'
import PropTypes from 'prop-types';

function Image({ url, style }) {
  const alt = url.substr(url.lastIndexOf('/') + 1);

  return (
    <img
      src={url}
      alt={alt}
      style={{
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        ...style
      }}
    />
  )
}

export default Image;

Image.propTypes = {
  url: PropTypes.string.isRequired,
  style: PropTypes.object
};

Image.defaultProps = {
  style: {}
};
