import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
const { Paragraph } = Typography;

function EllipsisParagraph({ children }) {
  return (
    <Paragraph
      ellipsis={{
        rows: 3,
        expandable: true,
        symbol: 'Read more'
      }}
      style={{ whiteSpace: 'pre-line' }}
    >
      {children}
    </Paragraph>
  )
}

export default EllipsisParagraph

EllipsisParagraph.propTypes = {
  children: PropTypes.node
};

EllipsisParagraph.defaultProps = {
  children: undefined
};