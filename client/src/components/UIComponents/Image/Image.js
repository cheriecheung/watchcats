import React from 'react'
import PropTypes from 'prop-types';
import no_image from '../../../assets/images/no_image.png';

const { REACT_APP_IMAGE_DOMAIN } = process.env;

function Image({ url, style }) {
  const src = url ? `${REACT_APP_IMAGE_DOMAIN}/${url}` : no_image;
  const alt = src.substr(src.lastIndexOf('/') + 1);

  return (
    <img
      src={src}
      alt={alt}
      style={{
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        ...style
      }}
      width="100%"
      height="100%"
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
