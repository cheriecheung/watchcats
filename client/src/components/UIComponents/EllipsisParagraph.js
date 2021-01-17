import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { themeColor } from '../../style/theme';
import { Typography } from 'antd';
const { Paragraph } = Typography;

const ParagraphComponent = styled(Paragraph)`
  & > a {
    color: ${themeColor.peach};
  }

  & > a:hover {
    color: ${themeColor.peach};
  }
`

function EllipsisParagraph({ children }) {
  return (
    <ParagraphComponent
      ellipsis={{
        rows: 3,
        expandable: true,
        symbol: 'Read more'
      }}
      style={{ whiteSpace: 'pre-line' }}
    >
      {children}
    </ParagraphComponent>
  )
}

export default EllipsisParagraph

EllipsisParagraph.propTypes = {
  children: PropTypes.node
};

EllipsisParagraph.defaultProps = {
  children: undefined
};